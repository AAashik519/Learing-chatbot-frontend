export default function ChatMessage({ message }) {
  const mine = message.role === 'child';
  return (
    <div className={`flex items-end gap-2 ${mine ? 'justify-end' : 'justify-start'}`}>
      {mine ? null : (
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sun text-xl" aria-hidden="true">🦉</span>
      )}
      <div className={`max-w-[85%] ${mine ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        {message.modeLabel && !mine ? (
          <span className="px-1 text-xs font-extrabold uppercase tracking-wide text-sea">{message.modeLabel}</span>
        ) : null}
        <p
          className={`rounded-3xl px-4 py-3 text-lg font-bold leading-snug shadow-card ${
            mine
              ? 'rounded-br-md bg-sun text-ink'
              : 'rounded-bl-md bg-white text-ink'
          }`}
        >
          {message.text}
        </p>
      </div>
    </div>
  );
}
