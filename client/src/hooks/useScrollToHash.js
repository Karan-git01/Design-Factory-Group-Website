import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// react-router-dom's <Link> does client-side navigation and does NOT
// replicate the browser's native "scroll to #anchor" behavior. Without
// this, every to="/#section" link across Header/Footer silently does
// nothing when you're already on the page that section lives on.
const HEADER_OFFSET = 96; // matches the sticky header's approx height (h-16/h-20)

export function useScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;

    // Wait a tick for the route/content to render before measuring position
    const id = hash.replace("#", "");
    const scroll = () => {
      const el = document.getElementById(id);
      if (!el) return false;
      const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top, behavior: "smooth" });
      return true;
    };

    if (!scroll()) {
      // Element may not exist yet on first paint (e.g. navigating from
      // another route) — retry briefly until it's mounted.
      const t = setTimeout(scroll, 100);
      return () => clearTimeout(t);
    }
  }, [hash, pathname]);
}