import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "../context/LenisContext";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const lenisRef = useLenis();

  useEffect(() => {
    const lenis = lenisRef.current;

    if (hash) {
      const id = hash.replace("#", "");

      const scrollToTarget = () => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (lenis) {
          lenis.scrollTo(top, { offset: -100 });
        } else {
          window.scrollTo({ top: top - 100, behavior: "smooth" });
        }
      };

      // Retry at increasing delays — later sections (like FAQ) sit below
      // async-loaded content (Projects, Branches) whose height isn't final
      // until data + images finish loading, so one early attempt isn't
      // enough. Each retry re-measures and corrects the scroll position.
      const timers = [100, 400, 800, 1400].map((delay) =>
        setTimeout(scrollToTarget, delay)
      );

      return () => timers.forEach(clearTimeout);
    }

    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);
  }, [pathname, hash, lenisRef]);

  return null;
}


// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { useLenis } from "../context/LenisContext";

// export default function ScrollToTop() {
//   const { pathname } = useLocation();
//   const lenisRef = useLenis();

//   useEffect(() => {
//     const lenis = lenisRef.current;
//     if (lenis) {
//       lenis.scrollTo(0, { immediate: true }); // instantly resets Lenis's virtual scroll
//     }
//     window.scrollTo(0, 0); // safety net for the native scroll position too
//   }, [pathname, lenisRef]);

//   return null;
// }