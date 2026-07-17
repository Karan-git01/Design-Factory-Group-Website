import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function AnimatedLetter({ letter, scrollYProgress, start, end }) {
  const color = useTransform(
    scrollYProgress,
    [start, end],
    ["rgba(138,138,138,0.35)", "rgba(255,255,255,1)"]
  );

  return (
    <motion.span style={{ color }} className="inline">
      {letter}
    </motion.span>
  );
}

export default function TextReveal({ text, className = "" }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 25%"],
  });

  const letters = text.split("");

  return (
    <div ref={ref} className={`relative whitespace-pre-wrap ${className}`}>
      {letters.map((letter, index) => {
        const start = index / letters.length;
        const end = start + 0.04;

        return (
          <AnimatedLetter
            key={index}
            letter={letter}
            scrollYProgress={scrollYProgress}
            start={start}
            end={end}
          />
        );
      })}
    </div>
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