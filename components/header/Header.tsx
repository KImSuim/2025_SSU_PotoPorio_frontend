"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import YouTubeVisualizer from "../Intro/MusicControl";
import { Link } from "react-scroll";
import Cookies from "js-cookie";

export default function Header() {
  const { scrollY } = useScroll();
  const [isScrolledPast, setIsScrolledPast] = useState(false);
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolledPast(latest > 830);
    });
  }, [scrollY]);

  // ✅ 쿠키 조회수 처리 (중복 증가 방지)
  useEffect(() => {
    const alreadyCounted = sessionStorage.getItem("viewCounted");

    const current = parseInt(Cookies.get("viewCount") || "0", 10);

    if (!alreadyCounted) {
      const next = current + 1;
      Cookies.set("viewCount", String(next), { expires: 365 });
      sessionStorage.setItem("viewCounted", "true");
      setViewCount(next);
    } else {
      setViewCount(current);
    }
  }, []);

  const fontSize = useTransform(scrollY, [0, 200], ["30px", "18px"]);
  const opacity = useTransform(scrollY, [0, 200], [1, 1]);

  return (
    <>
      {!isScrolledPast && (
        <div className="fixed top-0 left-0 w-full h-[80px] flex justify-center items-center bg-[#2E5D3A] z-20">
          <div className="relative z-10 text-[30px] font-bold text-white text-center">SSU PortFolio</div>
        </div>
      )}

      {isScrolledPast && (
        <motion.div className="fixed top-0 left-0 w-full h-[90px] flex items-center justify-between px-[85px] bg-[#0D1B11] z-30" style={{ fontSize, opacity }}>
          <div className="flex items-center gap-16 h-full">
            <div className="py-6 text-[30px] font-bold text-[#ABD9B7] whitespace-nowrap">SSU PortFolio</div>

            <div className="flex gap-6 text-[#FCF8F2] text-base md:text-lg font-semibold items-center">
              <Link to="about" smooth duration={500} offset={-80} className="cursor-pointer hover:text-[#ABD9B7]">
                About me
              </Link>
              <Link to="projects" smooth duration={500} offset={-80} className="cursor-pointer hover:text-[#ABD9B7]">
                Projects
              </Link>
              <Link to="guestbook" smooth duration={500} offset={-80} className="cursor-pointer hover:text-[#ABD9B7]">
                Guest book
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[#ABD9B7] font-bold text-base md:text-lg h-full">
            <YouTubeVisualizer />
            <div>total view : {viewCount}</div>
          </div>
        </motion.div>
      )}
    </>
  );
}
