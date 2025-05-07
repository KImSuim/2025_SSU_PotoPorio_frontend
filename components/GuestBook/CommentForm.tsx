"use client";

import { useState } from "react";

type Comment = {
  id: number;
  nickname: string;
  password: string;
  content: string;
  createdAt: string;
  replies: Comment[];
  likes: number;
};

export default function CommentForm({ onSubmit }: { onSubmit?: (comment: Comment) => void }) {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newComment: Comment = {
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
    <form onSubmit={handleSubmit} className="bg-white text-black p-4 rounded shadow mt-4 max-w-xl mx-auto">
      <input className="border p-2 w-full mb-2" placeholder="닉네임" value={nickname} onChange={(e) => setNickname(e.target.value)} />
      <input className="border p-2 w-full mb-2" placeholder="비밀번호" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <textarea className="border p-2 w-full mb-2" placeholder="100자 이내로 응원의 댓글 작성해주세요~!" value={content} onChange={(e) => setContent(e.target.value)} />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        등록
      </button>
    </form>
  );
}
