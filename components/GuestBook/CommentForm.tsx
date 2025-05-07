"use client";

import { useState } from "react";

export default function CommentForm({ onSubmit }: { onSubmit?: (comment: any) => void }) {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!content.trim()) return;

    const newComment = {
      id: Date.now(),
      nickname,
      password,
      content,
      createdAt: new Date().toISOString().split("T")[0],
      replies: [],
      likes: 0,
    };

    onSubmit?.(newComment);
    setNickname("");
    setPassword("");
    setContent("");
  };

  return (
    <div className="bg-white text-black p-4 rounded shadow mt-4 max-w-xl mx-auto">
      <input className="border p-2 w-full mb-2" placeholder="닉네임" value={nickname} onChange={(e) => setNickname(e.target.value)} />
      <input className="border p-2 w-full mb-2" placeholder="비밀번호" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <textarea className="border p-2 w-full mb-2" placeholder="100자 이내로 응원의 댓글 작성해주세요~!" value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">
        등록
      </button>
    </div>
  );
}
