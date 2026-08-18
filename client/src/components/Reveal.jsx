import { useEffect, useRef } from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
  threshold = 0.12,
  rootMargin = "0px 0px -60px 0px",
}) {
  const ref = useRef(null);

 useEffect(() => {
  const el = ref.current;
  if (!el) return;

  let timeoutId;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          timeoutId = setTimeout(() => el.classList.add("in"), delay);
          io.unobserve(el);
        }
      });
    },
    { threshold, rootMargin }
  );

  io.observe(el);
  return () => {
    io.disconnect();
    clearTimeout(timeoutId);
  };
}, [delay, threshold, rootMargin]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}