import { StoryClue } from "@/components/StoryClue";

export default function M1C7() {
  return (
    <StoryClue
      month={1}
      clue={7}
      answers={[
        "THE AMERICAN UNDERSTANDS",
        "WHAT ELEANOR TRIED TO TELL THEM",
        "THE BASEMENT RECORDS PROVE EVERYTHING",
        "CALDWELL THINKS SHE CAN CONTROL",
        "THE NARRATIVE BUT THE TRUTH HAS MOMENTUM NOW",
      ]}
      rewardTitle="EXPANDED INTERCEPT — FULL TRANSMISSION RECOVERED"
      rewardBody={[
        "THE AMERICAN UNDERSTANDS",
        "WHAT ELEANOR TRIED TO TELL THEM",
        "THE BASEMENT RECORDS PROVE EVERYTHING",
        "CALDWELL THINKS SHE CAN CONTROL",
        "THE NARRATIVE BUT THE TRUTH HAS MOMENTUM NOW",
        "",
        "CONTINUATION OF TRANSMISSION:",
        "\"The external recruits represent an opportunity. Fresh perspective, unconditioned by decades of institutional doctrine. They'll see patterns we've become blind to.",
        "",
        "Caldwell believes they'll side with stability over idealism. Perhaps she's right. These recruits will have to decide: support an organization that prevents global catastrophes through morally questionable methods, or risk those catastrophes for the sake of ethical purity.",
        "",
        "There are no clean choices in this business. Eleanor understood that. The question is whether her successors will learn from her wisdom or repeat her mistakes.\"",
        "",
        "[TECHNICAL ANALYSIS: Transmission shows sophisticated encryption knowledge consistent with senior analyst training. Source remains unidentified.]",
      ]}
    >
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "#00ff41" }}>
          Intercepted Transmission
        </p>

        <div className="space-y-1">
          <p><span style={{ color: "rgba(230,230,230,0.4)" }}>DATE:</span> Three weeks ago</p>
          <p><span style={{ color: "rgba(230,230,230,0.4)" }}>SOURCE:</span> Unknown</p>
          <p><span style={{ color: "rgba(230,230,230,0.4)" }}>ENCRYPTION:</span> Basic scramble protocol</p>
        </div>

        <div className="mt-4">
          <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: "rgba(230,230,230,0.4)" }}>
            Scrambled message fragments recovered:
          </p>
        </div>

        <div
          className="p-4 rounded-lg border space-y-2"
          style={{ borderColor: "rgba(0,255,65,0.15)", background: "rgba(0,255,65,0.03)" }}
        >
          <p className="tracking-wider" style={{ color: "#e6e6e6" }}>EHT CAINERMA DNATSREDNU</p>
          <p className="tracking-wider" style={{ color: "#e6e6e6" }}>HATW RONELAE DERIT OT LLET MEHT</p>
          <p className="tracking-wider" style={{ color: "#e6e6e6" }}>EHT MUSTBANE SDROCER EVORP GNIHTYREVE</p>
          <p className="tracking-wider" style={{ color: "#e6e6e6" }}>LWELDAC SKNHIT EHS NAC LORTNOC</p>
          <p className="tracking-wider" style={{ color: "#e6e6e6" }}>EHT EVITARRAN TUB EHT HTURT SAH MUTNMEOM WON</p>
        </div>

        <p className="mt-3 text-xs italic" style={{ color: "rgba(230,230,230,0.35)" }}>
          Decode using standard unscrambling protocol.
        </p>
      </div>
    </StoryClue>
  );
}
