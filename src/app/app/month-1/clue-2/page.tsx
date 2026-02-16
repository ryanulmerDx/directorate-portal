import { AnswerGate } from "@/components/AnswerGate";

export default function M1C2() {
  return (
    <AnswerGate
      month={1}
      clue={2}
      answers={["echo"]}
      sessionKey="m1c2_gate"
      rewardTitle="REWARD: IS"
      phraseSoFar="Loyalty is"
    />
  );
}
