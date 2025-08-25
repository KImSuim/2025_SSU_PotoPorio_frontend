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

  // 댓글 수정 함수 추가
  const handleUpdate = (id: number, content: string) => {
    setComments(prev =>
      prev.map(comment =>
        comment.id === id ? { ...comment, content } : comment
      )
    );
  };

  // 댓글 삭제 함수 추가
  const handleDelete = (id: number) => {
    setComments(prev => prev.filter(comment => comment.id !== id));
  };

  // CommentForm의 하단이 화면 하단에 오도록 스크롤
  const handleScrollToForm = () => {
    if (formRef.current) {
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

      <CommentList
        comments={comments}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />

      <div ref={formRef}>
        <CommentForm onSubmit={handleAddComment} />
      </div>
    </div>
  );
}
