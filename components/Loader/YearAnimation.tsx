"use client";

import { motion, AnimatePresence } from "framer-motion";

interface YearAnimationProps {
  year: number;
  loadingDone: boolean;
}

export default function YearAnimation({ year, loadingDone }: YearAnimationProps) {
  // 모바일에서 이동 거리와 바 길이 조정
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const barWidth = isMobile ? "80%" : "calc(95% - 16rem)";
  const yearStart = isMobile ? "10%" : "10%";
  const yearEnd = isMobile ? "415%" : "700%";

  return (
    <AnimatePresence>
      {!loadingDone && (
        <motion.div
          key="year-loader"
          initial={{ y: "30%" }}
          animate={{ y: "30%" }}
          exit={{ y: 0 }}
          transition={{ duration: 0 }}
          className="absolute inset-0 flex items-center justify-start px-4 sm:px-10"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: barWidth }}
            transition={{
              duration: (2025 - 2021) * 0.25,
              ease: "linear",
            }}
            className="absolute top-1/2 left-0 h-1 bg-[#16331F]"
          />
          <motion.div
            initial={{ x: yearStart }}
            animate={{ x: yearEnd }}
            transition={{
              duration: (2025 - 2021) * 0.25,
              ease: "linear",
            }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-[#16331F] relative "
          >
            {year}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
