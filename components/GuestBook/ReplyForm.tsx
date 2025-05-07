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
    <div className="mt-4 bg-gray-100 p-4 rounded">
      <input value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="닉네임" />
      <input
        type="password"
        placeholder="비밀번호 (4자리)"
        value={password}
        onChange={(e) => {
          const val = e.target.value;
          // 숫자만 입력 & 최대 4글자 제한
          if (/^\d{0,4}$/.test(val)) setPassword(val);
        }}
        maxLength={4}
        className="..."
      />

      {/* <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="4자리 이상 비밀번호" type="password" /> */}
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="100자 이내로 응원의 댓글 작성해주세요~!" />
      <button onClick={handleSubmit}>등록</button>
    </div>
  );
}
