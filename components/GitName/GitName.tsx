"use client";

import { memo } from "react";

// 상수를 컴포넌트 외부로 분리
const IMAGE_CONFIG = {
  src: "/gitName.png", // public 폴더 기준 경로
  alt: "GitHub 프로필 이름",
  loading: "lazy" as const,
  decoding: "async" as const
};

// 스타일 상수
const CONTAINER_STYLES = "py-10 bg-[#FCF8F2] flex justify-center items-center";
const IMAGE_STYLES = `
  w-full 
  max-w-[350px] 
  sm:max-w-[350px] 
  md:max-w-[600px] 
  lg:max-w-[777px] 
  h-auto 
  px-4 
  object-contain
  transition-transform 
  duration-300 
  hover:scale-105
`.replace(/\s+/g, ' ').trim();

function GitName() {
  return (
    <section 
      className={CONTAINER_STYLES}
      aria-label="GitHub 프로필 섹션"
    >
      <img
        src={IMAGE_CONFIG.src}
        alt={IMAGE_CONFIG.alt}
        loading={IMAGE_CONFIG.loading}
        decoding={IMAGE_CONFIG.decoding}
        className={IMAGE_STYLES}
        width={777}
        height="auto"
        onError={(e) => {
          console.error('GitHub 이미지 로딩 실패:', e);
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
    </section>
  );
}

// React.memo로 불필요한 리렌더링 방지
export default memo(GitName);
