"use client";

import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import ReplyForm from "./ReplyForm";
import PasswordModal from "./PasswordModal";
import type { Comment } from "../../types/Comment";

type CommentItemProps = {
  comment: Comment;
  onUpdate: (id: number, content: string) => void;
  onDelete: (id: number) => void;
};

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

export default function CommentItem({ comment, onUpdate, onDelete }: CommentItemProps) {
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
    <div
      className="
      bg-[#fcf8f2e5] text-black p-5 sm:p-8 md:p-10 rounded-2xl shadow mt-8
      w-full max-w-[450px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-6xl mx-auto
      "
    >
      <div className="flex flex-row justify-between mx-1 sm:mx-3 items-center gap-2">
        <div className="flex flex-row gap-3 sm:gap-10 items-center">
          <span className="font-subtitle font-bold text-base sm:text-xl">{comment.nickname}</span>
          <span className="font-subtitle font-light text-base sm:text-xl">{comment.createdAt}</span>
          {/* 하트 아이콘과 숫자 */}
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 ${liked ? "text-red-500" : "text-[#8A8A8A] hover:text-[#FFA6A6] transition-colors duration-300 "} font-subtitle`}
            aria-label="좋아요"
          >
            <FaHeart className="text-xl sm:text-2xl" />
            <span className="font-bold text-lg sm:text-xl">{likes}</span>
          </button>
        </div>
        <div className="font-subtitle flex gap-2 text-white text-base sm:text-xl">
          <button onClick={() => setShowModal("edit")} className="bg-[#B0DAF4] px-4 sm:px-5 py-1 rounded-lg font-semibold hover:bg-[#56AFE6] transition-colors duration-300">
            수정
          </button>
          <button onClick={() => setShowModal("delete")} className="bg-[#FFA6A6] px-4 sm:px-5 py-1 rounded-lg font-semibold hover:bg-[#FF6B6B] transition-colors duration-300">
            삭제
          </button>
        </div>
      </div>

      <hr className="my-4 border-1 border-black" />

      <div className="font-subtitle mx-1 sm:mx-3 font-light text-base sm:text-xl break-words">{comment.content}</div>

      {showReply && <ReplyForm parent={comment} onFinish={() => setShowReply(false)} />}

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
