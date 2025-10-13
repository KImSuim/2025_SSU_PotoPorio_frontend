"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useScrollDirection } from "../../hooks/useScrollDirection";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import type { Comment } from "../../types/Comment";
import { fireStore } from "../../firebase/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

// 애니메이션 variants를 컴포넌트 외부로 이동
const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

// 애니메이션 설정을 객체로 분리
const createAnimation = (isDown: boolean, delay = 0) => ({
  initial: "hidden",
  whileInView: "visible",
  transition: {
    duration: isDown ? 0.8 : 0,
    delay: isDown ? delay : 0,
  },
  variants: fadeUpVariants,
});

export default function Guestbook() {
  const [comments, setComments] = useState<Comment[]>([]);
  const formRef = useRef<HTMLDivElement>(null);
  const scrollDirection = useScrollDirection();
  const isScrollingDown = scrollDirection === "down";

  // 댓글 가져오기
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const q = query(collection(fireStore, "comments"), orderBy("id", "desc"));
        const snapshot = await getDocs(q);
        setComments(snapshot.docs.map((doc) => doc.data() as Comment));
      } catch (error) {
        console.error("댓글을 가져오는데 실패했습니다:", error);
      }
    };
    fetchComments();
  }, []);

  // 댓글 추가
  const handleAddComment = useCallback((comment: Comment) => {
    setComments((prev) => [comment, ...prev]);
  }, []);

  // 댓글 수정
  const handleUpdate = useCallback((id: number, content: string) => {
    setComments((prev) => prev.map((comment) => (comment.id === id ? { ...comment, content } : comment)));
  }, []);

  // 댓글 삭제
  const handleDelete = useCallback((id: number) => {
    setComments((prev) => prev.filter((comment) => comment.id !== id));
  }, []);

  // 폼으로 스크롤
  const handleScrollToForm = useCallback(() => {
    if (!formRef.current) return;

    const formRect = formRef.current.getBoundingClientRect();
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const targetY = formRect.bottom + scrollY - windowHeight;

    window.scrollTo({
      top: targetY + 100,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="text-[#FCF8F2] text-2xl z-20 relative px-8 sm:px-10 md:px-[100px] lg:px-[200px] pt-[40px] sm:pt-[80px] pb-[90px] lg:pb-[350px] bg-[#2E5D3A] flex flex-col gap-[10px] mx-auto">
      {/* 제목 */}
      <motion.h1 {...createAnimation(isScrollingDown)} className="text-[48px] sm:text-[60px] md:text-[65px] lg:text-[80px] text-center">
        Guest book
      </motion.h1>

      {/* 설명 텍스트 */}
      <motion.button
        {...createAnimation(isScrollingDown, 0.2)}
        onClick={handleScrollToForm}
        className="text-xl text-yellow-300 font-subtitle sm:text-3xl hover:text-yellow-200 transition-colors duration-200"
      >
        응원의 한마디를 남겨주세요 Click!!
      </motion.button>

      {/* 댓글 목록 */}
      <motion.section {...createAnimation(isScrollingDown, 0.4)} aria-label="댓글 목록">
        <CommentList comments={comments} onUpdate={handleUpdate} onDelete={handleDelete} />
      </motion.section>

      {/* 댓글 폼 */}
      <motion.section ref={formRef} {...createAnimation(isScrollingDown, 0.6)} aria-label="댓글 작성">
        <CommentForm onAdd={handleAddComment} />
      </motion.section>
    </div>
  );
}
