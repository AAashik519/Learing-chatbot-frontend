import { useState } from 'react';
import { Send } from 'lucide-react';

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState('');

  function submit(event) {
    event.preventDefault();
    const next = text.trim();
    if (!next || disabled) return;
    onSend(next);
    setText('');
  }

  return (
    <form onSubmit={submit} className="flex items-center gap-2">
      <label htmlFor="child-message" className="sr-only">Your message</label>
      <input
        id="child-message"
        value={text}
        maxLength={200}
        autoComplete="off"
        disabled={disabled}
        onChange={(event) => setText(event.target.value)}
        placeholder="Type a word or a sentence"
        className="min-h-12 w-full min-w-0 rounded-full border-2 border-white bg-white px-4 text-base font-bold text-ink shadow-card outline-none ring-sea placeholder:text-ink/40 focus:border-sea disabled:opacity-60 sm:min-h-14 sm:px-5 sm:text-lg"
      />
      <button
        type="submit"
        disabled={disabled || !text.trim()}
        aria-label="Send message"
        className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sea text-white shadow-card disabled:opacity-60 sm:h-14 sm:w-14"
      >
        <Send size={22} aria-hidden="true" />
      </button>
    </form>
  );
}
