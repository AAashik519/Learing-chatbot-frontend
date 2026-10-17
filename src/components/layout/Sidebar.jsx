import AchievementCard from '../learning/AchievementCard';
import ProgressCard from '../learning/ProgressCard';

export default function Sidebar({ level, progress, durable }) {
  return (
    <aside className="hidden min-h-0 flex-col gap-4 overflow-y-auto lg:flex">
      <ProgressCard progress={progress} durable={durable} />
      <AchievementCard level={level} progress={progress} />
      <p className="rounded-3xl bg-white/80 p-4 text-sm font-bold leading-relaxed text-ink/75 shadow-card">
        Little English Buddy is a computer helper, not a real person or a teacher at home. A grown-up can help if you feel very sad or scared.
      </p>
    </aside>
  );
}
