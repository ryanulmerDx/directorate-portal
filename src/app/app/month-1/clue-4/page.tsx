import { AnswerGate } from "@/components/AnswerGate";

export default function M1C4() {
  return (
    <AnswerGate
      month={1}
      clue={4}
      answers={["hole"]}
      sessionKey="m1c4_gate"
      rewardTitle="REWARD: ONLY"
      phraseSoFar="Loyalty is the only"
    />
  );
}
