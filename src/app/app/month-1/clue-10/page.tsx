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
    />
  );
}
