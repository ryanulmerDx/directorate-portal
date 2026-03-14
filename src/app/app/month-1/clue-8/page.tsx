"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

/* ── config ──────────────────────────────────────────── */
const LINES = [
  { encrypted: "VXEMHFW REVHUYHG DFFHVVLQJ HOHQQRU UHHG ILOHV", answer: "SUBJECT OBSERVED ACCESSING ELEANOR REED FILES" },
  { encrypted: "GRZQORDGHG WZR SRLQW WKUHH WHUDEBWHV", answer: "DOWNLOADED TWO POINT THREE TERABYTES" },
  { encrypted: "LQFOXGLQJ SHUVRQDO MRXUQDOV DQG FDVXDOWB UHSRUWV", answer: "INCLUDING PERSONAL JOURNALS AND CASUALTY REPORTS" },
  { encrypted: "VXEMHFW VKRZHG VLJQV RI HPRWLRQDO GLVWUHVV", answer: "SUBJECT SHOWED SIGNS OF EMOTIONAL DISTRESS" },
  { encrypted: "VHVVLRQ ODVWHG IRXU KRXUV WZHQWB WKUHH PLQXWHV", answer: "SESSION LASTED FOUR HOURS TWENTY THREE MINUTES" },
];

const REWARD_BODY = [
  "Subject's access pattern suggests systematic research rather than random data theft. Focus areas:",
  "",
  "\u2022 Operations with civilian casualties (1970\u20132020)",
  "\u2022 Instances where official oversight was bypassed",
  "\u2022 Decisions made without government authorization",
  "\u2022 Eleanor Reed's ethical assessments of controversial operations",
  "",
  "PSYCHOLOGICAL PROFILE UPDATE:",
  "Subject exhibited signs of emotional distress when reviewing:",
  "\u2022 1995 Somalia intervention (27 civilian casualties)",
  "\u2022 2003 financial market manipulation (prevented economic collapse, destroyed 40,000 retirement accounts)",
  "\u2022 2018 pandemic response (stopped bioweapon release, eliminated 8 researchers who discovered the threat)",
  "",
  "NOTABLE: Subject spent significant time reviewing mission success rates and lives saved statistics. This suggests internal conflict rather than simple opposition to organizational methods.",
  "",
  "ASSESSMENT: Subject appears to be conducting moral inventory of organizational actions, weighing costs against benefits. Motivation remains unclear.",
];

/* ── helpers ──────────────────────────────────────────── */
function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/* ── lock icon ───────────────────────────────────────── */
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

/* ── component ───────────────────────────────────────── */
export default function M1C8() {
  const [mounted, setMounted] = useState(false);
  const [locked, setLocked] = useState(false);
  const [solved, setSolved] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [lockHidden, setLockHidden] = useState(false);

  const [inputs, setInputs] = useState<string[]>(["", "", "", "", ""]);
  const [correct, setCorrect] = useState<boolean[]>([false, false, false, false, false]);
  const [shaking, setShaking] = useState<number | null>(null);

  const supabase = createClient();
  const clueKey = "M1C8";

  const font = "var(--font-orbitron)";
  const green = "#00ff41";
  const greenDim = "rgba(0,255,65,0.15)";
  const textColor = "#e6e6e6";

  /* ── load state ────────────────────────────────────── */
  useEffect(() => {
    let cancelled = false;

    async function loadState() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user || cancelled) return;

      const { data: agent } = await supabase
        .from("agents")
        .select("program_month")
        .eq("user_id", user.id)
        .maybeSingle();

      if (cancelled) return;
      if (!agent || 1 > agent.program_month) {
        setLocked(true);
        setMounted(true);
        return;
      }

      const prevKey = "M1C7";
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

      const { data } = await supabase
        .from("clue_state")
        .select("solved")
        .eq("user_id", user.id)
        .eq("clue_key", clueKey)
        .maybeSingle();

      if (cancelled) return;

      if (!data) {
        await supabase.from("clue_state").insert({
          user_id: user.id,
          clue_key: clueKey,
          solved: false,
        });
      } else if (data.solved) {
        setSolved(true);
        setCorrect([true, true, true, true, true]);
        setInputs(LINES.map((l) => l.answer));
        setShowReward(true);
        setLockHidden(true);
      }

      setMounted(true);
    }

    loadState();
    return () => {
      cancelled = true;
    };
  }, [supabase]);

  /* ── submit one line ───────────────────────────────── */
  const handleLineSubmit = async (index: number) => {
    if (correct[index]) return;

    const normalized = normalize(inputs[index]);
    const expected = normalize(LINES[index].answer);

    if (normalized === expected) {
      const newCorrect = [...correct];
      newCorrect[index] = true;
      setCorrect(newCorrect);

      const newInputs = [...inputs];
      newInputs[index] = LINES[index].answer;
      setInputs(newInputs);

      const allCorrect = newCorrect.every(Boolean);
      if (allCorrect) {
        setSolved(true);
        setTimeout(() => setLockHidden(true), 1600);
        setTimeout(() => setShowReward(true), 1800);

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
      }
    } else {
      setShaking(index);
      setTimeout(() => setShaking(null), 400);
    }
  };

  if (!mounted) return null;

  /* ── locked ────────────────────────────────────────── */
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
            <p className="text-xs uppercase tracking-[0.35em] mb-10" style={{ color: "rgba(230,230,230,0.35)", fontFamily: font }}>
              Month 1 &bull; Clue 8
            </p>
            <div className="mb-10"><LockIcon unlocked={false} /></div>
            <h1 className="text-3xl tracking-wider mb-3" style={{ fontFamily: font, color: green }}>CLASSIFIED</h1>
            <p className="text-base mb-6" style={{ color: "rgba(230,230,230,0.45)" }}>
              Complete the previous clue to unlock this file.
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ── main ──────────────────────────────────────────── */
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
          <p className="text-xs uppercase tracking-[0.35em] mb-10" style={{ color: "rgba(230,230,230,0.35)", fontFamily: font }}>
            Month 1 &bull; Clue 8
          </p>

          {!lockHidden && (
            <div className="mb-10">
              <LockIcon unlocked={solved} />
            </div>
          )}

          {!showReward && (
            <h1 className="text-3xl tracking-wider mb-3" style={{ fontFamily: font, color: green }}>
              {solved ? "ACCESS GRANTED" : "VERIFICATION REQUIRED"}
            </h1>
          )}

          {!showReward && !solved && (
            <p className="text-base mb-8" style={{ color: "rgba(230,230,230,0.45)" }}>
              Decode each encrypted observation below.
            </p>
          )}

          {solved && !showReward && (
            <p className="text-base mt-4" style={{ color: "#20d46b" }}>
              &#10003; Phrase Verified
            </p>
          )}

          {!showReward && !solved && (
            <div className="w-full space-y-4">
              {LINES.map((line, i) => (
                <div
                  key={i}
                  style={{ animation: shaking === i ? "shake 0.4s ease-in-out" : "none" }}
                >
                  <p
                    className="text-xs font-mono tracking-wider text-left mb-2"
                    style={{ color: correct[i] ? green : "rgba(230,230,230,0.4)" }}
                  >
                    {line.encrypted}
                  </p>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={inputs[i]}
                      disabled={correct[i]}
                      onChange={(e) => {
                        const newInputs = [...inputs];
                        newInputs[i] = e.target.value;
                        setInputs(newInputs);
                      }}
                      placeholder="Enter decoded text..."
                      autoComplete="off"
                      className="flex-1 px-4 py-3 rounded-lg focus:outline-none transition-all text-sm"
                      style={{
                        fontFamily: font,
                        letterSpacing: "0.03em",
                        background: correct[i] ? "rgba(0,255,65,0.06)" : "rgba(255,255,255,0.03)",
                        color: correct[i] ? green : textColor,
                        border: `1px solid ${correct[i] ? green : greenDim}`,
                        opacity: correct[i] ? 0.8 : 1,
                      }}
                      onFocus={(e) => {
                        if (!correct[i]) {
                          e.currentTarget.style.borderColor = green;
                          e.currentTarget.style.boxShadow = "0 0 12px rgba(0,255,65,0.1)";
                        }
                      }}
                      onBlur={(e) => {
                        if (!correct[i]) {
                          e.currentTarget.style.borderColor = greenDim;
                          e.currentTarget.style.boxShadow = "none";
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleLineSubmit(i);
                        }
                      }}
                    />
                    {correct[i] ? (
                      <div
                        className="flex items-center justify-center w-12 rounded-lg"
                        style={{ color: green, fontSize: "18px" }}
                      >
                        &#10003;
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleLineSubmit(i)}
                        className="px-4 py-3 rounded-lg text-xs uppercase tracking-widest transition-all"
                        style={{
                          fontFamily: font,
                          background: "rgba(0,255,65,0.06)",
                          border: `1px solid ${greenDim}`,
                          color: green,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(0,255,65,0.12)";
                          e.currentTarget.style.boxShadow = "0 0 16px rgba(0,255,65,0.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(0,255,65,0.06)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        &#10148;
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {showReward && (
            <div className="w-full text-center" style={{ animation: "fade-in-up 0.8s ease-out both" }}>
              <h1
                className="text-3xl tracking-wider mb-4"
                style={{ fontFamily: font, color: green, textShadow: "0 0 30px rgba(0,255,65,0.3)" }}
              >
                INTEL RECOVERED
              </h1>

              <div
                className="w-24 h-px mx-auto mb-8"
                style={{ background: `linear-gradient(90deg, transparent, ${green}, transparent)` }}
              />

              <h2 className="text-xl tracking-wider mb-6" style={{ fontFamily: font, color: textColor }}>
                SURVEILLANCE CONTINUATION — BEHAVIORAL ANALYSIS
              </h2>

              <div
                className="w-full rounded-xl border mb-6 overflow-hidden"
                style={{ borderColor: "rgba(0,255,65,0.1)" }}
              >
                <img
                  src="/camera_4_7.jpg"
                  alt="Classified evidence"
                  className="w-full h-auto"
                />
                <div className="px-4 py-2" style={{ background: "rgba(0,255,65,0.04)" }}>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-mono" style={{ color: "rgba(0,255,65,0.4)" }}>
                    Surveillance Capture — Eyes Only
                  </p>
                </div>
              </div>

              <div
                className="w-full rounded-xl border p-6 text-left"
                style={{
                  background: "rgba(0,255,65,0.02)",
                  borderColor: "rgba(0,255,65,0.1)",
                }}
              >
                {REWARD_BODY.map((line, i) => (
                  <p
                    key={i}
                    className="text-sm leading-relaxed font-mono"
                    style={{
                      color: line === "" ? "transparent" : "rgba(230,230,230,0.6)",
                      minHeight: line === "" ? "0.75rem" : undefined,
                    }}
                  >
                    {line || "\u00A0"}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
