"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { GlassPanel } from "@/components/GlassPanel";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "reset">("login");
  const [resetSent, setResetSent] = useState(false);

  // Save ?next= to localStorage on mount as a fallback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const next = params.get("next");
    if (next) {
      localStorage.setItem("login_next", next);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: form.get("email") as string,
      password: form.get("password") as string,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // Read redirect from URL or localStorage fallback
    const params = new URLSearchParams(window.location.search);
    const next =
      params.get("next") ||
      localStorage.getItem("login_next") ||
      "/app/dashboard";
    localStorage.removeItem("login_next");

    // Full page reload so cookies are sent fresh
    window.location.href = next;
  };

  const handleResetRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const loginEmail = (form.get("login_email") as string).trim();
    const actualEmail = (form.get("actual_email") as string).trim();

    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ loginEmail, actualEmail }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      setLoading(false);
      return;
    }

    setResetSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-mono text-matrix text-center mb-2 tracking-wider">
          DIRECTORATE PORTAL
        </h1>
        <p className="text-foreground/40 text-center text-sm mb-8">
          {mode === "login" ? "Authenticate to continue" : "Reset your password"}
        </p>

        <GlassPanel className="p-8">
          {mode === "login" ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-foreground/60 mb-1.5"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-3 py-2 bg-background border border-glass-border rounded-lg text-foreground placeholder-foreground/30 focus:outline-none focus:border-matrix focus:shadow-[0_0_10px_rgba(0,255,65,0.2)] transition-all"
                  placeholder="agent@directorate.io"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm text-foreground/60 mb-1.5"
                >
                  Password
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

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-matrix/10 border border-matrix/40 rounded-lg text-matrix font-mono tracking-wider hover:bg-matrix/20 hover:shadow-[0_0_20px_rgba(0,255,65,0.2)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "AUTHENTICATING..." : "ENTER"}
              </button>
            </form>
          ) : resetSent ? (
            <div className="text-center space-y-4">
              <p className="text-matrix text-sm font-mono">
                RESET LINK SENT
              </p>
              <p className="text-foreground/50 text-sm">
                Check your email for a password reset link.
              </p>
            </div>
          ) : (
            <form onSubmit={handleResetRequest} className="space-y-5">
              <div>
                <label
                  htmlFor="login_email"
                  className="block text-sm text-foreground/60 mb-1.5"
                >
                  Login Email
                </label>
                <input
                  id="login_email"
                  name="login_email"
                  type="email"
                  required
                  className="w-full px-3 py-2 bg-background border border-glass-border rounded-lg text-foreground placeholder-foreground/30 focus:outline-none focus:border-matrix focus:shadow-[0_0_10px_rgba(0,255,65,0.2)] transition-all"
                  placeholder="agent@directorate.io"
                />
              </div>

              <div>
                <label
                  htmlFor="actual_email"
                  className="block text-sm text-foreground/60 mb-1.5"
                >
                  Actual Email
                </label>
                <input
                  id="actual_email"
                  name="actual_email"
                  type="email"
                  required
                  className="w-full px-3 py-2 bg-background border border-glass-border rounded-lg text-foreground placeholder-foreground/30 focus:outline-none focus:border-matrix focus:shadow-[0_0_10px_rgba(0,255,65,0.2)] transition-all"
                  placeholder="you@email.com"
                />
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-matrix/10 border border-matrix/40 rounded-lg text-matrix font-mono tracking-wider hover:bg-matrix/20 hover:shadow-[0_0_20px_rgba(0,255,65,0.2)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "SENDING..." : "SEND RESET LINK"}
              </button>
            </form>
          )}

          <div className="mt-5 text-center">
            <button
              type="button"
              onClick={() => {
                setMode(mode === "login" ? "reset" : "login");
                setError(null);
                setResetSent(false);
              }}
              className="text-xs text-foreground/30 hover:text-matrix transition-colors"
            >
              {mode === "login" ? "Forgot password?" : "Back to login"}
            </button>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
