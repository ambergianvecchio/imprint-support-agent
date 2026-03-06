"use client";

const STARTER_QUESTIONS = [
  "How do I cancel my subscription?",
  "There's a problem with my subscription",
  "What's included in my subscription?",
  "The app isn't working",
];

interface StarterChipsProps {
  onSelect: (question: string) => void;
}

export default function StarterChips({ onSelect }: StarterChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {STARTER_QUESTIONS.map((question) => (
        <button
          key={question}
          onClick={() => onSelect(question)}
          className="rounded-full border border-imprint-border bg-imprint-surface px-4 py-2 text-sm text-imprint-muted shadow-sm transition-colors hover:border-imprint hover:bg-imprint-light/30 hover:text-imprint-dark"
        >
          {question}
        </button>
      ))}
    </div>
  );
}
