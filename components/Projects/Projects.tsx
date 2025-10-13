"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollDirection } from "../../hooks/useScrollDirection";
import { projects, categories } from "../../data/projectsData";
import { Project } from "../../types/Project";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

// 상수를 컴포넌트 외부로 분리
const ANIMATION_CONFIG = {
  DURATION: 0.8,
  DELAYS: {
    TITLE: 0,
    CATEGORY: 0.2,
    GRID: 0.4,
    CARD_BASE: 0.5,
    CARD_INCREMENT: 0.1,
  },
} as const;

const STYLES = {
  CONTAINER: "text-[#FCF8F2] text-2xl z-20 relative px-8 sm:px-10 md:px-[100px] pt-[40px] sm:pt-[80px] lg:px-[200px] pb-[90px] lg:pb-[150px] bg-[#16331F] flex flex-col gap-[20px]",
  TITLE: "text-[48px] sm:text-[60px] md:text-[65px] lg:text-[80px] font-bold mb-8 text-center",
  SECTION: "py-4 text-white",
  NAV: "flex justify-center gap-4 lg:gap-6 mb-10",
  CATEGORY_BUTTON_BASE: "px-5 sm:px-6 py-2 rounded-full font-semibold transition-colors duration-200 text-[15px] sm:text-lg leading-4 bg-white/40",
  CATEGORY_ACTIVE: "text-[#FEC901]",
  CATEGORY_INACTIVE: "text-[#16331F] hover:text-[#3C6C4F]",
  GRID: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center",
  // z-index를 최고값으로 설정
  MODAL_BACKDROP: "px-10 fixed inset-0 bg-black/50 flex justify-center items-center z-[99999] backdrop-blur-sm",
} as const;

// 애니메이션 variants를 컴포넌트 외부로 이동
const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

// 애니메이션 설정을 함수로 분리
const createAnimation = (isDown: boolean, delay = 0) => ({
  initial: "hidden",
  whileInView: "visible",
  transition: {
    duration: isDown ? ANIMATION_CONFIG.DURATION : 0,
    delay: isDown ? delay : 0,
    ease: "easeOut",
  },
  variants: fadeUpVariants,
  viewport: { once: true, amount: 0.3 },
});

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const scrollDirection = useScrollDirection();
  const isScrollingDown = scrollDirection === "down";

  // 모달 상태 관리 - 포털 사용 고려
  useEffect(() => {
    if (showModal) {
      // 모든 스크롤 방지
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          handleCloseModal();
        }
      };

      window.addEventListener("keydown", handleEsc);

      return () => {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        window.removeEventListener("keydown", handleEsc);
      };
    }
  }, [showModal]);

  // 카테고리 변경 핸들러
  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  // 프로젝트 상세 보기 핸들러
  const handleProjectView = useCallback((project: Project) => {
    setSelectedProject(project);
    setShowModal(true);
  }, []);

  // 모달 닫기 핸들러
  const handleCloseModal = useCallback((e?: React.MouseEvent) => {
    // 이벤트 버블링 방지
    if (e) {
      e.stopPropagation();
    }
    setShowModal(false);
    setSelectedProject(null);
  }, []);

  // 백드롭 클릭 핸들러
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      // 모달 내부 클릭은 무시
      if (e.target === e.currentTarget) {
        handleCloseModal();
      }
    },
    [handleCloseModal]
  );

  // 필터된 프로젝트 메모이제이션
  const filteredProjects = useMemo(() => {
    return activeCategory === "All" ? projects : projects.filter((p) => p.type === activeCategory);
  }, [activeCategory]);

  // 애니메이션 props 메모이제이션
  const animationProps = useMemo(
    () => ({
      title: createAnimation(isScrollingDown, ANIMATION_CONFIG.DELAYS.TITLE),
      category: createAnimation(isScrollingDown, ANIMATION_CONFIG.DELAYS.CATEGORY),
      grid: createAnimation(isScrollingDown, ANIMATION_CONFIG.DELAYS.GRID),
    }),
    [isScrollingDown]
  );

  return (
    <>
      <div className={STYLES.CONTAINER}>
        {/* 제목 */}
        <motion.h1 {...animationProps.title} className={STYLES.TITLE}>
          Projects
        </motion.h1>

        <section className={STYLES.SECTION}>
          {/* 카테고리 버튼 */}
          <motion.nav {...animationProps.category} className={STYLES.NAV} aria-label="프로젝트 카테고리">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`${STYLES.CATEGORY_BUTTON_BASE} ${activeCategory === category ? STYLES.CATEGORY_ACTIVE : STYLES.CATEGORY_INACTIVE}`}
                aria-pressed={activeCategory === category}
                type="button"
              >
                {category}
              </button>
            ))}
          </motion.nav>

          {/* 프로젝트 그리드 */}
          <motion.div {...animationProps.grid} className={STYLES.GRID}>
            {filteredProjects.map((project, index) => (
              <motion.div key={project.id} {...createAnimation(isScrollingDown, ANIMATION_CONFIG.DELAYS.CARD_BASE + index * ANIMATION_CONFIG.DELAYS.CARD_INCREMENT)}>
                <ProjectCard project={project} onView={() => handleProjectView(project)} />
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>

      {/* 포털을 사용한 모달 - 최상위 레벨에 렌더링 */}
      <AnimatePresence>
        {showModal && selectedProject && (
          <motion.div
            className={STYLES.MODAL_BACKDROP}
            style={{
              paddingTop: "50px",
              // 추가 보장을 위한 인라인 스타일
              zIndex: 99999,
              position: "fixed",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <ProjectModal project={selectedProject} onClose={handleCloseModal} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
