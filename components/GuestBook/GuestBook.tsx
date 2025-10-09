"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import type { Comment } from "../../types/Comment";
import { fireStore } from "../../firebase/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export default function Guestbook() {
  const [comments, setComments] = useState<Comment[]>([]);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchComments = async () => {
      const q = query(collection(fireStore, "comments"), orderBy("id", "desc"));
      const snapshot = await getDocs(q);
      setComments(snapshot.docs.map((doc) => doc.data() as Comment));
    };
    fetchComments();
  }, []);

  const handleAddComment = (comment: Comment) => {
    setComments((prev) => [comment, ...prev]);
  };

  // 댓글 수정 함수 추가
  const handleUpdate = (id: number, content: string) => {
    setComments((prev) => prev.map((comment) => (comment.id === id ? { ...comment, content } : comment)));
  };

  // 댓글 삭제 함수 추가
  const handleDelete = (id: number) => {
    setComments((prev) => prev.filter((comment) => comment.id !== id));
  };

  // CommentForm의 하단이 화면 하단에 오도록 스크롤
  const handleScrollToForm = () => {
    if (formRef.current) {
      const formRect = formRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const targetY = formRect.bottom + scrollY - windowHeight;
      window.scrollTo({ top: targetY + 100, behavior: "smooth" });
    }
  };

  return (
    <div className="text-[#FCF8F2] text-2xl z-20 relative px-8 sm:px-10 md:px-[100px] lg:px-[200px] pt-[40px] sm:pt-[80px] pb-[90px] lg:pb-[350px] bg-[#2E5D3A] flex flex-col gap-[10px] mx-auto">
      {/* 제목 애니메이션 */}
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-[48px] sm:text-[60px] md:text-[65px] lg:text-[80px] text-center">
        Guest book
      </motion.div>

      {/* 설명 텍스트 애니메이션 */}
      <motion.button
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        onClick={handleScrollToForm}
        className="text-xl text-yellow-300 font-subtitle sm:text-3xl"
      >
        응원의 한마디를 남겨주세요 Click!!
      </motion.button>

      {/* 댓글 목록 애니메이션 */}
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
        <CommentList comments={comments} onUpdate={handleUpdate} onDelete={handleDelete} />
      </motion.div>

      {/* 댓글 폼 애니메이션 */}
      <motion.div ref={formRef} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
        <CommentForm onAdd={handleAddComment} />
      </motion.div>
    </div>
  );
}
