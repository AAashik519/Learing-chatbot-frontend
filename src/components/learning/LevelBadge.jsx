export default function LevelBadge({ level, levelName }) {
  return (
    <div className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-white px-3 shadow-card ring-2 ring-sun sm:h-12 sm:px-4">
      <span className="text-[11px] font-extrabold uppercase tracking-wide text-sea sm:text-xs">Level</span>
      <span className="text-base font-extrabold leading-none text-ink sm:text-lg">{level || '—'}</span>
      {levelName ? (
        <span className="hidden text-sm font-bold leading-none text-ink/70 sm:inline">{levelName}</span>
      ) : null}
    </div>
  );
}
