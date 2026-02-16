"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    return { error: error.message };
  }

  // Read redirect destination from cookie (set by middleware on /app/* requests)
  const cookieStore = await cookies();
  const dest = cookieStore.get("login_redirect")?.value;
  const redirectTo = dest?.startsWith("/app") ? dest : "/app/dashboard";

  // Clear the cookie
  cookieStore.delete("login_redirect");

  redirect(redirectTo);
}
