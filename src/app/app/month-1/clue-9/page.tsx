import { StoryClue } from "@/components/StoryClue";

export default function M1C9() {
  return (
    <StoryClue
      month={1}
      clue={9}
      answers={[
        "ELEANOR REED BASEMENT RECORDER",
        "NOVEMBER 1963",
        "FORTY SIX HOURS",
      ]}
      rewardTitle="TECHNICAL ANALYSIS — RECORDING DEVICE DECODED"
      rewardBody={[
        "Device identified as Eleanor Reed's personal recording equipment.",
        "Installation date: November 1963.",
        "Total recording duration: Forty-six hours of audio captured.",
        "",
        "Contents of recordings are under Level 7 classification review.",
        "Preliminary analysis suggests Reed documented internal deliberations during a critical operational period.",
      ]}
    >
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "#00ff41" }}>
          Technical Intelligence Report
        </p>

        <p className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: "rgba(230,230,230,0.4)" }}>
          Equipment Analysis: Modified Recording Device
        </p>

        <div className="mt-4">
          <p className="mb-3">Found hidden in basement wall during renovation (2019):</p>
          <ul className="space-y-1 pl-4">
            <li>&bull; Custom-built audio recorder, vintage 1963</li>
          </ul>
        </div>

        <div
          className="p-4 rounded-lg border space-y-2"
          style={{ borderColor: "rgba(0,255,65,0.15)", background: "rgba(0,255,65,0.03)" }}
        >
          <p>
            <span style={{ color: "rgba(230,230,230,0.4)" }}>Device Information:</span>{" "}
            <span className="tracking-wider" style={{ color: "#e6e6e6" }}>HQHDQRU UHHG EDVHPHQW UHFRUGHU</span>
          </p>
          <p>
            <span style={{ color: "rgba(230,230,230,0.4)" }}>Installation Date:</span>{" "}
            <span className="tracking-wider" style={{ color: "#e6e6e6" }}>QRYHPEHU 1963</span>
          </p>
          <p>
            <span style={{ color: "rgba(230,230,230,0.4)" }}>Recording Duration:</span>{" "}
            <span className="tracking-wider" style={{ color: "#e6e6e6" }}>IRUWB VLA KRXUV</span>
          </p>
        </div>

        <p className="mt-3 text-xs italic" style={{ color: "rgba(230,230,230,0.35)" }}>
          Use standard decryption protocol with shift value matching installation year digits.
        </p>
      </div>
    </StoryClue>
  );
}
