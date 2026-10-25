const badgeStyles = {
  Easy: 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30',
  Medium: 'bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/30',
  Hard: 'bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/30',
};

export default function DifficultyBadge({ difficulty }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${badgeStyles[difficulty] || badgeStyles.Easy}`}>
      {difficulty}
    </span>
  );
}
