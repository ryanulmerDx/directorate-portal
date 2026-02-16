"use client";

interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  /** 0–100, shown as a micro progress bar */
  bar?: number;
  accent?: "blue" | "red" | "yellow";
}

const accentStyles = {
  blue: {
    color: "var(--accent-blue)",
    glow: "var(--accent-blue-glow)",
    barShadow: "0 0 6px rgba(0,179,255,0.4)",
    hoverBorder: "rgba(0,179,255,0.5)",
    hoverShadow: "0 4px 20px rgba(0,179,255,0.12)",
  },
  red: {
    color: "var(--accent-red)",
    glow: "var(--accent-red-glow)",
    barShadow: "0 0 6px rgba(255,42,42,0.4)",
    hoverBorder: "rgba(255,42,42,0.5)",
    hoverShadow: "0 4px 20px rgba(255,42,42,0.12)",
  },
  yellow: {
    color: "var(--accent-yellow)",
    glow: "var(--accent-yellow-glow)",
    barShadow: "0 0 6px rgba(255,212,0,0.4)",
    hoverBorder: "rgba(255,212,0,0.5)",
    hoverShadow: "0 4px 20px rgba(255,212,0,0.12)",
  },
};

export function DashboardCard({
  title,
  value,
  subtitle,
  bar,
  accent = "blue",
}: DashboardCardProps) {
  const s = accentStyles[accent];

  return (
    <div
      className="bg-panel-bg/60 backdrop-blur-md border border-[var(--border-subtle)] rounded-sm p-5 transition-all duration-200 hover:-translate-y-0.5"
      style={
        {
          "--card-hover-border": s.hoverBorder,
          "--card-hover-shadow": s.hoverShadow,
        } as React.CSSProperties
      }
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = s.hoverBorder;
        e.currentTarget.style.boxShadow = s.hoverShadow;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted mb-3">
        {title}
      </p>
      <p
        className="text-3xl font-mono leading-none"
        style={{ color: s.color, textShadow: `0 0 8px ${s.glow}` }}
      >
        {value}
      </p>
      {subtitle && (
        <p className="text-[11px] font-mono text-muted mt-2">{subtitle}</p>
      )}
      {bar !== undefined && (
        <div className="mt-3 h-[3px] w-full bg-[var(--border-subtle)]/30 rounded-sm overflow-hidden">
          <div
            className="h-full rounded-sm transition-all"
            style={{
              width: `${Math.min(100, Math.max(0, bar))}%`,
              backgroundColor: s.color,
              boxShadow: s.barShadow,
            }}
          />
        </div>
      )}
    </div>
  );
}
