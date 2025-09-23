"use client";
import { useState } from "react";
import CommentItem from "./CommentItem";
import type { Comment } from "../../types/Comment";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function CommentList({ comments, onUpdate, onDelete }: { comments: Comment[]; onUpdate: (id: number, content: string) => void; onDelete: (id: number) => void }) {
  const [visibleCount, setVisibleCount] = useState(5);

  const handleShowMore = () => setVisibleCount((c) => Math.min(c + 5, comments.length));
  const handleHide = () => setVisibleCount(5);

  return (
    <div className="w-full max-w-5xl mx-auto">
      {comments.slice(0, visibleCount).map((comment) => (
        <CommentItem key={comment.id} comment={comment} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
      {comments.length > 5 && visibleCount < comments.length && (
        <div className="flex justify-center mt-6">
          <button className="font-subtitle text-white mt-4 flex items-center gap-1 font-bold transition duration-200 hover:text-white hover:drop-shadow-[0_0_10px_white]" onClick={handleShowMore}>
            더보기 <FiChevronDown size={30} />
          </button>
        </div>
      )}
      {comments.length > 5 && visibleCount >= comments.length && (
        <div className="flex justify-center mt-6">
          <button className="font-subtitle text-white mt-4 flex items-center gap-1 font-bold transition duration-200 hover:text-white hover:drop-shadow-[0_0_10px_white]" onClick={handleHide}>
            숨기기 <FiChevronUp size={30} />
          </button>
        </div>
      )}
    </div>
  );
}
