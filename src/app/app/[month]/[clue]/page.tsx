import { notFound } from "next/navigation";
import { GlassPanel } from "@/components/GlassPanel";
import { ClueNav } from "@/components/ClueNav";
import Link from "next/link";

const VALID_MONTHS = ["month-1", "month-2", "month-3", "month-4"];
const VALID_CLUES = ["clue-1", "clue-2", "clue-3", "clue-4", "clue-5"];

interface CluePageProps {
  params: Promise<{ month: string; clue: string }>;
}

export default async function CluePage({ params }: CluePageProps) {
  const { month: monthSlug, clue: clueSlug } = await params;

  if (!VALID_MONTHS.includes(monthSlug) || !VALID_CLUES.includes(clueSlug)) {
    notFound();
  }

  const month = parseInt(monthSlug.split("-")[1]);
  const clue = parseInt(clueSlug.split("-")[1]);

  return (
    <div>
      <Link
        href="/app/dashboard"
        className="text-sm text-foreground/40 hover:text-matrix transition-colors mb-6 inline-block"
      >
        &larr; Back to Dashboard
      </Link>

      <h1 className="text-2xl font-mono text-matrix mb-8">
        Month {month} &bull; Clue {clue}
      </h1>

      <GlassPanel className="p-8">
        <p className="text-foreground/80 leading-relaxed">
          This is a placeholder for Clue {clue} of Month {month}. The content
          of this clue will be revealed in due time. Pay attention to the
          details &mdash; nothing is as it seems.
        </p>
      </GlassPanel>

      <ClueNav month={month} clue={clue} />
    </div>
  );
}
