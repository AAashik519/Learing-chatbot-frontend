import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center px-4">
      <section className="max-w-md rounded-3xl bg-white p-8 text-center shadow-card">
        <p className="text-5xl" aria-hidden="true">🔍</p>
        <h1 className="mt-3 text-3xl font-extrabold text-ink">This page is hiding.</h1>
        <p className="mt-2 text-lg font-bold text-ink/75">Let us go back to Little English Buddy.</p>
        <Link
          to="/"
          className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-sea px-5 text-lg font-extrabold text-white"
        >
          Go home
        </Link>
      </section>
    </main>
  );
}
