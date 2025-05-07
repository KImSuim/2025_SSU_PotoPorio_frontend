"use client";
import { useState } from "react";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
// import CommentItem from "./CommentItem";

export default function CommentList() {
  const [comments, setComments] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(5);

  const addComment = (comment: any) => {
    setComments([comment, ...comments]);
  };

  const updateComment = (id: number, content: string) => {
    setComments((prev) => prev.map((c) => (c.id === id ? { ...c, content } : c)));
  };

  const deleteComment = (id: number) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="mt-6">
      <CommentForm onSubmit={addComment} />
      {comments.slice(0, visibleCount).map((comment) => (
        <CommentItem key={comment.id} comment={comment} onUpdate={updateComment} onDelete={deleteComment} />
      ))}
      {comments.length > visibleCount && (
        <button className="text-white mt-4 underline" onClick={() => setVisibleCount((c) => c + 5)}>
          더보기 ▼
        </button>
      )}
    </div>
  );
}
