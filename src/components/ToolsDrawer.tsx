"use client";

import { useState } from "react";
import Link from "next/link";

export function ToolsDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* toggle tab — always visible on the left edge */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-6 h-20 rounded-r-md border border-l-0 border-[var(--border-subtle)] bg-panel-bg/80 backdrop-blur-md text-muted hover:text-blue hover:border-blue transition-all duration-300"
        style={{ left: open ? "256px" : "0px" }}
        aria-label={open ? "Close tools" : "Open tools"}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className="transition-transform duration-300"
          style={{ transform: open ? "rotate(0deg)" : "rotate(180deg)" }}
        >
          <path d="M8 1L3 6L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* drawer panel */}
      <aside
        className="fixed top-0 left-0 z-20 h-full w-64 border-r border-[var(--border-subtle)] bg-panel-bg/90 backdrop-blur-xl transition-transform duration-300 ease-in-out overflow-y-auto"
        style={{ transform: open ? "translateX(0)" : "translateX(-100%)" }}
      >
        <div className="px-5 pt-20 pb-8">
          <div className="flex items-center gap-2 mb-5">
            <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted whitespace-nowrap">
              Tools
            </h2>
            <div className="flex-1 h-px bg-[var(--border-subtle)]" />
          </div>

          <div className="space-y-3">
            <div className="bg-[var(--bg-primary)]/40 border border-[var(--border-subtle)] rounded-sm p-3 hover:border-blue hover:shadow-[0_4px_20px_rgba(0,179,255,0.12)] transition-all duration-200">
              <Link
                href="/app/tools/decoder"
                className="flex items-center gap-2 text-xs font-mono text-muted hover:text-blue transition-colors group"
              >
                <span className="w-1 h-1 rounded-full bg-[var(--border-subtle)] group-hover:bg-blue transition-colors" />
                Cipher Decoder
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
