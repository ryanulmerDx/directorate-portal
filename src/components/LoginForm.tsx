"use client";

import { useState } from "react";
import { login } from "@/app/login/actions";
import { GlassPanel } from "@/components/GlassPanel";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError(null);

    const result = await login(formData);

    // If we get here, redirect didn't fire — must be an error
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-mono text-matrix text-center mb-2 tracking-wider">
          DIRECTORATE PORTAL
        </h1>
        <p className="text-foreground/40 text-center text-sm mb-8">
          Authenticate to continue
        </p>

        <GlassPanel className="p-8">
          <form action={handleSubmit} className="space-y-5">
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

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-matrix/10 border border-matrix/40 rounded-lg text-matrix font-mono tracking-wider hover:bg-matrix/20 hover:shadow-[0_0_20px_rgba(0,255,65,0.2)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "AUTHENTICATING..." : "ENTER"}
            </button>
          </form>
        </GlassPanel>
      </div>
    </div>
  );
}
