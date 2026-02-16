import { ClueDrawer } from "@/components/ClueDrawer";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const agentId = user?.email?.slice(0, 4).toUpperCase() ?? "UNKNOWN";

  return (
    <div className="relative min-h-[calc(100vh-49px)] flex items-center justify-center overflow-hidden">
      {/* top bar: Dashboard label left, agent badge right */}
      <div className="absolute top-6 left-8 right-8 flex items-center justify-between z-10">
        <h1 className="text-sm font-mono uppercase tracking-[0.2em] text-foreground">
          Dashboard
        </h1>

        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-sm border border-[var(--border-subtle)] bg-panel-bg/60 backdrop-blur-md shadow-[0_0_12px_rgba(0,255,65,0.15)]">
          <span className="block w-2 h-2 rounded-full bg-[#00ff41] shadow-[0_0_8px_rgba(0,255,65,0.5)]" />
          <span className="text-xs font-mono text-red tracking-wider drop-shadow-[0_0_6px_var(--accent-red-glow)]">
            AGENT {agentId}
          </span>
        </div>
      </div>

      {/* spinning 3D logo */}
      <img
        src="/logo.png"
        alt=""
        className="w-[650px] h-[650px] object-contain opacity-75 pointer-events-none"
        style={{
          animation: "spin-3d 20s linear infinite",
        }}
      />

      {/* right clue drawer */}
      <ClueDrawer />
    </div>
  );
}
