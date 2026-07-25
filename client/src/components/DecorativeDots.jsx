export default function DecorativeDots({ className = "" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 5 }).map((_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={col * 22 + 6}
            cy={row * 22 + 6}
            r="2"
            fill="currentColor"
          />
        ))
      )}
    </svg>
  );
}