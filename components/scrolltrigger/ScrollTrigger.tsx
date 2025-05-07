// components/scrolltrigger/ScrollTrigger.tsx
"use client";

import { useEffect } from "react";
import { scroller } from "react-scroll";

export default function ScrollTrigger() {
  useEffect(() => {
    const handleScroll = () => {
      // 100px 이상 스크롤하면 about 섹션으로 이동
      if (window.scrollY > 100) {
        scroller.scrollTo("about", {
          smooth: true,
          duration: 600,
          offset: -80, // 헤더 부분을 고려하여 offset을 설정
        });
      }
    };

    // 처음 페이지 로드되면 100px로 내려가면 바로 about으로 스크롤 이동
    setTimeout(() => {
      if (window.scrollY === 0) {
        window.scrollTo(0, 100); // 로딩 후 100px 스크롤 내리기
        setTimeout(() => {
          scroller.scrollTo("about", {
            smooth: true,
            duration: 600,
            offset: -80, // 헤더 부분을 고려하여 offset을 설정
          });
        }, 300); // 잠깐 대기 후 실행
      }
    }, 100);

    // 스크롤 이벤트 리스너 추가
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트가 언마운트될 때 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
}
