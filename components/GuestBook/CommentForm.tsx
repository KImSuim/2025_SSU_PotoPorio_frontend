"use client";

import { useRef, useState, useCallback } from "react";
import type { Comment } from "../../types/Comment";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { fireStore } from "../../firebase/firebase";
import { collection, setDoc, doc, query, getDocs, orderBy, limit } from "firebase/firestore";

// 상수를 컴포넌트 외부로 분리
const VALIDATION_RULES = {
  NICKNAME: { MIN: 1, MAX: 5 },
  PASSWORD: { LENGTH: 4, PATTERN: /^\d{4}$/ },
  CONTENT: { MIN: 1, MAX: 100 }
};

const MESSAGES = {
  NICKNAME_ERROR: "닉네임은 1자 이상 5자 이내로 작성해주세요!",
  NICKNAME_LENGTH_ERROR: "5글자까지만 입력할 수 있습니다!",
  PASSWORD_ERROR: "비밀번호는 숫자 4자리로 입력해주세요!",
  PASSWORD_DIGIT_ERROR: "비밀번호는 숫자만 입력해주세요!",
  PASSWORD_LENGTH_ERROR: "비밀번호는 숫자 4자리까지만 입력 가능합니다!",
  CONTENT_EMPTY_ERROR: "댓글을 작성해주세요!",
  CONTENT_LENGTH_ERROR: "댓글은 100자 이내로 작성해주세요!",
  CONTENT_INPUT_LENGTH_ERROR: "100글자까지만 입력할 수 있습니다!",
  SUCCESS: "댓글이 성공적으로 저장되었습니다!",
  SAVE_ERROR: "댓글 저장에 실패했습니다."
} as const;

const STYLES = {
  FORM: "bg-[#FCF8F2] text-[#9D9D9D] p-5 sm:p-8 md:p-10 rounded-2xl shadow mt-4w-full max-w-[450px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-5xl mx-auto box-border mt-8",
  INPUT_BASE: "bg-white font-subtitle border-2 border-gray-400 rounded-md font-semibold focus:outline-none focus:border-[#33974D] transition-all",
  INPUT_ACTIVE: "text-black",
  INPUT_INACTIVE: "text-gray-400",
  BUTTON_ACTIVE: "bg-[#33974D] text-white",
  BUTTON_INACTIVE: "bg-[#ABD9B7] text-white opacity-60 cursor-not-allowed"
} as const;

interface CommentFormProps {
  onAdd?: (comment: Comment) => void;
}

export default function CommentForm({ onAdd }: CommentFormProps) {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitBtnRef = useRef<HTMLButtonElement>(null);

  // Firestore에서 현재 최대 id 조회
  const getNextId = useCallback(async (): Promise<number> => {
    try {
      const q = query(collection(fireStore, "comments"), orderBy("id", "desc"), limit(1));
      const snapshot = await getDocs(q);
      if (snapshot.empty) return 1;
      const maxId = Number(snapshot.docs[0].data().id);
      return maxId + 1;
    } catch (error) {
      console.error("ID 조회 실패:", error);
      return Date.now(); // 폴백으로 타임스탬프 사용
    }
  }, []);

  // 입력 유효성 검사
  const validateInputs = useCallback(() => {
    const trimmedNickname = nickname.trim();
    const trimmedContent = content.trim();

    if (trimmedNickname.length < VALIDATION_RULES.NICKNAME.MIN || 
        trimmedNickname.length > VALIDATION_RULES.NICKNAME.MAX) {
      alert(MESSAGES.NICKNAME_ERROR);
      return false;
    }

    if (!VALIDATION_RULES.PASSWORD.PATTERN.test(password)) {
      alert(MESSAGES.PASSWORD_ERROR);
      return false;
    }

    if (trimmedContent.length < VALIDATION_RULES.CONTENT.MIN) {
      alert(MESSAGES.CONTENT_EMPTY_ERROR);
      return false;
    }

    if (trimmedContent.length > VALIDATION_RULES.CONTENT.MAX) {
      alert(MESSAGES.CONTENT_LENGTH_ERROR);
      return false;
    }

    return true;
  }, [nickname, password, content]);

  // 폼 초기화
  const resetForm = useCallback(() => {
    setNickname("");
    setPassword("");
    setContent("");
  }, []);

  // 폼 제출 핸들러
  const handleSubmit = useCallback(async (e?: React.FormEvent | React.KeyboardEvent | React.MouseEvent) => {
    e?.preventDefault();

    if (isSubmitting || !validateInputs()) return;

    setIsSubmitting(true);

    try {
      const nextId = await getNextId();
      const newComment: Comment = {
        id: nextId,
        nickname: nickname.trim(),
        createdAt: new Date().toISOString().split("T")[0],
        likes: 0,
        content: content.trim(),
        password
      };

      await setDoc(doc(fireStore, "comments", String(nextId)), newComment);
      
      if (onAdd) onAdd(newComment);
      alert(MESSAGES.SUCCESS);
      resetForm();
    } catch (error) {
      console.error("댓글 저장 실패:", error);
      alert(MESSAGES.SAVE_ERROR);
    } finally {
      setIsSubmitting(false);
    }
  }, [nickname, password, content, isSubmitting, validateInputs, getNextId, onAdd, resetForm]);

  // 닉네임 변경 핸들러
  const handleNicknameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val.length > VALIDATION_RULES.NICKNAME.MAX) {
      alert(MESSAGES.NICKNAME_LENGTH_ERROR);
      return;
    }
    setNickname(val);
  }, []);

  // 비밀번호 변경 핸들러
  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d{0,4}$/.test(val)) {
      setPassword(val);
    } else if (val.length > VALIDATION_RULES.PASSWORD.LENGTH) {
      alert(MESSAGES.PASSWORD_LENGTH_ERROR);
    } else {
      alert(MESSAGES.PASSWORD_DIGIT_ERROR);
    }
  }, []);

  // 댓글 내용 변경 핸들러
  const handleContentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }, []);

  // 키보드 이벤트 핸들러
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      submitBtnRef.current?.focus();
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
    if (content.length >= VALIDATION_RULES.CONTENT.MAX && 
        e.key.length === 1 && 
        !e.ctrlKey && 
        !e.metaKey) {
      alert(MESSAGES.CONTENT_INPUT_LENGTH_ERROR);
    }
  }, [content.length, handleSubmit]);

  // 비밀번호 토글 핸들러
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(v => !v);
  }, []);

  // 버튼 활성화 상태
  const isActive = nickname.trim().length >= VALIDATION_RULES.NICKNAME.MIN && 
                   VALIDATION_RULES.PASSWORD.PATTERN.test(password) && 
                   content.trim().length >= VALIDATION_RULES.CONTENT.MIN;

  return (
    <form onSubmit={handleSubmit} className={STYLES.FORM}>
      <div className="flex items-start gap-2 lg:gap-4 mb-2 font-subtitle">
        
        {/* 닉네임 입력 */}
        <input
          className={`${STYLES.INPUT_BASE} p-2 sm:p-2.5 w-1/3 sm:w-1/2 text-sm sm:text-lg ${
            nickname.trim().length > 0 ? STYLES.INPUT_ACTIVE : STYLES.INPUT_INACTIVE
          }`}
          placeholder="닉네임"
          value={nickname}
          onChange={handleNicknameChange}
          disabled={isSubmitting}
          aria-label="닉네임 입력"
        />

        {/* 비밀번호 입력 */}
        <div className="relative w-1/2">
          <input
            className={`${STYLES.INPUT_BASE} p-2 sm:p-2.5 w-full text-sm sm:text-lg pr-10 ${
              password.length >= VALIDATION_RULES.PASSWORD.LENGTH ? STYLES.INPUT_ACTIVE : STYLES.INPUT_INACTIVE
            }`}
            placeholder="비밀번호 (숫자 4자리)"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            disabled={isSubmitting}
            aria-label="비밀번호 입력"
          />
          <button 
            type="button" 
            className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2" 
            onClick={togglePasswordVisibility}
            tabIndex={-1}
            aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
          >
            {showPassword ? <FiEye size={22} color="#33974D" /> : <FiEyeOff size={22} />}
          </button>
        </div>

        {/* 등록 버튼 */}
        <button
          ref={submitBtnRef}
          type="submit"
          disabled={!isActive || isSubmitting}
          className={`font-subtitle py-2.5 sm:py-3 px-1 min-w-15 md:min-w-25 rounded-lg font-semibold ml-auto text-sm sm:text-xl transition-colors duration-300 ${
            isActive && !isSubmitting ? STYLES.BUTTON_ACTIVE : STYLES.BUTTON_INACTIVE
          }`}
          aria-label="댓글 등록"
        >
          {isSubmitting ? "등록중..." : "등록"}
        </button>
      </div>

      <hr className="my-3 lg:my-4 border-black border-1" />

      {/* 댓글 입력 */}
      <div className="relative">
        <textarea
          value={content}
          onChange={handleContentChange}
          onKeyDown={handleKeyDown}
          disabled={isSubmitting}
          className={`${STYLES.INPUT_BASE} p-3 w-full text-sm sm:text-xl resize-none ${
            content.trim().length >= 1 ? STYLES.INPUT_ACTIVE : STYLES.INPUT_INACTIVE
          }`}
          placeholder="100자로 응원의 댓글 작성해주세요~!"
          rows={3}
          maxLength={VALIDATION_RULES.CONTENT.MAX}
          aria-label="댓글 내용 입력"
        />
        <span className="absolute text-sm text-gray-500 font-subtitle right-4 bottom-5">
          {content.length} / {VALIDATION_RULES.CONTENT.MAX}
        </span>
      </div>
    </form>
  );
}
