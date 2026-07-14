import { usePageMeta } from "../hooks/usePageMeta";
import { Link } from "react-router-dom";

export default function NotFound() {
  usePageMeta(
    "404 Not Found",
    "The page you're looking for doesn't exist. Return to the homepage.",
  );
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-ink px-6 text-center">
      <span className="font-display text-8xl font-medium text-primary sm:text-9xl">
        404
      </span>
      <h1 className="font-display text-3xl font-medium text-surface sm:text-4xl">
        Page not found
      </h1>
      <p className="max-w-md text-secondary-light">
        The page you're looking for doesn't exist, may have been moved, or
        the link might be broken.
      </p>
      <Link
        to="/"
        className="rounded-full bg-primary px-8 py-4 text-surface transition hover:bg-primary-dark"
      >
        Back to Home
      </Link>
    </main>
  );
}