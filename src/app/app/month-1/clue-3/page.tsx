import { AnswerGate } from "@/components/AnswerGate";

export default function M1C3() {
  return (
    <AnswerGate
      month={1}
      clue={3}
      answers={["the"]}
      sessionKey="m1c3_gate"
      rewardTitle="REWARD: THE"
      phraseSoFar="Loyalty is the"
    />
  );
}
