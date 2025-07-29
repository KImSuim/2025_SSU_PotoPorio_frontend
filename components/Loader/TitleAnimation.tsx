"use client";

import { motion } from "framer-motion";

export default function TitleAnimation() {
  return (
    <motion.h1
      className="text-[300px] font-bold text-[#16331F] whitespace-nowrap mb-10"
      initial={{ x: "15%", y: "-25%" }}
      animate={{ x: "-30%", y: "-25%" }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        duration: 6,
        ease: "linear",
      }}
    >
      2025 / SSU PotoPorio
    </motion.h1>
  );
}
