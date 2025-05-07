"use client";

import { useState } from "react";
import ReplyForm from "./ReplyForm";
import PasswordModal from "./PasswordModal";

export default function CommentItem({ comment, onUpdate, onDelete }: any) {
  const [showReply, setShowReply] = useState(false);
  const [showModal, setShowModal] = useState<null | "edit" | "delete">(null);
  const [editContent, setEditContent] = useState(comment.content);

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

  return (
    <div className="bg-white text-black rounded p-4 my-4 max-w-xl mx-auto shadow">
      <div className="flex justify-between">
        <span className="font-bold">{comment.nickname}</span>
        <span>{comment.createdAt}</span>
      </div>
      <div className="mt-2">{comment.content}</div>
      <div className="mt-2 flex gap-2">
        <button onClick={() => setShowModal("edit")} className="text-blue-600">
          수정
        </button>
        <button onClick={() => setShowModal("delete")} className="text-red-600">
          삭제
        </button>
        <button onClick={() => setShowReply(!showReply)} className="text-green-600">
          댓글
        </button>
      </div>

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
