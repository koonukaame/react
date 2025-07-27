import { RedirectBtn } from '../../components';

export function NotFound() {
  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen"
      data-testid="not-found"
    >
      <h1 className="text-9xl font-extrabold text-rose-700/80 mb-6 tracking-wide">
        404
      </h1>
      <span className="text-2xl font-semibold text-rose-900 mb-3">
        Page Not Found
      </span>
      <RedirectBtn url="/" locationText="Back to Main Page" />
    </main>
  );
}
