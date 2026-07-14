import { useEffect } from "react";

export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | Design Factory Group` : "Design Factory Group";

    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
      meta.content = description;
    }
  }, [title, description]);
}