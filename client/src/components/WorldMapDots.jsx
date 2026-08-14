// WorldMapDots.jsx
/**
 * Decorative dotted world map background.
 *
 * Land mass: ~3,400 dots baked into 4 <path> strings (grouped by opacity
 * tier for depth texture) instead of one <circle> per dot. This is the
 * part that fixed scroll being affected — even fully static, ~3,400
 * separate nodes imposes real style/layout/paint cost, and any reflow
 * elsewhere on the page (Lenis, a resize, a font swap) recomputes all of
 * them. 4 nodes instead of 3,400 removes that cost almost entirely. DO
 * NOt go back to per-dot circles for the land mass.
 *
 * Hub network: a small (~40-node) animated layer on top — six hub cities
 * with a pulse ring, and a travelling-light effect along the routes
 * between them. This part was never what caused the scroll issue, so it
 * keeps the same safety rules as before:
 *   - only opacity/transform are animated (the two properties every
 *     engine reliably composites off the main thread — no
 *     stroke-dashoffset, no offset-path/motion-path)
 *   - no SVG <mask> or <filter> (both force their own repainted layer)
 *   - animation is paused via IntersectionObserver whenever the map is
 *     off-screen, so it costs nothing while scrolled past
 * If scroll issues come back, disable this layer first (showNetwork
 * false) before touching the land mass again — that isolates which half
 * is responsible instead of guessing.
 *
 * The land silhouette is sampled from real coastline data (Natural
 * Earth, via d3-geo + world-atlas) on a ~2.1° graticule, not hand-drawn.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { WORLD_LAND_PATHS } from "../hooks/worldLandPoints";

const VB_W = 100;
const VB_H = 49.8;
const WAYPOINTS_PER_ROUTE = 7;

// Hub network — projected from real lat/lon onto the same equal-area
// space as the land dots. origin: true is the studio's home base.
const HUBS = [
  { name: "Kolkata", x: 74.0, y: 20.6, origin: true },
  { name: "London", x: 46.8, y: 10.0 },
  { name: "New York", x: 25.3, y: 13.9 },
  { name: "Tokyo", x: 88.2, y: 15.7 },
  { name: "Dubai", x: 63.7, y: 19.6 },
  { name: "S\u00e3o Paulo", x: 32.5, y: 37.4 },
];

function arcControl(a, b) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.hypot(dx, dy);
  const bow = Math.min(dist * 0.22, 9);
  const nx = -dy / (dist || 1);
  const ny = dx / (dist || 1);
  return { x: mx + nx * bow, y: my + ny * bow };
}

function arcPathD(a, c, b) {
  return `M ${a.x} ${a.y} Q ${c.x} ${c.y} ${b.x} ${b.y}`;
}

function quadAt(a, c, b, t) {
  const mt = 1 - t;
  return {
    x: mt * mt * a.x + 2 * mt * t * c.x + t * t * b.x,
    y: mt * mt * a.y + 2 * mt * t * c.y + t * t * b.y,
  };
}

function useOnScreen(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: "150px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return visible;
}

export default function WorldMapDots({
  className = "",
  dotColor = "currentColor",
  accentColor = "#E8A33D",
  showNetwork = true,
}) {
  const wrapRef = useRef(null);
  const onScreen = useOnScreen(wrapRef);

  const origin = useMemo(() => HUBS.find((h) => h.origin) ?? HUBS[0], []);

  const routes = useMemo(() => {
    return HUBS.filter((h) => h !== origin).map((h) => {
      const c = arcControl(origin, h);
      const waypoints = Array.from({ length: WAYPOINTS_PER_ROUTE }, (_, i) =>
        quadAt(origin, c, h, i / (WAYPOINTS_PER_ROUTE - 1))
      );
      return { to: h, d: arcPathD(origin, c, h), waypoints };
    });
  }, [origin]);

  return (
    <div
      ref={wrapRef}
      style={{ width: "100%", height: "100%", aspectRatio: `${VB_W} / ${VB_H}` }}
    >
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        className={className}
        style={{ overflow: "visible", pointerEvents: "none", display: "block" }}
      >
        {/* land mass — 4 static path nodes, never animated */}
        <g fill={dotColor}>
          {WORLD_LAND_PATHS.map((b, i) => (
            <path key={i} d={b.d} fillOpacity={b.o} />
          ))}
        </g>

        {showNetwork && (
          <g className="wmd-network" data-live={onScreen ? "1" : "0"}>
            {routes.map((r) => (
              <path
                key={r.to.name}
                d={r.d}
                fill="none"
                stroke={accentColor}
                strokeOpacity="0.18"
                strokeWidth="0.16"
              />
            ))}

            {/* travelling light: precomputed waypoints, opacity-only
                stagger — never animates geometry or a path property */}
            {routes.map((r, ri) =>
              r.waypoints.map((wp, wi) => (
                <circle
                  key={`${r.to.name}-${wi}`}
                  cx={wp.x}
                  cy={wp.y}
                  r="0.26"
                  fill={accentColor}
                  className="wmd-wp"
                  style={{
                    animationDelay: `${ri * -0.9 + wi * (2.4 / WAYPOINTS_PER_ROUTE)}s`,
                  }}
                />
              ))
            )}

            {HUBS.map((h, i) => (
              <g key={h.name} transform={`translate(${h.x} ${h.y})`}>
                <circle
                  r={h.origin ? 0.9 : 0.6}
                  className="wmd-ping"
                  fill="none"
                  stroke={accentColor}
                  strokeWidth="0.18"
                  style={{ animationDelay: `${i * -0.7}s` }}
                />
                <circle r={h.origin ? 1.3 : 0.95} fill={accentColor} opacity="0.22" />
                <circle r={h.origin ? 0.62 : 0.42} fill={accentColor} />
              </g>
            ))}
          </g>
        )}

        <style>{`
          .wmd-wp {
            opacity: 0;
            animation: wmd-blink 2.4s linear infinite;
          }
          .wmd-ping {
            transform-origin: center;
            transform-box: fill-box;
            animation: wmd-ping 3.2s cubic-bezier(0.2, 0.6, 0.35, 1) infinite;
          }
          .wmd-network[data-live="0"] .wmd-wp,
          .wmd-network[data-live="0"] .wmd-ping {
            animation-play-state: paused;
            opacity: 0;
          }
          @keyframes wmd-blink {
            0% { opacity: 0; }
            6% { opacity: 1; }
            18% { opacity: 0; }
            100% { opacity: 0; }
          }
          @keyframes wmd-ping {
            0% { opacity: 0.55; transform: scale(0.4); }
            70% { opacity: 0; transform: scale(2.6); }
            100% { opacity: 0; transform: scale(2.6); }
          }
          @media (prefers-reduced-motion: reduce) {
            .wmd-wp, .wmd-ping { animation: none; opacity: 0; }
          }
        `}</style>
      </svg>
    </div>
  );
}