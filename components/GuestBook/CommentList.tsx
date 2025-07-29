"use client";
import { useState } from "react";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import type { Comment } from "../../types/Comment";

export default function CommentList({ comments, onUpdate, onDelete }: { comments: Comment[]; onUpdate?: (id: number, content: string) => void; onDelete?: (id: number) => void }) {
  const [visibleCount, setVisibleCount] = useState(5);

  return (
    <div className="mt-6">
      {comments.slice(0, visibleCount).map((comment) => (
        <CommentItem key={comment.id} comment={comment} onUpdate={onUpdate ?? (() => {})} onDelete={onDelete ?? (() => {})} />
      ))}
      {comments.length > visibleCount && (
        <button className="font-subtitle text-white mt-4 underline" onClick={() => setVisibleCount((c) => c + 5)}>
          더보기 ▼
        </button>
      )}
      <CommentForm />
    </div>
  );
}
