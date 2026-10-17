import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorBanner({ message, onRetry, disabled }) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="flex flex-col gap-3 rounded-3xl border border-coral/30 bg-white px-4 py-3 text-ink shadow-card sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="flex items-start gap-2 text-base font-bold leading-snug">
        <AlertCircle className="mt-0.5 shrink-0 text-coral" size={22} aria-hidden="true" />
        <span>{message}</span>
      </p>
      <button
        type="button"
        onClick={onRetry}
        disabled={disabled}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-coral px-4 text-base font-extrabold text-white disabled:opacity-60"
      >
        <RefreshCw size={18} aria-hidden="true" />
        Try again
      </button>
    </div>
  );
}
