import { StoryClue } from "@/components/StoryClue";

export default function M1C8() {
  return (
    <StoryClue
      month={1}
      clue={8}
      answers={[
        "SUBJECT OBSERVED ACCESSING ELEANOR REED FILES",
        "DOWNLOADED TWO POINT THREE TERABYTES",
        "INCLUDING PERSONAL JOURNALS AND CASUALTY REPORTS",
        "SUBJECT SHOWED SIGNS OF EMOTIONAL DISTRESS",
        "SESSION LASTED FOUR HOURS TWENTY THREE MINUTES",
      ]}
      rewardTitle="SURVEILLANCE CONTINUATION — BEHAVIORAL ANALYSIS"
      rewardBody={[
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
      ]}
    >
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "#00ff41" }}>
          Surveillance Log - Internal Security
        </p>

        <div className="space-y-1">
          <p><span style={{ color: "rgba(230,230,230,0.4)" }}>DATE:</span> 15 March 2025</p>
          <p><span style={{ color: "rgba(230,230,230,0.4)" }}>LOCATION:</span> Archive Access Terminal 7</p>
        </div>

        <div className="mt-4">
          <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: "rgba(230,230,230,0.4)" }}>
            Encrypted Observation Notes:
          </p>
        </div>

        <div
          className="p-4 rounded-lg border space-y-2"
          style={{ borderColor: "rgba(0,255,65,0.15)", background: "rgba(0,255,65,0.03)" }}
        >
          <p className="tracking-wider" style={{ color: "#e6e6e6" }}>VXEMHFW REVHUYHG DFFHVVLQJ HOHQQRU UHHG ILOHV</p>
          <p className="tracking-wider" style={{ color: "#e6e6e6" }}>GRZQORDGHG WZR SRLQW WKUHH WHUDEBWHV</p>
          <p className="tracking-wider" style={{ color: "#e6e6e6" }}>LQFOXGLQJ SHUVRQDO MRXUQDOV DQG FDVXDOWB UHSRUWV</p>
          <p className="tracking-wider" style={{ color: "#e6e6e6" }}>VXEMHFW VKRZHG VLJQV RI HPRWLRQDO GLVWUHVV</p>
          <p className="tracking-wider" style={{ color: "#e6e6e6" }}>VHVVLRQ ODVWHG IRXU KRXUV WZHQWB WKUHH PLQXWHV</p>
        </div>

        <p className="mt-3 text-xs italic" style={{ color: "rgba(230,230,230,0.35)" }}>
          Use Caesar protocol with standard shift.
        </p>
      </div>
    </StoryClue>
  );
}
