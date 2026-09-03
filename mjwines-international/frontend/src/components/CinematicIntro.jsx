import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LOGO, WINE_STAIN } from "../data";

// Movie-style cold open: pose the pain of planning, resolve to MJ Wines.
const SCENES = [
  { id: 0, dur: 2600, lines: ["Planning an event", "is never just one thing."] },
  { id: 1, dur: 2600, fragments: ["The venue.", "The wine.", "The food.", "The entertainment.", "The gifting.", "The logistics."] },
  { id: 2, dur: 2400, lines: ["A dozen suppliers.", "A hundred little details."] },
  { id: 3, dur: 2400, lines: ["And one evening", "to get it perfectly right."] },
  { id: 4, dur: 2600, lines: ["What if it could feel", "completely effortless?"], accent: true },
  { id: 5, dur: 3200, reveal: true },
];

const ease = [0.22, 1, 0.36, 1];

export const CinematicIntro = ({ onDone }) => {
  const [scene, setScene] = useState(0);

  useEffect(() => {
    if (scene >= SCENES.length) { onDone(); return; }
    const t = setTimeout(() => setScene((s) => s + 1), SCENES[scene].dur);
    return () => clearTimeout(t);
  }, [scene, onDone]);

  const skip = () => { setScene(SCENES.length); };
  const current = SCENES[scene];

  return (
    <motion.div
      data-testid="cinematic-intro"
      className="fixed inset-0 z-[100] bg-[#050505] grain flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1, ease } }}
    >
      {/* cinematic letterbox bars */}
      <motion.div initial={{ height: "0%" }} animate={{ height: "8vh" }} transition={{ duration: 1.2, ease }} className="absolute top-0 left-0 right-0 bg-black z-10" />
      <motion.div initial={{ height: "0%" }} animate={{ height: "8vh" }} transition={{ duration: 1.2, ease }} className="absolute bottom-0 left-0 right-0 bg-black z-10" />

      {/* real photographic wine stain — continuous zoom-in that pushes past the screen */}
      <motion.img
        src={WINE_STAIN}
        aria-hidden
        alt=""
        className="absolute z-0 w-[70vmin] h-[70vmin] object-contain pointer-events-none mix-blend-screen"
        initial={{ scale: 0.7, opacity: 0, rotate: -6 }}
        animate={{ scale: 9, opacity: [0, 0.95, 0.95, 0.5], rotate: 6 }}
        transition={{ duration: 16, ease: "easeIn", opacity: { duration: 16, times: [0, 0.08, 0.8, 1] } }}
      />

      <button
        onClick={skip}
        data-testid="intro-skip"
        className="absolute top-[10vh] right-6 z-20 label-caps text-zinc-500 hover:text-white transition-colors"
      >
        Skip intro
      </button>

      <div className="relative z-10 px-6 w-full max-w-5xl mx-auto text-center">
        <AnimatePresence mode="wait">
          {current && !current.reveal && (
            <motion.div key={current.id} exit={{ opacity: 0, transition: { duration: 0.5 } }}>
              {current.lines && current.lines.map((l, i) => (
                <div key={i} className="line-mask">
                  <motion.p
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.15 + i * 0.18, ease }}
                    className={`font-serif-display font-light leading-[1.05] text-3xl sm:text-5xl md:text-6xl ${current.accent && i === 1 ? "silver-text italic" : "text-white"}`}
                  >
                    {l}
                  </motion.p>
                </div>
              ))}
              {current.fragments && (
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                  {current.fragments.map((f, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ duration: 0.5, delay: i * 0.32, ease }}
                      className="font-serif-display font-light text-2xl sm:text-4xl md:text-5xl text-zinc-400"
                    >
                      {f}
                    </motion.span>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {current && current.reveal && (
            <motion.div key="reveal" className="flex flex-col items-center">
              <div className="line-mask mb-8">
                <motion.p
                  initial={{ y: "110%" }} animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.1, ease }}
                  className="font-serif-display font-light text-3xl sm:text-5xl md:text-6xl"
                >
                  One trusted partner.
                </motion.p>
              </div>
              <motion.img
                src={LOGO}
                alt="MJ Wines International"
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.3, delay: 0.7, ease }}
                className="h-16 sm:h-20 md:h-24 w-auto mix-blend-screen"
              />
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.6 }}
                className="label-caps mt-6 text-zinc-400"
              >
                Your Premier Wine Event Concierge
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* progress bar */}
        <motion.div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-40 h-px bg-white/10 overflow-hidden">
          <motion.div
            className="h-full bg-white/60"
            initial={{ width: "0%" }}
            animate={{ width: `${((scene + 1) / SCENES.length) * 100}%` }}
            transition={{ duration: 0.6, ease }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};
