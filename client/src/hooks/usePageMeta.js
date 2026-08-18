import { useEffect } from "react";

const DEFAULT_DESCRIPTION =
  "Design Factory Group is an architecture and construction studio based in Siliguri, West Bengal, delivering residential and commercial projects across India.";
const SITE_URL = "https://www.designfactorygroup.com";

export function usePageMeta(title, description, canonicalPath) {
  useEffect(() => {
    document.title = title ? `${title} | Design Factory Group` : "Design Factory Group";

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    // FIX: previously only set inside `if (description)`, so a page that
    // called this hook without a description (e.g. a loading state) left
    // the previous route's description in place instead of resetting it.
    meta.content = description || DEFAULT_DESCRIPTION;

    // FIX: `canonicalPath` was previously required for the <link> to be
    // touched at all. Since index.html only ships one static canonical
    // (the homepage) and this tag persists across client-side route
    // changes, any page that didn't pass canonicalPath yet kept whatever
    // the previously visited page had set — a real risk of pages being
    // canonicalized to the wrong URL. Falling back to the current path
    // keeps every route correct by default, while callers can still pass
    // an explicit canonicalPath when they need it to differ from the
    // current URL (e.g. normalizing trailing slashes or query params).
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    const path = canonicalPath || window.location.pathname;
    link.href = `${SITE_URL}${path}`;
  }, [title, description, canonicalPath]);
}