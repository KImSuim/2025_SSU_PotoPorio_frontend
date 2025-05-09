"use client";
import { motion } from "framer-motion";
import Video from "../Intro/video";
import Skills from "../Intro/skills";

export default function MainScreen() {
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="inset-0 w-full h-screen overflow-hidden bg-black z-50"
      style={{
        background: "linear-gradient(180deg, rgba(43, 91, 56, 1) 0%, rgba(12, 25, 16, 1) 100%)",
      }}
    >
      <div className="relative w-full h-full">
        {/* 비디오 */}
        <div className="absolute inset-0 z-0 h-[790px]">
          <Video />
        </div>

        {/* Skills 텍스트 */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <Skills />
        </div>
      </div>
    </motion.div>
  );
}
