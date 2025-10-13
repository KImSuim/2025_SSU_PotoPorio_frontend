"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { FaHeart } from "react-icons/fa";
import ReplyForm from "./ReplyForm";
import PasswordModal from "./PasswordModal";
import type { Comment } from "../../types/Comment";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { fireStore } from "../../firebase/firebase";

// 상수를 컴포넌트 외부로 분리
const COOKIE_CONFIG = {
  NAME: "likedComments",
  MAX_AGE: 31536000, // 1년
  PATH: "/",
} as const;

const MESSAGES = {
  WRONG_PASSWORD: "비밀번호가 틀렸습니다!",
  EDIT_ERROR: "수정 중 오류가 발생했습니다.",
  DELETE_ERROR: "삭제 중 오류가 발생했습니다.",
} as const;

const STYLES = {
  CONTAINER: `
    bg-[#fcf8f2e5] text-black p-4 sm:p-8 md:p-10 rounded-2xl shadow mt-8
    w-full max-w-[450px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-6xl mx-auto
  `
    .replace(/\s+/g, " ")
    .trim(),
  LIKE_BUTTON_BASE: "flex items-center gap-1 font-subtitle transition-colors duration-300",
  LIKE_BUTTON_LIKED: "text-red-500",
  LIKE_BUTTON_DEFAULT: "text-[#8A8A8A] hover:text-[#FFA6A6]",
  ACTION_BUTTON_BASE: "px-3 sm:px-5 py-1 rounded-lg font-semibold transition-colors tracking-tighter duration-300",
  EDIT_BUTTON: "bg-[#B0DAF4] hover:bg-[#56AFE6]",
  DELETE_BUTTON: "bg-[#FFA6A6] hover:bg-[#FF6B6B]",
} as const;

type CommentItemProps = {
  comment: Comment;
  onUpdate: (id: number, content: string) => void;
  onDelete: (id: number) => void;
};

// 쿠키 관련 유틸리티 함수들을 최적화
const cookieUtils = {
  getLikedComments(): number[] {
    if (typeof document === "undefined") return [];

    const cookie = document.cookie.split("; ").find((row) => row.startsWith(`${COOKIE_CONFIG.NAME}=`));

    if (!cookie) return [];

    try {
      return JSON.parse(decodeURIComponent(cookie.split("=")[1]));
    } catch {
      return [];
    }
  },

  setLikedComments(arr: number[]): void {
    if (typeof document === "undefined") return;

    document.cookie = `${COOKIE_CONFIG.NAME}=${encodeURIComponent(JSON.stringify(arr))}; path=${COOKIE_CONFIG.PATH}; max-age=${COOKIE_CONFIG.MAX_AGE}`;
  },
};

function CommentItem({ comment, onUpdate, onDelete }: CommentItemProps) {
  const [showReply, setShowReply] = useState(false);
  const [showModal, setShowModal] = useState<null | "edit" | "delete">(null);
  const [editContent, setEditContent] = useState(comment.content);
  const [likes, setLikes] = useState(comment.likes ?? 0);
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 좋아요 상태 초기화
  useEffect(() => {
    const likedArr = cookieUtils.getLikedComments();
    setLiked(likedArr.includes(comment.id));
  }, [comment.id]);

  // 비밀번호 확인
  const handlePasswordConfirm = useCallback(
    (password: string): boolean => {
      if (password !== comment.password) {
        alert(MESSAGES.WRONG_PASSWORD);
        return false;
      }
      return true;
    },
    [comment.password]
  );

  // 댓글 수정
  const handleEdit = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await updateDoc(doc(fireStore, "comments", String(comment.id)), {
        content: editContent,
      });
      onUpdate(comment.id, editContent);
      setShowModal(null);
    } catch (error) {
      console.error("댓글 수정 실패:", error);
      alert(MESSAGES.EDIT_ERROR);
    } finally {
      setIsLoading(false);
    }
  }, [comment.id, editContent, onUpdate, isLoading]);

  // 댓글 삭제
  const handleDelete = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await deleteDoc(doc(fireStore, "comments", String(comment.id)));
      onDelete(comment.id);
      setShowModal(null);
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
      alert(MESSAGES.DELETE_ERROR);
    } finally {
      setIsLoading(false);
    }
  }, [comment.id, onDelete, isLoading]);

  // 좋아요 토글
  const handleLike = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const likedArr = cookieUtils.getLikedComments();
      const commentRef = doc(fireStore, "comments", String(comment.id));

      if (liked) {
        // 좋아요 취소
        const newLikes = likes - 1;
        setLikes(newLikes);
        setLiked(false);
        cookieUtils.setLikedComments(likedArr.filter((id: number) => id !== comment.id));
        await updateDoc(commentRef, { likes: newLikes });
      } else {
        // 좋아요 추가
        const newLikes = likes + 1;
        setLikes(newLikes);
        setLiked(true);
        cookieUtils.setLikedComments([...likedArr, comment.id]);
        await updateDoc(commentRef, { likes: newLikes });
      }
    } catch (error) {
      console.error("좋아요 처리 실패:", error);
      // 에러 시 상태 롤백
      setLikes(comment.likes ?? 0);
      setLiked(cookieUtils.getLikedComments().includes(comment.id));
    } finally {
      setIsLoading(false);
    }
  }, [comment.id, comment.likes, liked, likes, isLoading]);

  // 모달 핸들러들
  const handleEditClick = useCallback(() => setShowModal("edit"), []);
  const handleDeleteClick = useCallback(() => setShowModal("delete"), []);
  const handleCloseModal = useCallback(() => setShowModal(null), []);
  const handleReplyToggle = useCallback(() => setShowReply((prev) => !prev), []);
  const handleReplyFinish = useCallback(() => setShowReply(false), []);
  const handleEditContentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditContent(e.target.value);
  }, []);

  // 비밀번호 모달 핸들러들
  const handleEditConfirm = useCallback(
    (pw: string) => {
      if (handlePasswordConfirm(pw)) {
        handleEdit();
      }
    },
    [handlePasswordConfirm, handleEdit]
  );

  const handleDeleteConfirm = useCallback(
    (pw: string) => {
      if (handlePasswordConfirm(pw)) {
        handleDelete();
      }
    },
    [handlePasswordConfirm, handleDelete]
  );

  return (
    <article className={STYLES.CONTAINER} role="article">
      <header className="flex flex-row justify-between mx-1 sm:mx-3 items-center gap-1">
        <div className="flex flex-row gap-2 lg:gap-3 sm:gap-10 items-center">
          <span className="font-subtitle font-bold text-sm sm:text-xl">{comment.nickname}</span>
          <time className="font-subtitle font-light text-xs sm:text-xl" dateTime={comment.createdAt}>
            {comment.createdAt}
          </time>

          {/* 좋아요 버튼 */}
          <button
            onClick={handleLike}
            disabled={isLoading}
            className={`${STYLES.LIKE_BUTTON_BASE} ${liked ? STYLES.LIKE_BUTTON_LIKED : STYLES.LIKE_BUTTON_DEFAULT} ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            aria-label={liked ? "좋아요 취소" : "좋아요"}
            type="button"
          >
            <FaHeart className="text-base sm:text-xl lg:text-2xl" />
            <span className="font-bold text-xs sm:text-lg lg:text-xl">{likes}</span>
          </button>
        </div>

        {/* 액션 버튼들 */}
        <div className="font-subtitle flex gap-2 text-white text-sm sm:text-xl">
          <button
            onClick={handleEditClick}
            disabled={isLoading}
            className={`${STYLES.ACTION_BUTTON_BASE} ${STYLES.EDIT_BUTTON} ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            type="button"
            aria-label="댓글 수정"
          >
            수정
          </button>
          <button
            onClick={handleDeleteClick}
            disabled={isLoading}
            className={`${STYLES.ACTION_BUTTON_BASE} ${STYLES.DELETE_BUTTON} ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            type="button"
            aria-label="댓글 삭제"
          >
            삭제
          </button>
        </div>
      </header>

      <hr className="my-2 lg:my-4 border-1 border-black" />

      <div className="font-subtitle mx-1 sm:mx-3 font-light text-sm sm:text-base lg:text-xl break-words">{comment.content}</div>

      {/* 답글 폼 */}
      {showReply && <ReplyForm parent={comment} onFinish={handleReplyFinish} />}

      {/* 수정 모달 */}
      {showModal === "edit" && (
        <PasswordModal onConfirm={handleEditConfirm} onClose={handleCloseModal}>
          <textarea value={editContent} onChange={handleEditContentChange} className="w-full border p-2 rounded" rows={3} placeholder="수정할 내용을 입력해주세요" aria-label="수정할 댓글 내용" />
        </PasswordModal>
      )}

      {/* 삭제 모달 */}
      {showModal === "delete" && <PasswordModal onConfirm={handleDeleteConfirm} onClose={handleCloseModal} />}
    </article>
  );
}

// React.memo로 불필요한 리렌더링 방지
export default memo(CommentItem);
