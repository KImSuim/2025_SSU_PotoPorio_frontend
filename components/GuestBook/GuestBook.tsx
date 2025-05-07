"use client";

import { useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

export default function Guestbook() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="text-[#FCF8F2] text-2xl z-20 relative px-[110px] pt-[80px] pb-[260px] bg-[#2E5D3A] flex flex-col gap-[15px]">
      <div className="text-[80px] text-center">Guest book</div>
      <button onClick={() => setShowForm(!showForm)} className="text-yellow-300 text-3xl mb-4">
        응원의 한마디를 남겨주세요 Click!!
      </button>
      {showForm && <CommentForm />} {/* 댓글 작성폼 */}
      <CommentList />
    </div>
  );
}
