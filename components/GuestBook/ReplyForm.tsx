"use client";

import { useState } from "react";

export default function ReplyForm({ parent, onFinish }: { parent: any; onFinish: () => void }) {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (!nickname || !password || !content) return alert("모든 필드를 입력해주세요");

    // 여기에 등록 요청 코드 작성
    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        parentId: parent.id,
        nickname,
        password,
        content,
      }),
      headers: { "Content-Type": "application/json" },
    });

    // 입력값 초기화 + 폼 닫기
    setNickname("");
    setPassword("");
    setContent("");
    onFinish(); // 부모에게 폼 닫아달라고 알림
  };

  return (
    <div className="mt-8 bg-[#E5E1DC] p-5 rounded flex flex-col gap-3">
      <div className="flex flex-row justify-between px-2">
        <div className="flex flex-row gap-2">
          <input className="bg-white font-subtitle border-2 border-gray-400 p-2 rounded-md text-lg font-semibold" placeholder="닉네임" value={nickname} onChange={(e) => setNickname(e.target.value)} />
          <input
            type="password"
            placeholder="비밀번호 (4자리)"
            value={password}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d{0,4}$/.test(val)) setPassword(val);
            }}
            maxLength={4}
            className="bg-white font-subtitle border-2 border-gray-400 p-2 rounded-md text-lg font-semibold"
          />
        </div>
        <button onClick={handleSubmit} className="font-subtitle bg-[#ABD9B7] text-white text-xl px-6 rounded-lg font-semibold">
          등록
        </button>
      </div>

      <hr className=" border-1 border-[#898989]" />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="100자 이내로 응원의 댓글 작성해주세요~!"
        className="mx-2 bg-white font-subtitle border-2 border-gray-400 p-3 rounded-md text-lg font-semibold"
        // className="font-subtitle p-2 text-base rounded-md w-full border-2 border-gray-400 resize-none"
        rows={2}
        maxLength={100}
      />
    </div>
  );
}
