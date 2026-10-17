import { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';

export default function ChatWindow({ messages, loading, hydrating }) {
  const scrollerRef = useRef(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.scrollTop = scroller.scrollHeight;
  }, [messages, loading]);

  return (
    <section
      aria-label="Chat"
      className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-3xl bg-white/75 p-3 shadow-card"
    >
      <div ref={scrollerRef} className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pr-1">
        {hydrating ? (
          <p className="m-auto text-center text-lg font-extrabold text-ink/70">Looking for your session...</p>
        ) : null}
        {!hydrating && messages.length === 0 ? (
          <div className="m-auto max-w-sm text-center">
            <p className="text-5xl" aria-hidden="true">🦉</p>
            <p className="mt-2 text-2xl font-extrabold text-ink">Hi! I am Little English Buddy.</p>
            <p className="mt-2 text-lg font-bold leading-relaxed text-ink/75">
              Say hello, or tap Learn, Game, or Talk.
            </p>
          </div>
        ) : null}
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {loading ? <TypingIndicator /> : null}
        <div className="sr-only" aria-live="polite">
          {messages.filter((message) => message.role === 'buddy').slice(-1)[0]?.text || ''}
        </div>
      </div>
    </section>
  );
}
