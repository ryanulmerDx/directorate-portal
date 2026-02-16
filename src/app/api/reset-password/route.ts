import { createClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { loginEmail, actualEmail } = await request.json();

  if (!loginEmail || !actualEmail) {
    return NextResponse.json(
      { error: "Both emails are required." },
      { status: 400 }
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

  // Send the reset email to the actual email address
  const { error } = await supabase.auth.resetPasswordForEmail(actualEmail, {
    redirectTo: `${siteUrl}/reset-password`,
  });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
