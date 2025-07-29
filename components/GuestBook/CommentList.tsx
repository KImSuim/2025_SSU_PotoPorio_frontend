"use client";
import { useState } from "react";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

export default function CommentList({ comments }: { comments: any[] }) {
  const [visibleCount, setVisibleCount] = useState(5);

  return (
    <div className="mt-6">
      {comments.slice(0, visibleCount).map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
      {comments.length > visibleCount && (
        <button className=" font-subtitle text-white mt-4 underline" onClick={() => setVisibleCount((c) => c + 5)}>
          더보기 ▼
        </button>
      )}
      <CommentForm />
    </div>
  );
}
