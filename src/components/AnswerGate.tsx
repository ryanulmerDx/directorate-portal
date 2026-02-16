"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

/* ── types ─────────────────────────────────────────────── */
interface AnswerGateProps {
  month: number;
  clue: number;
  answers: string[];
  sessionKey: string;
  rewardTitle: string;
  phraseSoFar: string;
  rewardBody?: string[];
  /** If true, renders a special final-clue layout */
  isFinal?: boolean;
  finalHeading?: string;
}

/* ── helpers ───────────────────────────────────────────── */
function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/* ── lock icon ─────────────────────────────────────────── */
function LockIcon({ unlocked }: { unlocked: boolean }) {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        animation: unlocked
          ? "glow-burst 1.4s ease-out forwards"
          : "pulse-glow 2.4s ease-in-out infinite",
      }}
    >
      <path
        d="M36 56V40C36 26.745 46.745 16 60 16C73.255 16 84 26.745 84 40V56"
        stroke="#00ff41"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        style={{
          transformOrigin: "60px 56px",
          animation: unlocked
            ? "unlock-shackle 1.4s cubic-bezier(0.22, 0.61, 0.36, 1) forwards"
            : "none",
        }}
      />
      <rect x="26" y="56" width="68" height="48" rx="8" fill="rgba(0,255,65,0.06)" stroke="#00ff41" strokeWidth="4" />
      <circle cx="60" cy="76" r="6" fill="#00ff41" opacity={unlocked ? 1 : 0.5} style={{ transition: "opacity 0.4s" }} />
      <rect x="57.5" y="80" width="5" height="10" rx="2" fill="#00ff41" opacity={unlocked ? 1 : 0.5} style={{ transition: "opacity 0.4s" }} />
    </svg>
  );
}

/* ── component ─────────────────────────────────────────── */
export function AnswerGate({
  month,
  clue,
  answers,
  rewardTitle,
  phraseSoFar,
  rewardBody = ["Thank you for your participation thus far.", "We will be in contact."],
  isFinal = false,
  finalHeading,
}: AnswerGateProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [locked, setLocked] = useState(false);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [shaking, setShaking] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [lockHidden, setLockHidden] = useState(false);

  const clueKey = `M${month}C${clue}`;
  const supabase = createClient();

  /* ── load solved state from Supabase on mount ──────── */
  useEffect(() => {
    let cancelled = false;

    async function loadState() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user || cancelled) return;

      // Gate check: clue > 1 must have previous clue's next_page_unlocked
      if (clue > 1) {
        const prevKey = `M${month}C${clue - 1}`;
        const { data: prevRow } = await supabase
          .from("clue_state")
          .select("next_page_unlocked")
          .eq("user_id", user.id)
          .eq("clue_key", prevKey)
          .maybeSingle();

        if (cancelled) return;

        if (!prevRow || !prevRow.next_page_unlocked) {
          setLocked(true);
          setMounted(true);
          return;
        }
      }

      // Try to fetch existing row
      const { data } = await supabase
        .from("clue_state")
        .select("solved")
        .eq("user_id", user.id)
        .eq("clue_key", clueKey)
        .maybeSingle();

      if (cancelled) return;

      if (!data) {
        // No row yet — insert default unsolved row
        await supabase.from("clue_state").insert({
          user_id: user.id,
          clue_key: clueKey,
          solved: false,
        });
      } else if (data.solved) {
        setUnlocked(true);
        setShowReward(true);
        setLockHidden(true);
      }

      setMounted(true);
    }

    loadState();
    return () => {
      cancelled = true;
    };
  }, [clueKey, supabase]);

  /* ── submit answer ─────────────────────────────────── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = normalize(answer);
    const isCorrect = answers.some((a) => normalize(a) === normalized);

    if (isCorrect) {
      setFeedback("correct");
      setUnlocked(true);
      setTimeout(() => setLockHidden(true), 1600);
      setTimeout(() => setShowReward(true), 1800);

      // Persist to Supabase
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from("clue_state")
          .update({ solved: true, solved_at: new Date().toISOString() })
          .eq("user_id", user.id)
          .eq("clue_key", clueKey);
      }
    } else {
      setFeedback("incorrect");
      setShaking(true);
      setTimeout(() => setShaking(false), 400);
    }
  };

  /* ── reset (for testing) ───────────────────────────── */
  const handleReset = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from("clue_state")
        .update({ solved: false, solved_at: null })
        .eq("user_id", user.id)
        .eq("clue_key", clueKey);
    }
    setUnlocked(false);
    setShowReward(false);
    setLockHidden(false);
    setAnswer("");
    setFeedback(null);
  };

  if (!mounted) return null;

  const font = "var(--font-orbitron)";
  const green = "#00ff41";
  const greenDim = "rgba(0,255,65,0.15)";
  const red = "#ff003c";
  const textColor = "#e6e6e6";

  /* ── locked state — previous clue not yet solved ──── */
  if (locked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-16">
        <div className="w-full max-w-2xl mb-10">
          <Link
            href="/app/dashboard"
            className="text-sm uppercase tracking-widest transition-colors"
            style={{ color: "rgba(230,230,230,0.35)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = green)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(230,230,230,0.35)")}
          >
            &larr; Dashboard
          </Link>
        </div>

        <div
          className="w-full max-w-2xl rounded-3xl border backdrop-blur-md"
          style={{
            background: "#0a0a0a",
            borderColor: greenDim,
            boxShadow: "0 0 60px rgba(0,255,65,0.06), inset 0 0 60px rgba(0,255,65,0.02)",
          }}
        >
          <div className="px-12 pt-14 pb-12 flex flex-col items-center text-center">
            <p
              className="text-xs uppercase tracking-[0.35em] mb-10"
              style={{ color: "rgba(230,230,230,0.35)", fontFamily: font }}
            >
              Month {month} &bull; Clue {clue}
            </p>

            <div className="mb-10">
              <LockIcon unlocked={false} />
            </div>

            <h1
              className="text-3xl tracking-wider mb-3"
              style={{ fontFamily: font, color: green }}
            >
              CLASSIFIED
            </h1>

            <p
              className="text-base mb-6"
              style={{ color: "rgba(230,230,230,0.45)" }}
            >
              Complete the previous clue to unlock this file.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-16">
      <div className="w-full max-w-2xl mb-10">
        <Link
          href="/app/dashboard"
          className="text-sm uppercase tracking-widest transition-colors"
          style={{ color: "rgba(230,230,230,0.35)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = green)}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(230,230,230,0.35)")}
        >
          &larr; Dashboard
        </Link>
      </div>

      <div
        className="w-full max-w-2xl rounded-3xl border backdrop-blur-md"
        style={{
          background: "#0a0a0a",
          borderColor: greenDim,
          boxShadow: "0 0 60px rgba(0,255,65,0.06), inset 0 0 60px rgba(0,255,65,0.02)",
          animation: shaking ? "shake 0.4s ease-in-out" : "none",
        }}
      >
        <div className="px-12 pt-14 pb-12 flex flex-col items-center text-center">
          <p
            className="text-xs uppercase tracking-[0.35em] mb-10"
            style={{ color: "rgba(230,230,230,0.35)", fontFamily: font }}
          >
            Month {month} &bull; Clue {clue}
          </p>

          {!lockHidden && (
            <div className="mb-10">
              <LockIcon unlocked={unlocked} />
            </div>
          )}

          {!showReward && (
            <h1 className="text-3xl tracking-wider mb-3" style={{ fontFamily: font, color: green }}>
              {unlocked ? "ACCESS GRANTED" : "VERIFICATION REQUIRED"}
            </h1>
          )}

          {!showReward && !unlocked && (
            <p className="text-base mb-12" style={{ color: "rgba(230,230,230,0.45)" }}>
              Enter the correct phrase to proceed.
            </p>
          )}

          {unlocked && !showReward && (
            <p className="text-base mt-4" style={{ color: "#20d46b" }}>
              &#10003; Phrase Verified
            </p>
          )}

          {!unlocked && (
            <form onSubmit={handleSubmit} className="w-full space-y-5">
              <input
                type="text"
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                  if (feedback === "incorrect") setFeedback(null);
                }}
                aria-invalid={feedback === "incorrect"}
                placeholder="Type your answer..."
                autoComplete="off"
                className="w-full px-6 py-4 rounded-xl focus:outline-none transition-all text-lg"
                style={{
                  fontFamily: font,
                  letterSpacing: "0.05em",
                  background: "rgba(255,255,255,0.03)",
                  color: textColor,
                  border: `1px solid ${feedback === "incorrect" ? red : greenDim}`,
                  boxShadow: feedback === "incorrect" ? "0 0 16px rgba(255,0,60,0.15)" : "none",
                }}
                onFocus={(e) => {
                  if (feedback !== "incorrect") {
                    e.currentTarget.style.borderColor = green;
                    e.currentTarget.style.boxShadow = "0 0 16px rgba(0,255,65,0.12)";
                  }
                }}
                onBlur={(e) => {
                  if (feedback !== "incorrect") {
                    e.currentTarget.style.borderColor = greenDim;
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
              />
              <button
                type="submit"
                disabled={feedback === "correct"}
                className="w-full py-4 rounded-xl text-sm uppercase tracking-widest transition-all disabled:opacity-50"
                style={{
                  fontFamily: font,
                  background: "rgba(0,255,65,0.06)",
                  border: `1px solid ${greenDim}`,
                  color: green,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(0,255,65,0.12)";
                  e.currentTarget.style.boxShadow = "0 0 24px rgba(0,255,65,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(0,255,65,0.06)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Submit
              </button>
              {feedback === "incorrect" && (
                <p className="text-base pt-2" style={{ color: red }}>
                  Incorrect &mdash; try again.
                </p>
              )}
            </form>
          )}

          {showReward && (
            <div className="w-full text-center" style={{ animation: "fade-in-up 0.8s ease-out both" }}>
              <h1
                className="text-4xl tracking-wider mb-4"
                style={{ fontFamily: font, color: green, textShadow: "0 0 30px rgba(0,255,65,0.3)" }}
              >
                {isFinal && finalHeading ? finalHeading : "ACCESS GRANTED"}
              </h1>

              <div
                className="w-24 h-px mx-auto mb-10"
                style={{ background: `linear-gradient(90deg, transparent, ${green}, transparent)` }}
              />

              <h2 className="text-3xl tracking-wider mb-8" style={{ fontFamily: font, color: textColor }}>
                {rewardTitle}
              </h2>

              {!isFinal && (
                <p className="text-xl leading-relaxed mb-4" style={{ color: textColor }}>
                  Your phrase so far:{" "}
                  <span className="font-semibold" style={{ color: green, textShadow: "0 0 12px rgba(0,255,65,0.3)" }}>
                    {phraseSoFar}
                  </span>
                </p>
              )}

              {rewardBody.map((line, i) => (
                <p key={i} className="text-lg leading-relaxed mb-2" style={{ color: "rgba(230,230,230,0.5)" }}>
                  {line}
                </p>
              ))}

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
