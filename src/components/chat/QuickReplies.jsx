export default function QuickReplies({ replies, onSelect, disabled }) {
  if (!replies?.length) return null;

  return (
    <div className="flex gap-2 overflow-x-auto px-1 py-2" aria-label="Quick replies">
      {replies.map((reply) => (
        <button
          key={reply}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(reply)}
          className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-white px-5 py-3 text-base font-extrabold leading-6 text-sea shadow-card ring-2 ring-transparent transition hover:ring-sea disabled:opacity-60"
        >
          {reply}
        </button>
      ))}
    </div>
  );
}
