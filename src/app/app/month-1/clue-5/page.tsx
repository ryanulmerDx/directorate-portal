import { AnswerGate } from "@/components/AnswerGate";

export default function M1C5() {
  return (
    <AnswerGate
      month={1}
      clue={5}
      answers={["LOYALTY IS THE ONLY CURRENCY"]}
      sessionKey="m1c5_gate"
      rewardTitle="Reward: LOYALTY IS THE ONLY CURRENCY"
      phraseSoFar=""
      isFinal
      finalHeading="Congratulations... AGENT"
      rewardBody={[
        "Thank you for your participation thus far.",
        "We will be in contact.",
      ]}
    />
  );
}
