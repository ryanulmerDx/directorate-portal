"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export function AuthListener() {
  useEffect(() => {
    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        // Supabase detected a recovery token — redirect to reset page
        window.location.href = "/reset-password";
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return null;
}
