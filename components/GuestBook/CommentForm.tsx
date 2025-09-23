"use client";

import { useRef, useState } from "react";
import type { Comment } from "../../types/Comment";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { fireStore } from "../../firebase/firebase";
import { collection, addDoc, query, getDocs, orderBy, limit } from "firebase/firestore";

// // 댓글 타입 정의
// type Comment = {
//   id: number;
//   nickname: string;
//   createdAt: string;
//   likes: number;
//   content: string;
//   password: string;
//   replyId: number;
// };

export default function CommentForm({ onAdd }: { onAdd?: (comment: Comment) => void }) {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const submitBtnRef = useRef<HTMLButtonElement>(null);

  // Firestore에서 현재 최대 id 조회
  const getNextId = async () => {
    const q = query(collection(fireStore, "comments"), orderBy("id", "desc"), limit(1));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return 1;
    const maxId = Number(snapshot.docs[0].data().id);
    return maxId + 1;
  };

  const [enterSubmit, setEnterSubmit] = useState(false);

  const handleSubmit = async (e?: React.FormEvent | React.KeyboardEvent | React.MouseEvent) => {
    // 엔터로 등록 시 form submit을 막기 위해 enterSubmit 체크
    if (enterSubmit) {
      setEnterSubmit(false);
      return;
    }
    e?.preventDefault();

    if (nickname.trim().length < 2) {
      alert("닉네임을 2글자 이상 입력해주세요!");
      return;
    }
    if (!/^\d{4}$/.test(password)) {
      alert("비밀번호는 숫자 4자리로 입력해주세요!");
      return;
    }
    if (content.trim().length < 1) {
      alert("댓글을 작성해주세요!");
      return;
    }

    const nextId = await getNextId();

    const newComment: Comment = {
      id: nextId,
      nickname,
      createdAt: new Date().toISOString().split("T")[0],
      likes: 0,
      content,
      password,
      // replyId: 1,
    };

    try {
      await addDoc(collection(fireStore, "comments"), newComment);
      // 등록 후 바로 화면에 반영
      if (onAdd) onAdd(newComment);
      alert("댓글이 성공적으로 저장되었습니다!");
      setNickname("");
      setPassword("");
      setContent("");
    } catch (error) {
      alert("댓글 저장에 실패했습니다.");
      console.error(error);
    }
  };

  const isActive = nickname.trim().length > 1 && /^\d{4}$/.test(password) && content.trim().length >= 1 && password.trim().length === 4;

  return (
    <form onSubmit={handleSubmit} className="bg-[#FCF8F2] text-[#9D9D9D] p-10 rounded-2xl shadow mt-4 max-w-5xl w-full mx-auto">
      <div className="flex items-start gap-4 mb-2 font-subtitle">
        {/* 닉네임 입력 */}
        <input
          className={`bg-white font-subtitle border-2 border-gray-400 p-3 rounded-md w-1/2 text-xl font-semibold focus:outline-none focus:border-[#33974D] transition-all ${
            nickname.trim().length > 1 ? "text-black" : "text-gray-400"
          }`}
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => {
            const val = e.target.value;
            if (val.length > 10) {
              alert("10글자까지만 입력할 수 있습니다!");
              return;
            }
            setNickname(val);
          }}
        />

        {/* 비밀번호 입력 */}
        <div className="relative w-1/2">
          <input
            className={`bg-white font-subtitle border-2 border-gray-400 p-3 rounded-md w-full text-xl font-semibold text-black pr-10 focus:outline-none focus:border-[#33974D] transition-all ${
              password.trim().length >= 4 ? "text-black" : "text-gray-400"
            }`}
            placeholder="비밀번호 (숫자 4자리)"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d{0,4}$/.test(val)) {
                setPassword(val);
              } else if (val.length > 4) {
                alert("비밀번호는 숫자 4자리까지만 입력 가능합니다!");
              } else {
                alert("비밀번호는 숫자만 입력해주세요!");
              }
            }}
          />
          <button type="button" className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2" onClick={() => setShowPassword((v) => !v)} tabIndex={-1}>
            {showPassword ? <FiEye size={22} color="#33974D" /> : <FiEyeOff size={22} />}
          </button>
        </div>

        {/* 등록 버튼 */}
        <button
          ref={submitBtnRef}
          type="submit"
          disabled={!isActive}
          className={`font-subtitle px-5 py-2.5 rounded-lg font-semibold ml-auto text-xl transition-colors duration-300
        ${isActive ? "bg-[#33974D] text-white" : "bg-[#ABD9B7] text-white opacity-60 cursor-not-allowed"}
      `}
          style={{ minWidth: 90 }}
        >
          등록
        </button>
      </div>

      <hr className="my-4 border-black border-1" />

      {/* 댓글 입력 */}
      <div className="relative ">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          tabIndex={0} // Tab 이동 가능
          className={`bg-white font-subtitle border-2 border-gray-400 p-4 rounded-md w-full text-xl resize-none focus:outline-none focus:border-[#33974D] transition-all ${
            content.trim().length >= 1 ? "text-black" : "text-gray-400"
          }`}
          placeholder="100자로 응원의 댓글 작성해주세요~!"
          rows={3}
          onKeyDown={(e) => {
            if (e.key === "Tab") {
              e.preventDefault();
              submitBtnRef.current?.focus();
            }
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <span className="absolute text-sm text-gray-500 font-subtitle right-4 bottom-5">{content.length} / 100</span>
      </div>
    </form>
  );
}
