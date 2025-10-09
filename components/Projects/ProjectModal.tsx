"use client";

import { motion } from "framer-motion";
import { HiMiniXMark } from "react-icons/hi2";
import { Project } from "../../types/Project";
import { Slideshow } from "./Slideshow";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <motion.div
      className="px-10 fixed inset-0 bg-black/50 flex justify-center items-center z-[9999] backdrop-blur-sm"
      style={{ paddingTop: "50px" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-[#0D1B11] p-[30px] rounded-lg w-[100%] max-w-3xl text-[#FCF8F2] items-center flex flex-col gap-3"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ duration: 0.3 }}
        style={{
          boxShadow: "rgba(255, 255, 255, 0.5) 1px -1px 20px 0px",
        }}
      >
        <button onClick={onClose} className="font-bold text-white hover:text-[#FCF8F2] flex w-full justify-between items-center mt-2 mb-1">
          <div></div>
          <h3 className="text-xl md:text-3xl lg:text-4xl font-bold lg:mb-2">{project.title}</h3>
          <HiMiniXMark size={25} className="lg:hover:drop-shadow-[0_0_5px_white] transition-all duration-200" />
        </button>
        <span className="text-sm md:text-base md:mb-1 bg-[#FCF8F285] text-[#0D1B11] py-1 px-5 md-1 lg:mb-2 rounded-full">{project.type}</span>
        {project.images && project.images.length > 0 && <Slideshow images={project.images} />}
        <div className="font-subtitle md:w-2xl text-sm md:text-base lg:text-lg h-[150px] mt-3 overflow-y-auto break-words">{project.info}</div>
        <div className="flex gap-5">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="lg:mt-4 inline-block text-xs md:text-lg px-3 md:px-9 py-2 md:py-3 rounded-full text-center bg-[#3B3B1F] text-[#FEC901] lg:bg-[#575749] lg:text-[#0D1B11] hover:bg-[#3B3B1F] hover:text-[#FEC901] transition-colors duration-300"
          >
            VISIT GitHub
          </a>

          {/* siteUrl이 있을 때만 VISIT SITE 버튼 렌더링 */}
          {project.siteUrl && (
            <a
              href={project.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="lg:mt-4 inline-block text-xs md:text-lg px-3 md:px-9 py-2 md:py-3 rounded-full text-center bg-[#3B3B1F] text-[#FEC901] lg:bg-[#575749] lg:text-[#0D1B11] hover:bg-[#3B3B1F] hover:text-[#FEC901] transition-colors duration-300"
            >
              VISIT SITE
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
