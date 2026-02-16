interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassPanel({ children, className = "" }: GlassPanelProps) {
  return (
    <div
      className={`bg-glass-bg backdrop-blur-md border border-glass-border rounded-xl shadow-[0_0_15px_rgba(0,255,65,0.1)] ${className}`}
    >
      {children}
    </div>
  );
}
