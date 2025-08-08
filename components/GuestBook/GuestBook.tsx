"use client";

import { useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import type { Comment } from "../../types/Comment";

// 테스트용 더미 데이터
const testComments: Comment[] = [
  {
    id: 1,
    nickname: "테스터",
    password: "1234",
    content: "안녕하세요! 테스트 댓글입니다.",
    createdAt: "2025-07-24",
    replies: [],
    likes: 0,
    icon: "😀",
  },
  {
    id: 2,
    nickname: "아이콘유저",
    password: "5678",
    content: "콘텐츠 아이콘 테스트!",
    createdAt: "2025-07-24",
    replies: [],
    likes: 0,
    icon: "🎉",
  },
];

export default function Guestbook() {
  // 실제 댓글 상태 (초기값은 빈 배열)
  const [comments, setComments] = useState<Comment[]>([]);

  // 댓글 작성 시 호출
  const handleAddComment = (comment: Comment) => {
    setComments((prev) => [comment, ...prev]);
  };

  const [showForm, setShowForm] = useState(false);

  return (
    //className="p-10 rounded-2xl shadow mt-4 max-w-6xl mx-auto"></form>
    <div className="text-[#FCF8F2] text-2xl z-20 relative px-[200px] pt-[80px] pb-[350px] bg-[#2E5D3A] flex flex-col gap-[20px] mx-auto">
      <div className="text-[80px] text-center">Guest book</div>
      {/* <button onClick={() => setShowForm(!showForm)} className="text-yellow-300 text-3xl mb-4">
        응원의 한마디를 남겨주세요 Click!!
      </button> */}
      {/* 실제 댓글만 보여줌 */}
      <CommentList comments={comments} />
      {/* 댓글 작성 폼 */}
      <CommentForm onSubmit={handleAddComment} />
    </div>
  );
}
