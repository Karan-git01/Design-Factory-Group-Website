import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#0F0F10]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Background Accent */}
          <div className="absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0F0F10_75%)]" />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Logo */}
            <motion.h1
              initial={{ opacity: 0, y: 18, letterSpacing: "0.8em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.22em" }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-display text-5xl font-light uppercase tracking-[0.22em] text-white sm:text-6xl"
            >
              DFG
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.55 }}
              transition={{ delay: 0.45, duration: 0.8 }}
              className="mt-4 text-[11px] uppercase tracking-[0.45em] text-white/50"
            >
              Design Factory Group
            </motion.p>

            {/* Loading Line */}
            <div className="mt-14 h-px w-52 overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-primary"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}







// import { motion, AnimatePresence } from "framer-motion";

// export default function SplashScreen({ show }) {
//   return (
//     <AnimatePresence>
//       {show && (
//         <motion.div
//           className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
//           initial={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.5, ease: "easeInOut" }}
//         >
//           <motion.div
//             initial={{ scale: 0.85, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="flex flex-col items-center gap-4"
//           >
//             <span className="font-display text-4xl font-medium tracking-wide text-surface">
//               DFG
//             </span>
//             <div className="h-1 w-32 overflow-hidden rounded-full bg-secondary/40">
//               <motion.div
//                 className="h-full bg-primary"
//                 initial={{ x: "-100%" }}
//                 animate={{ x: "100%" }}
//                 transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
//               />
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }