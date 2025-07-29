"use client";

import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import ReplyForm from "./ReplyForm";
import PasswordModal from "./PasswordModal";

// 쿠키 읽기/쓰기 함수
function getLikedComments() {
  const cookie = document.cookie.split("; ").find((row) => row.startsWith("likedComments="));
  if (!cookie) return [];
  try {
    return JSON.parse(decodeURIComponent(cookie.split("=")[1]));
  } catch {
    return [];
  }
}

function setLikedComments(arr: number[]) {
  document.cookie = `likedComments=${encodeURIComponent(JSON.stringify(arr))}; path=/; max-age=31536000`;
}

export default function CommentItem({ comment, onUpdate, onDelete }: any) {
  const [showReply, setShowReply] = useState(false);
  const [showModal, setShowModal] = useState<null | "edit" | "delete">(null);
  const [editContent, setEditContent] = useState(comment.content);
  const [likes, setLikes] = useState(comment.likes ?? 0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const likedArr = getLikedComments();
    setLiked(likedArr.includes(comment.id));
  }, [comment.id]);

  const handlePasswordConfirm = (password: string) => {
    if (password !== comment.password) {
      alert("비밀번호가 틀렸습니다!");
      return false;
    }
    return true;
  };

  const handleEdit = () => {
    onUpdate(comment.id, editContent);
    setShowModal(null);
  };

  const handleDelete = () => {
    onDelete(comment.id);
    setShowModal(null);
  };

  const handleLike = () => {
    const likedArr = getLikedComments();
    if (liked) {
      // 좋아요 취소
      setLikes(likes - 1);
      setLiked(false);
      setLikedComments(likedArr.filter((id: number) => id !== comment.id));
    } else {
      // 좋아요 추가
      setLikes(likes + 1);
      setLiked(true);
      setLikedComments([...likedArr, comment.id]);
    }
  };

  return (
    <div className="bg-[#FCF8F2] text-black p-10 rounded-2xl shadow mt-4 max-w-6xl mx-auto">
      <div className="flex justify-between mx-3 items-center">
        <div className="flex gap-10 items-center">
          <span className="font-subtitle font-bold ">{comment.nickname}</span>
          <span className="font-subtitle font-light">{comment.createdAt}</span>
          {/* 하트 아이콘과 숫자 */}
          <button onClick={handleLike} className={`flex items-center gap-1 ${liked ? "text-red-500 font-subtitle " : "text-gray-400 hover:text-red-300 font-subtitle "}`} aria-label="좋아요">
            <FaHeart />
            <span className="font-bold text-black">{likes}</span>
          </button>
        </div>
        <div className="font-subtitle flex gap-2 text-white text-xl">
          <button onClick={() => setShowModal("edit")} className="bg-[#6CB8E6] px-5 py-1 rounded-lg font-semibold">
            수정
          </button>
          <button onClick={() => setShowModal("delete")} className="bg-[#FF6B6B] px-5 py-1 rounded-lg font-semibold">
            삭제
          </button>
          <button onClick={() => setShowReply(!showReply)} className="bg-[#ABD9B7] px-5 py-1 rounded-lg font-semibold">
            댓글
          </button>
        </div>
      </div>

      <hr className="my-4 border-1 border-black" />

      <div className="font-subtitle  mx-3 font-light">{comment.content}</div>

      {showReply && (
        <ReplyForm
          parent={comment}
          onFinish={() => setShowReply(false)} // 등록 후 숨김 처리
        />
      )}

      {showModal === "edit" && (
        <PasswordModal
          onConfirm={(pw) => {
            if (handlePasswordConfirm(pw)) {
              handleEdit();
            }
          }}
          onClose={() => setShowModal(null)}
        >
          <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} className="w-full border p-2" />
        </PasswordModal>
      )}

      {showModal === "delete" && (
        <PasswordModal
          onConfirm={(pw) => {
            if (handlePasswordConfirm(pw)) {
              handleDelete();
            }
          }}
          onClose={() => setShowModal(null)}
        />
      )}
    </div>
  );
}
