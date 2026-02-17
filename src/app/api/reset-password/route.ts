import { createClient } from "@supabase/supabase-js";
import { resetLimiter, webhookLimiter } from "@/lib/rate-limit";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { loginEmail, actualEmail } = await request.json();

  if (!loginEmail || !actualEmail) {
    return NextResponse.json(
      { error: "Both emails are required." },
      { status: 400 }
    );
  }

  // Rate limit by actual email — 3 resets per hour
  const resetLimit = resetLimiter.check(actualEmail.toLowerCase());
  if (!resetLimit.allowed) {
    return NextResponse.json(
      { error: `Too many reset requests. Try again in ${Math.ceil(resetLimit.resetIn / 60000)} minutes.` },
      { status: 429 }
    );
  }

  // Admin client (service role) — bypasses RLS
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Verify agent_id + actual email match
  const agentId = loginEmail.split("@")[0].toUpperCase();
  const { data: isValid } = await supabase.rpc("verify_agent_for_reset", {
    p_agent_id: agentId,
    p_email: actualEmail,
  });

  if (!isValid) {
    return NextResponse.json(
      { error: "Agent ID and email do not match our records." },
      { status: 400 }
    );
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    request.headers.get("origin") ||
    "https://directorate-portal.vercel.app";

  // Generate a recovery link for the login email (the registered auth user)
  const { data, error: linkError } = await supabase.auth.admin.generateLink({
    type: "recovery",
    email: loginEmail,
    options: {
      redirectTo: `${siteUrl}/reset-password`,
    },
  });

  if (linkError || !data?.properties?.action_link) {
    return NextResponse.json(
      { error: "Failed to generate reset link." },
      { status: 500 }
    );
  }

  // Route the link through our /auth/confirm endpoint to exchange server-side
  const actionUrl = new URL(data.properties.action_link);
  const tokenHash = actionUrl.searchParams.get("token");
  const type = actionUrl.searchParams.get("type");
  const resetLink = `${siteUrl}/auth/confirm?token_hash=${tokenHash}&type=${type}&next=/reset-password`;

  // Rate limit webhook triggers — 10 per agent per minute
  const webhookLimit = webhookLimiter.check(agentId);
  if (!webhookLimit.allowed) {
    return NextResponse.json(
      { error: `Too many requests. Try again in ${Math.ceil(webhookLimit.resetIn / 1000)} seconds.` },
      { status: 429 }
    );
  }

  // Send to n8n webhook — n8n handles sending the email
  const webhookRes = await fetch(process.env.N8N_RESET_WEBHOOK_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: actualEmail,
      resetLink,
      agentId,
    }),
  });

  if (!webhookRes.ok) {
    return NextResponse.json(
      { error: "Failed to send reset email." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
