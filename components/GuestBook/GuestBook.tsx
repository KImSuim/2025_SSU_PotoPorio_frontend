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

  // 버튼 클릭 시 작성 폼으로 스크롤
  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    //className="p-10 rounded-2xl shadow mt-4 max-w-6xl mx-auto"></form>
    <div className="text-[#FCF8F2] text-2xl z-20 relative px-[200px] pt-[80px] pb-[350px] bg-[#2E5D3A] flex flex-col gap-[20px] mx-auto">
      <div className="text-[80px] text-center">Guest book</div>
      {/* <button onClick={handleScrollToForm} className="text-yellow-300 text-3xl mb-4">
        응원의 한마디를 남겨주세요 Click!!
      </button> */}
      {/* 실제 댓글만 보여줌 */}
      <CommentList comments={comments} />
      {/* 댓글 작성 폼 */}
      <div ref={formRef}>
        <CommentForm onSubmit={handleAddComment} />
      </div>
    </div>
  );
}
