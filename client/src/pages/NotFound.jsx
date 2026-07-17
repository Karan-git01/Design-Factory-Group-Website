import { usePageMeta } from "../hooks/usePageMeta";
import { Link } from "react-router-dom";

export default function NotFound() {
  usePageMeta(
    "404 Not Found",
    "The page you're looking for doesn't exist. Return to the homepage.",
  );

  return (
    <main className="flex min-h-screen items-center border-t border-white/10 bg-[#0F0F10] pt-28 pb-20">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-6 text-center sm:px-8 md:px-12 lg:px-16 xl:px-20">
        {/* Section Label */}
        <div className="mb-10 flex items-center gap-4">
          <div className="h-px w-14 bg-primary" />
          <span className="text-[11px] font-medium uppercase tracking-[0.45em] text-white/45">
            Error
          </span>
        </div>

        {/* 404 */}
        <span className="font-display text-[7rem] font-light leading-none tracking-[-0.08em] text-primary sm:text-[9rem] lg:text-[12rem]">
          404
        </span>

        {/* Heading */}
        <h1 className="mt-6 font-display text-4xl font-light leading-tight tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
          Page not found
        </h1>

        {/* Description */}
        <p className="mt-8 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
          The page you're looking for doesn't exist, may have been moved,
          or the link you're trying to access is no longer available.
        </p>

        {/* CTA */}
        <Link
          to="/"
          className="group mt-14 inline-flex items-center gap-5"
        >
          <span className="font-display text-lg font-light text-white transition-colors duration-300 group-hover:text-primary">
            Back to Home
          </span>

          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 transition-all duration-300 group-hover:border-primary">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-black transition-transform duration-300 group-hover:-translate-x-0.5">
              ←
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
}



// import { usePageMeta } from "../hooks/usePageMeta";
// import { Link } from "react-router-dom";

// export default function NotFound() {
//   usePageMeta(
//     "404 Not Found",
//     "The page you're looking for doesn't exist. Return to the homepage.",
//   );
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-ink px-6 text-center">
//       <span className="font-display text-8xl font-medium text-primary sm:text-9xl">
//         404
//       </span>
//       <h1 className="font-display text-3xl font-medium text-surface sm:text-4xl">
//         Page not found
//       </h1>
//       <p className="max-w-md text-secondary-light">
//         The page you're looking for doesn't exist, may have been moved, or
//         the link might be broken.
//       </p>
//       <Link
//         to="/"
//         className="rounded-full bg-primary px-8 py-4 text-surface transition hover:bg-primary-dark"
//       >
//         Back to Home
//       </Link>
//     </main>
//   );
// }