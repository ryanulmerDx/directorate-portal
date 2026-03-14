import { StoryClue } from "@/components/StoryClue";

export default function M1C10() {
  return (
    <StoryClue
      month={1}
      clue={10}
      answers={[
        "THESE INDIVIDUALS SHOW EXCEPTIONALLY HIGH MORAL REASONING SCORES",
        "CANDIDATES ARE ALREADY QUESTIONING THE RECRUITMENT NARRATIVE",
        "RECOMMENDATION CONSIDER CANDIDATES WITH MORE FLEXIBLE ETHICAL FRAMEWORKS",
      ]}
      rewardTitle="MEMORANDUM — CONTINUED"
      rewardBody={[
        "FROM: Dr. Patricia Vance, Chief Psychological Assessor",
        "TO: Director Caldwell",
        "",
        "Additional observations on recruitment candidates:",
        "",
        "The external recruits are asking sophisticated questions about institutional oversight and operational ethics. This suggests our unknown source is successfully raising doubts about organizational legitimacy.",
        "",
        "However, candidates also show strong analytical capabilities and genuine concern for global security threats. When presented with scenario testing involving terrorist prevention or nuclear proliferation, they consistently choose effective intervention over procedural compliance.",
        "",
        "CONCLUSION: These individuals possess both the moral framework to question our methods AND the practical understanding to recognize why those methods are necessary. They represent either our greatest asset or our greatest threat, depending on how the current crisis resolves.",
        "",
        "The recruits will ultimately choose the path that best serves human welfare. Our challenge is demonstrating that institutional stability serves that goal better than institutional reform.",
        "",
        "RECOMMENDATION: Present candidates with full operational context. Let them see both the moral costs and the humanitarian necessity. Trust their judgment rather than attempting to manipulate their loyalty.",
      ]}
    >
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "#00ff41" }}>
          Memorandum
        </p>

        <div className="space-y-1">
          <p><span style={{ color: "rgba(230,230,230,0.4)" }}>FROM:</span> Dr. Patricia Vance, Chief Psychological Assessor</p>
          <p><span style={{ color: "rgba(230,230,230,0.4)" }}>TO:</span> Director Caldwell</p>
          <p><span style={{ color: "rgba(230,230,230,0.4)" }}>RE:</span> Recruitment Program Assessment</p>
        </div>

        <p className="mt-4">
          I&apos;ve completed the three-category psychological evaluation of current external
          recruitment candidates:
        </p>

        <div className="pl-4 space-y-1">
          <p><span style={{ color: "rgba(230,230,230,0.4)" }}>CATEGORY 1:</span> Analytical Capabilities</p>
          <p><span style={{ color: "rgba(230,230,230,0.4)" }}>CATEGORY 2:</span> Moral Reasoning</p>
          <p><span style={{ color: "rgba(230,230,230,0.4)" }}>CATEGORY 3:</span> Institutional Loyalty</p>
        </div>

        <div className="mt-4">
          <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: "rgba(230,230,230,0.4)" }}>
            Encrypted Assessment - Security Protocol:
          </p>
        </div>

        <div
          className="p-4 rounded-lg border space-y-2"
          style={{ borderColor: "rgba(0,255,65,0.15)", background: "rgba(0,255,65,0.03)" }}
        >
          <p className="tracking-wider" style={{ color: "#e6e6e6" }}>WKHVH LQGLYLGXDOV VKRZ HAFHSWLRQDOOB KLJK PRUDO UHDVRQLQJ VFRUHV</p>
          <p className="tracking-wider" style={{ color: "#e6e6e6" }}>FDQGLGDWHV DUH DOUHDGB TXHVWLRQLQJ WKH UHFUXLWPHQW QDUUDWLYH</p>
          <p className="tracking-wider" style={{ color: "#e6e6e6" }}>UHFRPPHQGDWLRQ: FRQVLGHU FDQGLGDWHV ZLWK PRUH IOHALEOH HWKLFDO IUDPHZRUNV</p>
        </div>

        <p className="mt-3 text-xs italic" style={{ color: "rgba(230,230,230,0.35)" }}>
          Decryption key: Use psychological assessment protocol standard.
        </p>
      </div>
    </StoryClue>
  );
}
