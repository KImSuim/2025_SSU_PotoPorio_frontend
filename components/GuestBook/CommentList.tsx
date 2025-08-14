"use client";
import { useState } from "react";
import CommentItem from "./CommentItem";
import type { Comment } from "../../types/Comment";

type CommentListProps = {
  comments: Comment[];
  onUpdate?: (id: number, content: string) => void;
  onDelete?: (id: number) => void;
};

export default function CommentList({ comments, onUpdate, onDelete }: CommentListProps) {
  const [visibleCount, setVisibleCount] = useState(5);

  const handleShowMore = () => setVisibleCount((c) => Math.min(c + 5, comments.length));
  const handleHide = () => setVisibleCount(5);

  return (
    <div className="max-w-5xl w-full mx-auto">
      {comments.slice(0, visibleCount).map((comment) => (
        <CommentItem key={comment.id} comment={comment} onUpdate={onUpdate ?? (() => {})} onDelete={onDelete ?? (() => {})} />
      ))}
      {comments.length > 5 && visibleCount < comments.length && (
        <div className="flex justify-center mt-6">
          <button className="font-subtitle text-white mt-4" onClick={handleShowMore}>
            더보기 ▼
          </button>
        </div>
      )}
      {comments.length > 5 && visibleCount >= comments.length && (
        <div className="flex justify-center mt-6">
          <button className="font-subtitle text-white mt-4" onClick={handleHide}>
            숨기기 ▲
          </button>
        </div>
      )}
    </div>
  );
}
