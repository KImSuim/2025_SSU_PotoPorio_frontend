"use client";

import { motion, AnimatePresence } from "framer-motion";

interface YearAnimationProps {
  year: number;
  loadingDone: boolean;
}

export default function YearAnimation({ year, loadingDone }: YearAnimationProps) {
  return (
    <AnimatePresence>
      {!loadingDone && (
        <motion.div key="year-loader" initial={{ y: "30%" }} animate={{ y: "30%" }} exit={{ y: 0 }} transition={{ duration: 0 }} className="absolute inset-0 flex items-center justify-start px-10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "calc(95% - 16rem)" }}
            transition={{
              duration: (2025 - 2021) * 0.25,
              ease: "linear",
            }}
            className="absolute top-1/2 left-0 h-1 bg-[#16331F]"
          />
          <motion.div
            initial={{ x: "10%" }}
            animate={{ x: "700%" }}
            transition={{
              duration: (2025 - 2021) * 0.25,
              ease: "linear",
            }}
            className="text-8xl font-bold text-[#16331F] relative"
          >
            {year}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
