"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const items = ["HTML & CSS", "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "NestJS", "SpringBoot"];

  const getDuration = () => {
    const width = window.innerWidth;
    if (width >= 1024) return 12; // lg 이상
    if (width >= 640) return 14; // sm~lg: 느리게
    return 16; // sm 미만: 기본
  };

  // width 계산 및 애니메이션 시작 함수
  const startAnimation = () => {
    if (containerRef.current) {
      const firstSet = containerRef.current.children[0] as HTMLElement;
      if (firstSet) {
        const setWidth = firstSet.offsetWidth;
        controls.start({
          x: -setWidth,
          transition: {
            repeat: Infinity,
            repeatType: "loop",
            duration: getDuration(),
            ease: "linear",
          },
        });
      }
    }
  };

  useEffect(() => {
    startAnimation();
    window.addEventListener("resize", startAnimation);
    return () => window.removeEventListener("resize", startAnimation);
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden py-13 lg:py-18"
      style={{
        background: "radial-gradient(circle, rgba(19, 39, 25, 0) 80%, rgba(10, 20, 13, 0.6) 95%, rgba(12, 25, 16, 1) 100%)",
      }}
    >
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(19, 39, 25, 0) 69%, rgba(10, 20, 13, 0.6) 88%, rgba(12, 25, 16, 1) 100%)",
        }}
      />
      <motion.div ref={containerRef} animate={controls} className="flex whitespace-nowrap">
        {/* 한 세트의 아이템을 두 번 반복해서 자연스럽게 이어지게 함 */}
        {[...Array(2)].map((_, idx) => (
          <div key={idx} className="flex">
            {items.map((item, index) => (
              <div key={idx + "-" + index} className="text-white text-4xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mx-4 sm:mx-4 md:mx-8 lg:mx-12 drop-shadow-lg">
                {item}
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
