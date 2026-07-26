// WorldMapDots.jsx
/**
 * Decorative dotted world map background.
 * Uses a coarse 60x24 land mask (roughly equirectangular) to place small copper dots
 * that approximate continents. Purely presentational.
 */
const LAND_MASK = [
  "............................................................",
  "............................................................",
  "..........########..............#######.....................",
  ".......###############........###############...............",
  ".....###################....##################...##.........",
  "....#####################..###################..####........",
  ".....###################....##################...###........",
  "......################.......#################....##........",
  ".......##############.........###############.....#.........",
  "........#############..........###########..................",
  "..........##########............##########..................",
  "...........########..............########............##.....",
  "............######................#######............###....",
  ".............#####..................######............##....",
  "..............####...................#####............#.....",
  "...............###.....................####.................",
  "...............###......................###.................",
  "................##.......................##.................",
  "................##........................#.................",
  ".................#...........................###............",
  "..............................................##...........",
  "............................................................",
  "............................................................",
  "............................................................",
];

export default function WorldMapDots({ className = "" }) {
  const rows = LAND_MASK.length;
  const cols = LAND_MASK[0].length;
  const stepX = 100 / cols;
  const stepY = 100 / rows;
  const dots = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (LAND_MASK[r][c] === "#") {
        dots.push({
          cx: c * stepX + stepX / 2,
          cy: r * stepY + stepY / 2,
        });
      }
    }
  }

  return (
    <svg
      viewBox="0 0 100 40"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className={className}
      // Explicit aspect-ratio so the element always renders at a
      // predictable size from its CSS width alone. Relying on the
      // browser to infer height from the viewBox (with no width/height
      // attributes) only works in newer engines — older/mobile browsers
      // fall back to a default intrinsic size, which is why this could
      // end up invisible or squashed on some screens without this.
      style={{ aspectRatio: "100 / 40" }}
    >
      {dots.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy * 0.4} r={0.35} fill="currentColor" />
      ))}
    </svg>
  );
}