"use client";

import { useCallback, useState } from "react";

// 상수를 컴포넌트 외부로 분리
const EMAIL = "suim5748@gmail.com";
const GITHUB_URL = "https://github.com/KImSuim";

// 메시지 상수
const MESSAGES = {
  SUCCESS: "이메일이 복사되었습니다!",
  ERROR: "이 브라우저에서는 복사 기능을 지원하지 않습니다.\n직접 복사해 주세요.",
  COPIED: "복사됨!",
} as const;

// 스타일 상수
const HOVER_EFFECT = "hover:drop-shadow-[0_0_10px_white] transition-all duration-200";

export default function Footer() {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(EMAIL);
        setIsCopied(true);

        // 2초 후 복사 상태 리셋
        setTimeout(() => setIsCopied(false), 2000);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = EMAIL;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);

        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }
    } catch (error) {
      console.error("복사 실패:", error);
      alert(MESSAGES.ERROR);
    }
  }, []);

  return (
    <footer className="text-[#FCF8F2] py-6 px-5 md:px-14 lg:px-20 bg-[#0D1B11] flex justify-between items-center" role="contentinfo" aria-label="사이트 푸터">
      {/* 카피라이트 */}
      <div className="hidden md:block text-base font-medium">© 2025 PotoPorio</div>

      {/* 이메일 */}
      <button
        onClick={handleCopy}
        className={`${HOVER_EFFECT} cursor-pointer font-medium relative group`}
        title={isCopied ? MESSAGES.COPIED : "클릭하면 복사됩니다"}
        aria-label="이메일 주소 복사"
        type="button"
      >
        <span className={isCopied ? "text-green-400" : ""}>{EMAIL}</span>

        {/* 복사 완료 알림 */}
        {isCopied && <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">{MESSAGES.COPIED}</span>}

        {/* 호버 툴팁 */}
        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          클릭하여 복사
        </span>
      </button>

      {/* GitHub 링크 */}
      <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={`${HOVER_EFFECT} font-medium`} aria-label="GitHub 프로필 보기">
        GitHub
        <span className="sr-only"> (새 탭에서 열림)</span>
      </a>
    </footer>
  );
}
