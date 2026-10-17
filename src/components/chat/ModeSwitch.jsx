import { BookOpen, Gamepad2, MessageCircle } from 'lucide-react';

const ACTIONS = [
  { label: "Let's learn", icon: BookOpen, tone: 'bg-leaf' },
  { label: "Let's play", icon: Gamepad2, tone: 'bg-sea' },
  { label: 'I want to talk', icon: MessageCircle, tone: 'bg-coral' },
];

export default function ModeSwitch({ onSelect, disabled }) {
  return (
    <div className="grid grid-cols-3 gap-2" aria-label="Choose what to do">
      {ACTIONS.map((action) => {
        const Icon = action.icon;
        return (
          <button
            key={action.label}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(action.label)}
            className={`inline-flex min-h-12 items-center justify-center gap-1 rounded-2xl px-2 text-sm font-extrabold text-white disabled:opacity-60 sm:text-base ${action.tone}`}
          >
            <Icon size={18} aria-hidden="true" />
            {action.label === "Let's learn" ? 'Learn' : action.label === "Let's play" ? 'Game' : 'Talk'}
          </button>
        );
      })}
    </div>
  );
}
