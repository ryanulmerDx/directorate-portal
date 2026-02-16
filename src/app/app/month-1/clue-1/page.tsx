import { AnswerGate } from "@/components/AnswerGate";

export default function M1C1() {
  return (
    <AnswerGate
      month={1}
      clue={1}
      answers={["This Is Your First Test"]}
      sessionKey="m1c1_gate"
      rewardTitle="REWARD: LOYALTY"
      phraseSoFar="Loyalty"
    />
  );
}
