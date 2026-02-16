import Link from "next/link";

interface ClueNavProps {
  month: number;
  clue: number;
}

export function ClueNav({ month, clue }: ClueNavProps) {
  const currentIndex = (month - 1) * 5 + clue;
  const hasPrev = currentIndex > 1;
  const hasNext = currentIndex < 20;

  const prevMonth = clue > 1 ? month : month - 1;
  const prevClue = clue > 1 ? clue - 1 : 5;
  const nextMonth = clue < 5 ? month : month + 1;
  const nextClue = clue < 5 ? clue + 1 : 1;

  return (
    <div className="flex justify-between mt-8">
      {hasPrev ? (
        <Link
          href={`/app/month-${prevMonth}/clue-${prevClue}`}
          className="px-4 py-2 border border-glass-border rounded-lg text-matrix hover:bg-glass-bg-hover transition-colors"
        >
          Previous Clue
        </Link>
      ) : (
        <button
          disabled
          className="px-4 py-2 border border-glass-border/30 rounded-lg text-foreground/30 cursor-not-allowed"
        >
          Previous Clue
        </button>
      )}
      {hasNext ? (
        <Link
          href={`/app/month-${nextMonth}/clue-${nextClue}`}
          className="px-4 py-2 border border-glass-border rounded-lg text-matrix hover:bg-glass-bg-hover transition-colors"
        >
          Next Clue
        </Link>
      ) : (
        <button
          disabled
          className="px-4 py-2 border border-glass-border/30 rounded-lg text-foreground/30 cursor-not-allowed"
        >
          Next Clue
        </button>
      )}
    </div>
  );
}
