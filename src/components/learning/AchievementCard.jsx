export default function AchievementCard({ level, progress }) {
  const stars = progress?.stars || 0;
  let emoji = '🌟';
  let title = 'Badges';
  let detail = 'Badges show up after you start.';

  if (!level && !progress) {
    emoji = '🌟';
  } else if (level === 'L3') {
    emoji = '🧭';
    title = 'Little Explorer';
    detail = 'You reached the top learning level.';
  } else if (level === 'L2') {
    emoji = '🌱';
    title = 'Growing Learner';
    detail = 'You moved up one level.';
  } else if (stars > 0) {
    emoji = '⭐';
    title = 'Word Star';
    detail = stars === 1 ? 'You earned 1 star.' : `You earned ${stars} stars.`;
  } else if (level) {
    emoji = '🎯';
    title = 'Getting started';
    detail = 'Keep trying. A star comes after two right answers.';
  }

  return (
    <section className="rounded-3xl bg-white p-4 shadow-card">
      <h2 className="text-lg font-extrabold text-ink">Badge</h2>
      <div className="mt-3 flex items-center gap-3 rounded-2xl bg-cream p-3">
        <span className="text-3xl" aria-hidden="true">{emoji}</span>
        <div>
          <p className="text-base font-extrabold text-ink">{title}</p>
          <p className="text-sm font-bold leading-snug text-ink/75">{detail}</p>
        </div>
      </div>
    </section>
  );
}
