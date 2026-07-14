import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "../context/LenisContext";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Why us", to: "/#why-us" },
  { label: "Work stages", to: "/#work-stages" },
  { label: "Careers", to: "/careers" },
  { label: "Branches", to: "/#branches" },
  { label: "Contact", to: "/contact" },
  { label: "FAQ", to: "/#faq" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const lenisRef = useLenis();

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    if (menuOpen) {
      lenis.stop(); // fully pauses Lenis's control of page scroll
      document.body.style.overflow = "hidden";
    } else {
      lenis.start(); // resumes normal smooth-scroll on the page
      document.body.style.overflow = "";
    }

    return () => {
      lenis.start();
      document.body.style.overflow = "";
    };
  }, [menuOpen, lenisRef]);

  return (
    // <>
    //   <header className="fixed top-4 left-1/2 z-50 flex w-[92%] max-w-5xl -translate-x-1/2 items-center justify-between rounded-full bg-ink/95 px-6 py-3 backdrop-blur">
    //     <Link to="/" className="font-display text-lg font-medium tracking-wide text-surface">
    //       Design Factory Group
    //     </Link>

    //     <button
    //       onClick={() => setMenuOpen(true)}
    //       className="rounded-full bg-surface px-5 py-2 text-sm font-medium text-ink transition hover:bg-primary hover:text-surface"
    //     >
    //       Menu
    //     </button>
    //   </header>

    //   <AnimatePresence>
    //     {menuOpen && (
    //       <motion.div
    //         data-lenis-prevent
    //         initial={{ opacity: 0 }}
    //         animate={{ opacity: 1 }}
    //         exit={{ opacity: 0 }}
    //         transition={{ duration: 0.3 }}
    //         className="fixed inset-0 z-[60] flex flex-col justify-between overflow-y-auto bg-ink px-6 py-8"
    //       >
    //         <div className="flex items-center justify-between">
    //           <span className="font-display text-lg font-medium text-surface">
    //             Design Factory Group
    //           </span>
    //           <button
    //             onClick={() => setMenuOpen(false)}
    //             className="rounded-full bg-surface px-4 py-2 text-sm font-medium text-ink"
    //           >
    //             Close
    //           </button>
    //         </div>

    //         <nav className="flex flex-1 flex-col items-start justify-center gap-2 py-10">
    //           {NAV_LINKS.map((link, i) => (
    //             <motion.div
    //               key={link.label}
    //               initial={{ opacity: 0, y: 20 }}
    //               animate={{ opacity: 1, y: 0 }}
    //               transition={{ delay: 0.05 * i }}
    //             >
    //               <Link
    //                 to={link.to}
    //                 onClick={() => setMenuOpen(false)}
    //                 className="font-display text-5xl font-medium text-surface transition hover:text-primary sm:text-6xl"
    //               >
    //                 {link.label}
    //               </Link>
    //             </motion.div>
    //           ))}
    //         </nav>

    //         <div className="flex flex-col gap-4 border-t border-secondary/30 pt-6">
    //           <span className="text-sm uppercase tracking-wide text-secondary-light">
    //             Social
    //           </span>
    //           <div className="flex flex-wrap gap-6">
    //             {SOCIAL_LINKS.map((s) => (
    //               <a
    //                 key={s.label}
    //                 href={s.href}
    //                 className="text-surface transition hover:text-primary"
    //               >
    //                 {s.label}
    //               </a>
    //             ))}
    //           </div>
    //         </div>
    //       </motion.div>
    //     )}
    //   </AnimatePresence>
    // </>

    <>
    <header className="fixed left-1/2 top-6 z-50 flex w-[94%] max-w-7xl -translate-x-1/2 items-center justify-between rounded-full border border-white/10 bg-black/55 px-5 py-3 shadow-2xl shadow-black/20 backdrop-blur-2xl transition-all duration-300 sm:px-7 lg:px-8">
      <Link
        to="/"
        className="font-display text-base font-medium tracking-[0.12em] text-white transition-opacity duration-300 hover:opacity-80 sm:text-lg"
      >
        Design Factory Group
      </Link>

      <button
        onClick={() => setMenuOpen(true)}
        className="rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.25em] text-white transition-all duration-300 hover:border-primary hover:bg-primary hover:text-black sm:px-6 sm:text-sm"
      >
        Menu
      </button>
    </header>

    <AnimatePresence>
      {menuOpen && (
        <motion.div
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-60 flex flex-col overflow-y-auto bg-[#0E0E0E] px-6 py-8 sm:px-10 lg:px-16 xl:px-24"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-8">
            <span className="font-display text-lg font-medium tracking-[0.12em] text-white">
              Design Factory Group
            </span>

            <button
              onClick={() => setMenuOpen(false)}
              className="rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.25em] text-white transition-all duration-300 hover:border-primary hover:bg-primary hover:text-black"
            >
              Close
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-3 py-14">
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.05 * i,
                  duration: 0.45,
                }}
              >
                <Link
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className="group inline-flex items-center gap-6 font-display text-5xl font-light tracking-[-0.04em] text-white transition-all duration-300 hover:translate-x-4 hover:text-primary sm:text-6xl md:text-7xl lg:text-8xl"
                >
                  <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-10" />
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-white/45">
                Social
              </p>

              <div className="flex flex-wrap gap-8">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="text-sm font-medium tracking-wide text-white/70 transition-colors duration-300 hover:text-primary"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="hidden text-right lg:block">
              <p className="text-xs uppercase tracking-[0.35em] text-white/35">
                Design Factory Group
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </>


  );
}