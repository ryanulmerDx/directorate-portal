"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { GlassPanel } from "@/components/GlassPanel";

export default function ResetPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [ready, setReady] = useState(false);

  // Exchange the code/token from the URL and establish a recovery session
  useEffect(() => {
    const supabase = createClient();

    // Handle PKCE code exchange (code in query string)
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
        if (error) {
          setError("Invalid or expired reset link.");
        } else {
          setReady(true);
        }
      });
      return;
    }

    // Handle hash-based tokens (implicit flow fallback)
    const hash = window.location.hash;
    if (hash && hash.includes("access_token")) {
      // The Supabase client auto-detects hash tokens on init
      supabase.auth.onAuthStateChange((event) => {
        if (event === "PASSWORD_RECOVERY") {
          setReady(true);
        }
      });
      return;
    }

    // No code or token — check if there's already an active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setReady(true);
      } else {
        setError("No valid reset session. Please request a new reset link.");
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const password = form.get("password") as string;
    const confirm = form.get("confirm") as string;

    if (password !== confirm) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setDone(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-mono text-matrix text-center mb-2 tracking-wider">
          DIRECTORATE PORTAL
        </h1>
        <p className="text-foreground/40 text-center text-sm mb-8">
          Set a new password
        </p>

        <GlassPanel className="p-8">
          {done ? (
            <div className="text-center space-y-4">
              <p className="text-matrix text-sm font-mono">
                PASSWORD UPDATED
              </p>
              <p className="text-foreground/50 text-sm">
                Your password has been changed successfully.
              </p>
              <a
                href="/login"
                className="inline-block mt-2 text-xs text-foreground/30 hover:text-matrix transition-colors"
              >
                Back to login
              </a>
            </div>
          ) : !ready ? (
            <div className="text-center space-y-4">
              {error ? (
                <>
                  <p className="text-red-400 text-sm">{error}</p>
                  <a
                    href="/login"
                    className="inline-block mt-2 text-xs text-foreground/30 hover:text-matrix transition-colors"
                  >
                    Back to login
                  </a>
                </>
              ) : (
                <p className="text-foreground/40 text-sm">Verifying...</p>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm text-foreground/60 mb-1.5"
                >
                  New Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full px-3 py-2 bg-background border border-glass-border rounded-lg text-foreground placeholder-foreground/30 focus:outline-none focus:border-matrix focus:shadow-[0_0_10px_rgba(0,255,65,0.2)] transition-all"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label
                  htmlFor="confirm"
                  className="block text-sm text-foreground/60 mb-1.5"
                >
                  Confirm Password
                </label>
                <input
                  id="confirm"
                  name="confirm"
                  type="password"
                  required
                  className="w-full px-3 py-2 bg-background border border-glass-border rounded-lg text-foreground placeholder-foreground/30 focus:outline-none focus:border-matrix focus:shadow-[0_0_10px_rgba(0,255,65,0.2)] transition-all"
                  placeholder="••••••••"
                />
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-matrix/10 border border-matrix/40 rounded-lg text-matrix font-mono tracking-wider hover:bg-matrix/20 hover:shadow-[0_0_20px_rgba(0,255,65,0.2)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "UPDATING..." : "SET PASSWORD"}
              </button>
            </form>
          )}
        </GlassPanel>
      </div>
    </div>
  );
}
