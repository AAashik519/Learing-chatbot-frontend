import { useState } from 'react';
import { RotateCcw, Star } from 'lucide-react';
import BuddyAvatar from '../common/BuddyAvatar';
import LevelBadge from '../learning/LevelBadge';

export default function Header({ level, levelName, stars, onReset, disabled }) {
  const [confirming, setConfirming] = useState(false);

  function handleReset() {
    if (!confirming) {
      setConfirming(true);
      window.setTimeout(() => setConfirming(false), 4000);
      return;
    }
    setConfirming(false);
    onReset();
  }

  return (
    <header className="z-20 shrink-0 border-b border-white/80 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-3 py-3 sm:flex-row sm:items-center sm:px-4">
        <div className="flex min-w-0 items-center gap-3">
          <BuddyAvatar />
          <div className="min-w-0">
            <h1 className="truncate text-xl font-extrabold text-ink sm:text-2xl lg:text-3xl">Little English Buddy</h1>
            <p className="truncate text-sm font-bold text-ink/70">A computer helper for learning English</p>
          </div>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto py-1 sm:ml-auto sm:overflow-visible">
          {stars !== null && stars !== undefined ? (
            <p className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full bg-white px-3 text-base font-extrabold leading-none text-ink shadow-card sm:h-12 sm:px-4 sm:text-lg">
              <Star size={18} aria-hidden="true" />
              {stars}
            </p>
          ) : null}
          <LevelBadge level={level} levelName={levelName} />
          <button
            type="button"
            onClick={handleReset}
            disabled={disabled}
            aria-label={confirming ? 'Tap again to start over' : 'Start over'}
            className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-white px-3 text-sm font-extrabold leading-none text-ink shadow-card disabled:opacity-60 sm:h-12 sm:px-4"
          >
            <RotateCcw size={16} aria-hidden="true" />
            <span>{confirming ? 'Tap again' : 'Start over'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
