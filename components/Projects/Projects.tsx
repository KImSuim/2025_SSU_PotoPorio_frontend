"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollDirection } from "../../hooks/useScrollDirection";
import { projects, categories } from "../../data/projectsData";
import { Project } from "../../types/Project";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

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

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const scrollDirection = useScrollDirection();
  const isScrollingDown = scrollDirection === "down";

  // 모달 상태 관리
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") setShowModal(false);
      };
      window.addEventListener("keydown", handleEsc);
      return () => {
        document.body.style.overflow = "auto";
        window.removeEventListener("keydown", handleEsc);
      };
    } else {
      document.body.style.overflow = "auto";
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
  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const filteredProjects = activeCategory === "All" ? projects : projects.filter((p) => p.type === activeCategory);

  return (
    <div className="text-[#FCF8F2] text-2xl z-20 relative px-8 sm:px-10 md:px-[100px] pt-[40px] sm:pt-[80px] lg:px-[200px] pb-[90px] lg:pb-[150px] bg-[#16331F] flex flex-col gap-[20px]">
      {/* 제목 */}
      <motion.h1 {...createAnimation(isScrollingDown)} className="text-[48px] sm:text-[60px] md:text-[65px] lg:text-[80px] font-bold mb-8 text-center">
        Projects
      </motion.h1>

      <section className="py-4 text-white">
        {/* 카테고리 버튼 */}
        <motion.nav {...createAnimation(isScrollingDown, 0.2)} className="flex justify-center gap-4 lg:gap-6 mb-10" aria-label="프로젝트 카테고리">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-5 sm:px-6 py-2 rounded-full font-semibold transition-colors duration-200 text-[15px] sm:text-lg leading-4 bg-white/40 ${
                activeCategory === category ? "text-[#FEC901]" : "text-[#16331F] hover:text-[#3C6C4F]"
              }`}
              aria-pressed={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </motion.nav>

        {/* 프로젝트 그리드 */}
        <motion.div {...createAnimation(isScrollingDown, 0.4)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {filteredProjects.map((project, index) => (
            <motion.div key={project.id} {...createAnimation(isScrollingDown, 0.5 + index * 0.1)}>
              <ProjectCard project={project} onView={() => handleProjectView(project)} />
            </motion.div>
          ))}
        </motion.div>

        {/* 모달 */}
        <AnimatePresence>
          {showModal && selectedProject && (
            <motion.div
              className="px-10 fixed inset-0 bg-black/50 flex justify-center items-center z-[9999] backdrop-blur-sm"
              style={{ paddingTop: "50px" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleCloseModal}
            >
              <ProjectModal project={selectedProject} onClose={handleCloseModal} />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
