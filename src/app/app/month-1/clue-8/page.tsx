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
      rewardImage="/camera_4_7.png"
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
    />
  );
}
