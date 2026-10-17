export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-3" aria-live="polite" aria-label="Buddy is thinking">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-sun text-xl" aria-hidden="true">🦉</span>
      <div className="flex items-center gap-1 rounded-3xl rounded-bl-md bg-white px-4 py-3 shadow-card">
        <span className="typing-dot h-2.5 w-2.5 rounded-full bg-sea" />
        <span className="typing-dot h-2.5 w-2.5 rounded-full bg-sea" />
        <span className="typing-dot h-2.5 w-2.5 rounded-full bg-sea" />
      </div>
    </div>
  );
}
