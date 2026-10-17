export default function BuddyAvatar({ size = 'md' }) {
  const dimension = size === 'lg' ? 'h-16 w-16' : 'h-12 w-12';
  return (
    <span
      className={`${dimension} grid shrink-0 place-items-center rounded-full bg-sun shadow-card ring-4 ring-white`}
      aria-hidden="true"
    >
      <span className={size === 'lg' ? 'text-4xl' : 'text-2xl'}>🦉</span>
    </span>
  );
}
