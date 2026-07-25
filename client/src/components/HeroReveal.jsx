import { useEffect, useRef, useState } from "react";

const SPOTLIGHT_R = 260;

export function HeroReveal({ baseSrc, revealSrc, alt, className, imgClassName }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const target = useRef({ x: -9999, y: -9999 });
  const smooth = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);
  const [mask, setMask] = useState("");
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setSize({ w: r.width, h: r.height });
      const c = canvasRef.current;
      if (c) {
        c.width = r.width;
        c.height = r.height;
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const setFromClient = (cx, cy) => {
      const r = el.getBoundingClientRect();
      target.current.x = cx - r.left;
      target.current.y = cy - r.top;
    };
    const onMouse = (e) => setFromClient(e.clientX, e.clientY);
    const onTouch = (e) => {
      if (e.touches[0]) setFromClient(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onLeave = () => {
      target.current.x = -9999;
      target.current.y = -9999;
    };

    el.addEventListener("mousemove", onMouse);
    el.addEventListener("touchmove", onTouch, { passive: true });
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("touchend", onLeave);

    const loop = () => {
      const dx = target.current.x - smooth.current.x;
      const dy = target.current.y - smooth.current.y;
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        smooth.current.x += dx * 0.1;
        smooth.current.y += dy * 0.1;
        const c = canvasRef.current;
        if (c && c.width > 0 && c.height > 0) {
          const ctx = c.getContext("2d");
          if (ctx) {
            ctx.clearRect(0, 0, c.width, c.height);
            const g = ctx.createRadialGradient(
              smooth.current.x,
              smooth.current.y,
              0,
              smooth.current.x,
              smooth.current.y,
              SPOTLIGHT_R
            );
            g.addColorStop(0, "rgba(255,255,255,1)");
            g.addColorStop(0.4, "rgba(255,255,255,1)");
            g.addColorStop(0.6, "rgba(255,255,255,0.75)");
            g.addColorStop(0.75, "rgba(255,255,255,0.4)");
            g.addColorStop(0.88, "rgba(255,255,255,0.12)");
            g.addColorStop(1, "rgba(255,255,255,0)");
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(smooth.current.x, smooth.current.y, SPOTLIGHT_R, 0, Math.PI * 2);
            ctx.fill();
            setMask(c.toDataURL());
          }
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      el.removeEventListener("mousemove", onMouse);
      el.removeEventListener("touchmove", onTouch);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("touchend", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [size.w, size.h]);

  return (
    <div ref={containerRef} className={`relative ${className ?? ""}`}>
      <img
        src={baseSrc}
        alt={alt}
        className={`${imgClassName ?? ""} grayscale`}
        draggable={false}
      />
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0"
        style={{ display: "none" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${revealSrc})`,
          maskImage: mask ? `url(${mask})` : undefined,
          WebkitMaskImage: mask ? `url(${mask})` : undefined,
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      />
    </div>
  );
}