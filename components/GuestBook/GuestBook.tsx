"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useScrollDirection } from "../../hooks/useScrollDirection";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import type { Comment } from "../../types/Comment";
import { fireStore } from "../../firebase/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

// 상수를 컴포넌트 외부로 분리
const ANIMATION_CONFIG = {
  DURATION: 0.8,
  DELAYS: {
    TITLE: 0,
    DESCRIPTION: 0.2,
    COMMENT_LIST: 0.4,
    COMMENT_FORM: 0.6,
  },
} as const;

const STYLES = {
  CONTAINER: "text-[#FCF8F2] text-2xl z-20 relative px-8 sm:px-10 md:px-[100px] lg:px-[200px] pt-[40px] sm:pt-[80px] pb-[90px] lg:pb-[350px] bg-[#2E5D3A] flex flex-col gap-[10px] mx-auto",
  TITLE: "text-[48px] sm:text-[60px] md:text-[65px] lg:text-[80px] text-center",
  DESCRIPTION_BUTTON: "text-xl text-yellow-300 font-subtitle sm:text-3xl hover:text-yellow-200 transition-colors duration-200",
} as const;

// 애니메이션 variants를 컴포넌트 외부로 이동
const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

// 애니메이션 설정을 함수로 분리 - 메모이제이션 개선
const createAnimation = (isDown: boolean, delay = 0) => ({
  initial: "hidden",
  whileInView: "visible",
  transition: {
    duration: isDown ? ANIMATION_CONFIG.DURATION : 0,
    delay: isDown ? delay : 0,
    ease: "easeOut",
  },
  variants: fadeUpVariants,
  viewport: { once: true, amount: 0.3 }, // 성능 개선: 한 번만 실행, 30% 보일 때
});

export default function Guestbook() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const scrollDirection = useScrollDirection();
  const isScrollingDown = scrollDirection === "down";

  // 댓글 가져오기 - 에러 처리 개선
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const q = query(collection(fireStore, "comments"), orderBy("id", "desc"));
        const snapshot = await getDocs(q);

        const commentsData = snapshot.docs.map((doc) => {
          const data = doc.data() as Comment;
          return {
            ...data,
            // 데이터 검증
            id: data.id || Date.now(),
            likes: data.likes || 0,
            createdAt: data.createdAt || new Date().toISOString().split("T")[0],
          };
        });

        setComments(commentsData);
      } catch (error) {
        console.error("댓글을 가져오는데 실패했습니다:", error);
        setError("댓글을 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, []);

  // 댓글 추가 - 낙관적 업데이트
  const handleAddComment = useCallback((comment: Comment) => {
    setComments((prev) => [comment, ...prev]);
  }, []);

  // 댓글 수정 - 성능 최적화
  const handleUpdate = useCallback((id: number, content: string) => {
    setComments((prev) => prev.map((comment) => (comment.id === id ? { ...comment, content } : comment)));
  }, []);

  // 댓글 삭제 - 성능 최적화
  const handleDelete = useCallback((id: number) => {
    setComments((prev) => prev.filter((comment) => comment.id !== id));
  }, []);

  // 폼으로 스크롤 - 개선된 스크롤 로직
  const handleScrollToForm = useCallback(() => {
    if (!formRef.current) return;

    try {
      // 최신 브라우저의 scrollIntoView 사용
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    } catch {
      // 폴백: 기존 로직
      const formRect = formRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const targetY = formRect.bottom + scrollY - windowHeight;

      window.scrollTo({
        top: targetY + 100,
        behavior: "smooth",
      });
    }
  }, []);

  // 에러 상태 렌더링
  if (error) {
    return (
      <div className={STYLES.CONTAINER}>
        <div className="text-center text-red-400 text-lg">
          {error}
          <button onClick={() => window.location.reload()} className="block mx-auto mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={STYLES.CONTAINER}>
      {/* 제목 */}
      <motion.h1 {...createAnimation(isScrollingDown, ANIMATION_CONFIG.DELAYS.TITLE)} className={STYLES.TITLE}>
        Guest book
      </motion.h1>

      {/* 설명 텍스트 */}
      <motion.button
        {...createAnimation(isScrollingDown, ANIMATION_CONFIG.DELAYS.DESCRIPTION)}
        onClick={handleScrollToForm}
        className={STYLES.DESCRIPTION_BUTTON}
        type="button"
        aria-label="댓글 작성 폼으로 이동"
      >
        응원의 한마디를 남겨주세요 Click!!
      </motion.button>

      {/* 댓글 목록 */}
      <motion.section {...createAnimation(isScrollingDown, ANIMATION_CONFIG.DELAYS.COMMENT_LIST)} aria-label="댓글 목록">
        {isLoading ? <div className="text-center text-white text-lg py-8">댓글을 불러오는 중... ⏳</div> : <CommentList comments={comments} onUpdate={handleUpdate} onDelete={handleDelete} />}
      </motion.section>

      {/* 댓글 폼 */}
      <motion.section ref={formRef} {...createAnimation(isScrollingDown, ANIMATION_CONFIG.DELAYS.COMMENT_FORM)} aria-label="댓글 작성">
        <CommentForm onAdd={handleAddComment} />
      </motion.section>
    </div>
  );
}
