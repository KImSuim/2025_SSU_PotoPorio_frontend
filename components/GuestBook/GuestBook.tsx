"use client";

import { useRef, useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import type { Comment } from "../../types/Comment";

export default function Guestbook() {
  const [comments, setComments] = useState<Comment[]>([]);
  const formRef = useRef<HTMLDivElement>(null);

  const handleAddComment = (comment: Comment) => {
    setComments((prev) => [comment, ...prev]);
  };

  // CommentForm의 하단이 화면 하단에 오도록 스크롤
  const handleScrollToForm = () => {
    if (formRef.current) {
      // CommentForm의 하단 위치 계산
      const formRect = formRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const targetY = formRect.bottom + scrollY - windowHeight;
      window.scrollTo({ top: targetY + 100, behavior: "smooth" });
    }
  };

  return (
    <div className="text-[#FCF8F2] text-2xl z-20 relative px-[200px] pt-[80px] pb-[200px] bg-[#2E5D3A] flex flex-col gap-[20px] mx-auto">
      <div className="text-[80px] text-center">Guest book</div>
      <button onClick={handleScrollToForm} className="text-yellow-300 text-3xl mb-4">
        응원의 한마디를 남겨주세요 Click!!
      </button>

      <CommentList comments={comments} />

      {/* CommentForm을 감싸는 div에 ref 추가 */}
      <div ref={formRef}>
        <CommentForm onSubmit={handleAddComment} />
      </div>
    </div>
  );
}
