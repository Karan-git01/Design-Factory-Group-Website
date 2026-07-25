import { useEffect, useRef, useState } from "react";

export default function TextReveal({ text, className = "", emphasize = [] }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -60px 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const lines = text.split("\n").filter(Boolean);
  let wordIndex = 0;
  const isEmphasized = (word) =>
    emphasize.some(
      (w) =>
        w.replace(/[.,]+$/, "").toLowerCase() ===
        word.replace(/[.,]+$/, "").toLowerCase()
    );

  return (
    <h2 ref={ref} className={className}>
      {lines.map((line, li) => {
        const words = line.split(" ");
        return (
          <span key={li} className="block overflow-hidden">
            {words.map((word, wi) => {
              const delay = wordIndex * 40;
              wordIndex += 1;
              return (
                <span
                  key={wi}
                  className={`hero-word inline-block ${
                    isEmphasized(word) ? "italic text-copper" : ""
                  }`}
                  style={
                    visible
                      ? { animationDelay: `${delay}ms` }
                      : { opacity: 0, animationPlayState: "paused" }
                  }
                >
                  {word}
                  {wi < words.length - 1 ? "\u00A0" : ""}
                </span>
              );
            })}
          </span>
        );
      })}
    </h2>
  );
}


// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef } from "react";

// export default function TextReveal({
//   text,
//   className = "",
// }) {
//   const ref = useRef(null);

//   const { scrollYProgress } = useScroll({
//   target: ref,
//   offset: ["start 90%", "start 25%"],
// });

//   const letters = text.split("");

//   return (
//     <div
//       ref={ref}
//       className={`relative whitespace-pre-wrap ${className}`}
//     >
//       {letters.map((letter, index) => {
//         // Slower letter reveal
//         const start = index / letters.length;
//         const end = start + 0.04;

//         const color = useTransform(
//           scrollYProgress,
//           [start, end],
//           [
//             "rgba(255,255,255,0.18)",
//             "rgba(255,255,255,1)",
//           ]
//         );

//         return (
//           <motion.span
//             key={index}
//             style={{ color }}
//             className="inline"
//           >
//             {letter}
//           </motion.span>
//         );
//       })}
//     </div>
//   );
// }