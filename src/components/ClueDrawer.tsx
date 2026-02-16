"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export function ClueDrawer() {
  const [open, setOpen] = useState(false);
  const [unlocked, setUnlocked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function loadUnlocks() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("clue_state")
        .select("clue_key, next_page_unlocked")
        .eq("user_id", user.id);

      if (data) {
        const map: Record<string, boolean> = {};
        data.forEach((row: { clue_key: string; next_page_unlocked: boolean }) => {
          map[row.clue_key] = row.next_page_unlocked;
        });
        setUnlocked(map);
      }
    }

    loadUnlocks();
  }, []);

  function isVisible(month: number, clue: number): boolean {
    if (clue === 1) return true;
    const prevKey = `M${month}C${clue - 1}`;
    return unlocked[prevKey] === true;
  }

  return (
    <>
      {/* toggle tab — always visible on the right edge */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-6 h-20 rounded-l-md border border-r-0 border-[var(--border-subtle)] bg-panel-bg/80 backdrop-blur-md text-muted hover:text-blue hover:border-blue transition-all duration-300"
        style={{ right: open ? "256px" : "0px" }}
        aria-label={open ? "Close clue index" : "Open clue index"}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className="transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <path d="M8 1L3 6L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* drawer panel */}
      <aside
        className="fixed top-0 right-0 z-20 h-full w-64 border-l border-[var(--border-subtle)] bg-panel-bg/90 backdrop-blur-xl transition-transform duration-300 ease-in-out overflow-y-auto"
        style={{ transform: open ? "translateX(0)" : "translateX(100%)" }}
      >
        <div className="px-5 pt-20 pb-8">
          <div className="flex items-center gap-2 mb-5">
            <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted whitespace-nowrap">
              Clue Index
            </h2>
            <div className="flex-1 h-px bg-[var(--border-subtle)]" />
          </div>

          <div className="space-y-3">
            {[1].map((month) => {
              const visibleClues = [1, 2, 3, 4, 5].filter((clue) =>
                isVisible(month, clue)
              );
              return (
                <div
                  key={month}
                  className="bg-[var(--bg-primary)]/40 border border-[var(--border-subtle)] rounded-sm p-3 hover:border-blue hover:shadow-[0_4px_20px_rgba(0,179,255,0.12)] transition-all duration-200"
                >
                  <h3 className="text-[10px] font-mono uppercase tracking-[0.15em] text-blue mb-2">
                    Month {month}
                  </h3>
                  <div className="space-y-1">
                    {visibleClues.map((clue) => (
                      <Link
                        key={clue}
                        href={`/app/month-${month}/clue-${clue}`}
                        className="flex items-center gap-2 text-xs font-mono text-muted hover:text-blue transition-colors group"
                      >
                        <span className="w-1 h-1 rounded-full bg-[var(--border-subtle)] group-hover:bg-blue transition-colors" />
                        Clue {clue}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
}
