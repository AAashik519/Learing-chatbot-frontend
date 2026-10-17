export default function ActivityCard({ activity, modeLabel }) {
  const isGame = activity?.kind === 'game';
  const title = isGame ? 'Game' : 'Question';
  const showMode = modeLabel && modeLabel.toLowerCase() !== title.toLowerCase();
  return (
    <section className="shrink-0 rounded-3xl bg-sea p-3 text-white shadow-card">
      <p className="text-sm font-extrabold uppercase tracking-wide text-white/90">
        {title}
        {showMode ? ` · ${modeLabel}` : ''}
      </p>
      <p className="mt-1 text-lg font-extrabold leading-snug sm:text-xl">
        {activity?.prompt || 'Pick a game, a talk, or a lesson.'}
      </p>
      {activity?.topic && activity.topic !== 'game' ? (
        <p className="mt-2 text-sm font-bold capitalize text-white/90">{activity.topic}</p>
      ) : null}
    </section>
  );
}
