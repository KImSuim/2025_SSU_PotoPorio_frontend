"use client";

import { useState } from "react";

// type Comment = {
//   id: number;
//   nickname: string;
//   password: string;
//   content: string;
//   createdAt: string;
//   replies: Comment[];
//   likes: number;
// };

export default function CommentForm({ onSubmit }: { onSubmit?: (comment: any) => void }) {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    <form onSubmit={handleSubmit} className="bg-[#FCF8F2] text-[#9D9D9D] p-10 rounded-2xl shadow mt-4 max-w-6xl mx-auto">
      <div className="font-subtitle flex items-start gap-4 mb-2">
        <input
          className="bg-white font-subtitle border-2 border-gray-400 p-3 rounded-md w-1/2 text-xl font-bold text-black"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <input
          className="bg-white font-subtitle border-2 border-gray-400 p-3 rounded-md w-1/2 text-xl font-bold text-black"
          placeholder="비밀번호 (숫자 4자리)"
          type="password"
          value={password}
          onChange={(e) => {
            const val = e.target.value;
            // 숫자만 입력 & 최대 4글자 제한
            if (/^\d{0,4}$/.test(val)) setPassword(val);
          }}
        />
        <button type="submit" className="font-subtitle bg-[#ABD9B7] text-white px-6 py-3 rounded-lg font-bold ml-auto mt-1 text-xl " style={{ minWidth: 100 }}>
          등록
        </button>
      </div>
      <hr className="my-4 border-1 border-black" />
      <textarea
        className="bg-white font-subtitle border-2 border-gray-400 p-4 rounded-md  w-full text-xl resize-none text-black"
        placeholder="100자 이내로 응원의 댓글 작성해주세요~!"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        maxLength={100}
      />
    </form>
  );
}
