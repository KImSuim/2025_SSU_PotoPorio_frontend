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
  const [shouldUnmute, setShouldUnmute] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolledPast(latest > 0);
    });
  }, [scrollY]);

  useEffect(() => {
    if (openMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // 컴포넌트 언마운트 시 복구
    return () => {
      document.body.style.overflow = "";
    };
  }, [openMenu]);

  // ✅ 쿠키 조회수 처리 (중복 증가 방지)
  useEffect(() => {
    setShouldUnmute(true);
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
      {/* 음악 버튼 (lg 이상) */}
      <div className={isScrolledPast ? "fixed top-0 right-[230px] z-40 flex items-center gap-3 h-[90px] hidden lg:block" : "fixed top-0 right-4 z-40 flex items-center gap-3 h-[80px] hidden"}>
        <YouTubeVisualizer shouldUnmute={shouldUnmute} />
      </div>

      {/* 상단 고정 헤더 */}
      {!isScrolledPast && (
        <div className="fixed top-0 left-0 w-full h-[80px] flex justify-center items-center bg-[#2E5D3A] z-20">
          <div className="relative z-10 text-[30px] font-bold text-white text-center">SSU PortFolio</div>
        </div>
      )}

      {isScrolledPast && (
        <motion.div className="fixed top-0 left-0 w-full h-[90px] flex items-center justify-between px-[24px] md:px-[40px] lg:px-[85px] bg-[#0D1B11] z-30" style={{ fontSize, opacity }}>
          <div className="flex items-center gap-16 h-full">
            {/* 왼쪽: 로고 */}
            <div className="py-6 text-[30px] font-bold text-[#ABD9B7] whitespace-nowrap">SSU PortFolio</div>
            {/* lg 이상: 기존 메뉴/뷰카운트 */}
            <div className="hidden lg:flex">
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
          </div>
          <div className="hidden lg:flex items-center gap-3 text-[#ABD9B7] font-bold text-base md:text-lg h-full">total view : {viewCount}</div>
          {/* lg 미만: 음악 + 햄버거 */}
          <div className="flex items-center gap-4 lg:hidden">
            <YouTubeVisualizer shouldUnmute={shouldUnmute} />
            <button className="focus:outline-none" onClick={() => setOpenMenu((v) => !v)} aria-label="메뉴 열기">
              {/* 햄버거 아이콘 */}
              <svg width="32" height="32" fill="#ABD9B7" viewBox="0 0 24 24">
                <rect y="6" width="24" height="2" rx="1" />
                <rect y="11" width="24" height="2" rx="1" />
                <rect y="16" width="24" height="2" rx="1" />
              </svg>
            </button>
          </div>
          {/* 드롭다운 메뉴 (모바일/태블릿) */}
          {openMenu && (
            <div className="fixed inset-0 z-50 flex lg:hidden">
              {/* 왼쪽 반투명 배경 */}
              <div className="flex-1 bg-black/85" onClick={() => setOpenMenu(false)}>
                {/* 세로 점선 */}
                <div className="absolute left-0 top-0 h-full flex items-start">
                  <div className="border-l-3 border-[#FCF8F2] h-[37%] ml-17" />
                  <div className="absolute left-17 top-90 h-full flex items-start">
                    <div className="border-l-3 border-dashed border-[#fdefbb] h-[20%] " />
                  </div>
                </div>
                <button className="absolute top-8 right-8 hover:drop-shadow-[0_0_5px_white]" onClick={() => setOpenMenu(false)} aria-label="메뉴 닫기">
                  {/* X 아이콘 */}
                  <svg width="32" height="32" fill="#fdefbb" viewBox="0 0 24 24">
                    <line x1="6" y1="6" x2="18" y2="18" stroke="#fdefbb" strokeWidth="2" />
                    <line x1="6" y1="18" x2="18" y2="6" stroke="#fdefbb" strokeWidth="2" />
                  </svg>
                </button>
                <ul className="flex flex-col gap-6 pl-28 pt-32">
                  <li>
                    <Link
                      to="about"
                      smooth
                      duration={500}
                      offset={-80}
                      className="hover:drop-shadow-[0_0_2px_white] text-white text-5xl font-bold font-serif hover:text-[#fdefbb] transition"
                      onClick={() => setOpenMenu(false)}
                    >
                      About me
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="projects"
                      smooth
                      duration={500}
                      offset={-80}
                      className="hover:drop-shadow-[0_0_2px_white] text-white text-5xl font-bold font-serif hover:text-[#fdefbb] transition"
                      onClick={() => setOpenMenu(false)}
                    >
                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="guestbook"
                      smooth
                      duration={500}
                      offset={-80}
                      className="hover:drop-shadow-[0_0_2px_white] text-white text-5xl font-bold font-serif hover:text-[#fdefbb] transition"
                      onClick={() => setOpenMenu(false)}
                    >
                      Guest book
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </>
  );
}
