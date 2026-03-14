import { StoryClue } from "@/components/StoryClue";

export default function M1C6() {
  return (
    <StoryClue
      month={1}
      clue={6}
      answers={["EXCEPTIONAL ANALYTICAL CAPABILITIES WITH STRONG MORAL FRAMEWORK"]}
      rewardTitle="PERSONNEL FILE — FULL DOSSIER UNLOCKED"
      rewardBody={[
        "Dossier cross-referenced with internal records.",
        "Subject profile matches recruitment pattern delta.",
        "Handler Reed's personal annotations have been flagged for review.",
      ]}
    >
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "#00ff41" }}>
          Personnel File - Classified
        </p>

        <div className="space-y-1">
          <p><span style={{ color: "rgba(230,230,230,0.4)" }}>SUBJECT:</span> [REDACTED]</p>
          <p><span style={{ color: "rgba(230,230,230,0.4)" }}>RECRUITMENT DATE:</span> April 2009</p>
          <p><span style={{ color: "rgba(230,230,230,0.4)" }}>HANDLER:</span> E. REED (Personal Mentorship Program)</p>
          <p>
            <span style={{ color: "rgba(230,230,230,0.4)" }}>PSYCHOLOGICAL ASSESSMENT:</span>{" "}
            &ldquo;Exceptional analytical capabilities with strong moral framework. Shows resistance
            to institutional pressure while maintaining operational effectiveness. Recommended for
            advanced ethics training.&rdquo;
          </p>
        </div>

        <div className="mt-4">
          <p className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: "rgba(230,230,230,0.4)" }}>
            Operational Notes:
          </p>
          <ul className="space-y-1 pl-4">
            <li>&bull; Consistently achieves objectives with minimal casualties</li>
            <li>&bull; Questions methodologies that prioritize efficiency over ethics</li>
            <li>&bull; Has requested access to historical operations files (DENIED)</li>
            <li>&bull; Reed&apos;s personal note: &ldquo;This one might actually change things.&rdquo;</li>
          </ul>
        </div>

        <div className="mt-4 space-y-1">
          <p><span style={{ color: "rgba(230,230,230,0.4)" }}>STATUS:</span> ACTIVE (Location: Langley Division)</p>
          <p><span style={{ color: "rgba(230,230,230,0.4)" }}>CLEARANCE LEVEL:</span> [REDACTED]</p>
        </div>

        <div
          className="mt-6 p-4 rounded-lg border"
          style={{ borderColor: "rgba(0,255,65,0.15)", background: "rgba(0,255,65,0.03)" }}
        >
          <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: "#00ff41" }}>
            Book Cipher Sequence:
          </p>
          <p className="text-lg tracking-widest" style={{ color: "#e6e6e6", fontFamily: "var(--font-orbitron)" }}>
            158-4-1 &nbsp; 158-4-2 &nbsp; 1-13-2 &nbsp; 147-14-2 &nbsp; 131-16-1 &nbsp; 2-19-6 &nbsp; 129-16-3
          </p>
        </div>
      </div>
    </StoryClue>
  );
}
