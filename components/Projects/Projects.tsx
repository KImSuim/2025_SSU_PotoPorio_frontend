"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, categories } from "../../data/projectsData";
import { Project } from "../../types/Project";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

  const filteredProjects = activeCategory === "All" ? projects : projects.filter((p) => p.type === activeCategory);

  return (
    <>
      <div className="text-[#FCF8F2] text-2xl z-20 relative px-8 sm:px-10 md:px-[100px] pt-[40px] sm:pt-[80px] lg:px-[200px] pb-[90px] lg:pb-[150px] bg-[#16331F] flex flex-col gap-[20px]">
        {/* 제목 애니메이션 */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[48px] sm:text-[60px] md:text-[65px] lg:text-[80px] font-bold mb-8 text-center"
        >
          Projects
        </motion.h2>

        <section className="py-4 text-white">
          {/* 카테고리 버튼 애니메이션 */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="flex justify-center gap-4 lg:gap-6 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 sm:px-6 py-2 rounded-full font-semibold transition-colors duration-200 text-[15px] sm:text-lg leading-4 bg-white/40 ${
                  activeCategory === category ? "text-[#FEC901]" : "text-[#16331F] hover:text-[#3C6C4F]"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* 프로젝트 그리드 애니메이션 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center"
          >
            {filteredProjects.map((project, index) => (
              <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}>
                <ProjectCard
                  project={project}
                  onView={() => {
                    setSelectedProject(project);
                    setShowModal(true);
                  }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* 모달 애니메이션 */}
          <AnimatePresence>
            {showModal && selectedProject && (
              <motion.div
                className="px-10 fixed inset-0 bg-black/50 flex justify-center items-center z-[9999] backdrop-blur-sm"
                style={{ paddingTop: "50px" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectModal project={selectedProject} onClose={() => setShowModal(false)} />
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </>
  );
}
