import { MOODS } from '../../utils/moods';

export default function MoodSelector({ mood, onSelect, disabled }) {
  return (
    <section aria-label="How do you feel?">
      <h2 className="mb-2 text-base font-extrabold text-ink">How do you feel?</h2>
      <div className="flex gap-2 overflow-x-auto px-1 py-2">
        {MOODS.map((item) => {
          const selected = mood === item.id;
          return (
            <button
              key={item.id}
              type="button"
              disabled={disabled}
              aria-pressed={selected}
              onClick={() => onSelect(item.id)}
              className={`inline-flex min-h-12 shrink-0 items-center justify-center rounded-full px-5 py-3 text-base font-extrabold leading-6 transition disabled:opacity-60 ${
                selected ? 'bg-ink text-white' : 'bg-white text-ink shadow-card'
              }`}
            >
              <span aria-hidden="true">{item.emoji}</span> {item.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
