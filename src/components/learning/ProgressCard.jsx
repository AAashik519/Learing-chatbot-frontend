import { Star } from 'lucide-react';

export default function ProgressCard({ progress, durable }) {
  const stars = progress?.stars ?? null;
  const answered = progress?.questionsAnswered ?? null;
  const correct = progress?.correctAnswers ?? null;
  const mastery = progress?.masteryScore ?? null;

  return (
    <section className="rounded-3xl bg-white p-4 shadow-card">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-extrabold text-ink">Your stars</h2>
        <p className="inline-flex items-center gap-1 rounded-full bg-sun px-3 py-1 text-base font-extrabold text-ink">
          <Star size={18} aria-hidden="true" />
          {stars === null ? '—' : stars}
        </p>
      </div>
      {progress ? (
        <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-2xl bg-cream px-2 py-3">
            <dt className="text-xs font-bold text-ink/70">Right</dt>
            <dd className="text-2xl font-extrabold text-leaf">{correct}</dd>
          </div>
          <div className="rounded-2xl bg-cream px-2 py-3">
            <dt className="text-xs font-bold text-ink/70">Tried</dt>
            <dd className="text-2xl font-extrabold text-sea">{answered}</dd>
          </div>
          <div className="rounded-2xl bg-cream px-2 py-3">
            <dt className="text-xs font-bold text-ink/70">Score</dt>
            <dd className="text-2xl font-extrabold text-ink">{mastery}</dd>
          </div>
        </dl>
      ) : (
        <p className="mt-3 text-base font-bold leading-relaxed text-ink/80">
          Your stars will show up here after you start.
        </p>
      )}
      {durable !== null ? (
        <p className="mt-3 text-sm font-bold leading-relaxed text-ink/70">
          {durable
            ? 'Stars are saved for this session.'
            : 'Stars stay in server memory until the server restarts.'}
        </p>
      ) : null}
    </section>
  );
}
