"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // 프레이머 모션 임포트
import { Slideshow } from "./Slideshow";
import { HiMiniXMark } from "react-icons/hi2";

const projects = [
  {
    id: 1,
    title: "Spotify Clone Coding",
    info: "Next.js와 TypeScript 학습 이후, 이를 직접 적용해보고자 Spotify 클론 코딩 프로젝트를 진행했습니다.",
    type: "Team Project",
    tags: ["Next.js", "TypeScript", "React", "Firebase", "Framer Motion"],
    imageUrl: "spotify-clone.png",
    images: [{ src: "spotify-clone.png" }, { src: "spotify-clone.png" }, { src: "spotify-clone.png" }],
    siteUrl: "https://team-spotify-zeta.vercel.app/",
    githubUrl: "https://github.com/Ori0li/TeamSpotify",
  },
  {
    id: 2,
    title: "2Spotify Clone Coding",
    info: "Next.js와 TypeScript 학습 이후, 이를 직접 적용해보고자 Spotify 클론 코딩 프로젝트를 진행했습니다.",
    type: "Side Project",
    tags: ["Next.js", "TypeScript", "React", "Firebase", "Framer Motion"],
    imageUrl: "pokemon.png",
    images: [{ src: "pokemon.png" }, { src: "spotify-clone.png" }],
    siteUrl: "https://asom0160.github.io/pokemon_JS_TeamProject/",
    githubUrl: "https://github.com/asom0160/pokemon_JS_TeamProject?tab=readme-ov-files",
  },

  {
    id: 3,
    title: "3Spotify Clone Coding",
    info: "Next.js와 TypeScript 학습 이후, 이를 직접 적용해보고자 Spotify 클론 코딩 프로젝트를 진행했습니다.",
    type: "Team Project",
    tags: ["Next.js", "TypeScript", "React", "Firebase", "Framer Motion"],
    imageUrl: "spotify-clone.png",
    images: [{ src: "spotify-clone.png" }, { src: "spotify-clone.png" }, { src: "spotify-clone.png" }],
    siteUrl: "https://team-spotify-zeta.vercel.app/",
    githubUrl: "https://github.com/Ori0li/TeamSpotify",
  },
  {
    id: 4,
    title: "4Spotify Clone Coding",
    info: "Next.js와 TypeScript 학습 이후, 이를 직접 적용해보고자 Spotify 클론 코딩 프로젝트를 진행했습니다.",
    type: "Side Project",
    tags: ["Next.js", "TypeScript", "React", "Firebase", "Framer Motion"],
    imageUrl: "spotify-clone.png",
    images: [{ src: "spotify-clone.png" }, { src: "pokemon.png" }],
    siteUrl: "https://asom0160.github.io/pokemon_JS_TeamProject/",
    githubUrl: "https://github.com/asom0160/pokemon_JS_TeamProject?tab=readme-ov-files",
  },
];

type Project = {
  id: number;
  title: string;
  info: string;
  type: string;
  tags: string[];
  imageUrl?: string;
  images: { src: string }[]; // ✅ images 속성 추가
  siteUrl: string;
  githubUrl: string;
};

const categories = ["All", "Team Project", "Side Project"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // 모달 상태에 따라 body의 스크롤 방지
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
      <div className="text-[#FCF8F2] text-2xl z-20 relative px-[200px] pt-[80px] pb-[240px] bg-[#16331F] flex flex-col gap-[15px]">
        <div className="text-[80px] text-center">Projects</div>
        <section className=" py-10  text-white">
          <div className="flex justify-center gap-6 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 text-lg bg-white/40 ${
                  activeCategory === category ? "text-[#FEC901]" : "text-[#16331F] hover:text-[#3C6C4F]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-y-10  justify-items-center">
            {/* {filteredProjects.map((project) => (
              <div key={project.id} className="bg-[#102315] rounded-lg p-4 max-w-11/12">
                <h3 className="text-[28px] font-bold mb-2">{project.title}</h3>
                <span className="text-sm bg-white/20 text-white py-1 px-2 rounded-full">{project.type}</span>

                <img src={project.imageUrl} alt={project.title} className="w-3xl rounded-lg my-4" />

                <div className="flex overflow-x-auto gap-2 scrollbar-hide mb-4">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="whitespace-nowrap bg-white/10 text-sm px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setSelectedProject(project);
                    setShowModal(true);
                  }}
                  className="w-full bg-[#3B3B1F] text-[#FEC901] font-bold py-2 rounded-lg"
                >
                  VIEW
                </button>
              </div>
            ))} */}
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-[#102315] rounded-lg p-4 max-w-11/12 relative group">
                {/* VIEW 버튼을 카드 맨 위에 배치 */}

                <h3 className="text-[28px] font-bold mb-3">{project.title}</h3>
                <span className="text-base bg-white/20 text-white py-1 px-4 rounded-full ">{project.type}</span>
                <img src={project.imageUrl} alt={project.title} className="w-3xl rounded-lg my-4" />
                <div className="flex overflow-x-auto gap-2 scrollbar-hide mb-4">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="whitespace-nowrap bg-white/10 text-base px-4 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setSelectedProject(project);
                    setShowModal(true);
                  }}
                  className="w-full bg-[#3B3B1F] text-[#FEC901] font-bold py-2 rounded-lg mb-4 z-20 relative"
                  // z-20, relative로 오버레이 위에 항상 보이게!
                >
                  VIEW
                </button>
                {/* 오버레이 info: 호버 시만 나타나고, VIEW 버튼은 항상 위에 보임 */}
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rounded-lg">
                  <div className="text-[#FEC901] text-lg px-8 py-6 text-center font-subtitle break-words">{project.info}</div>
                </div>
              </div>
            ))}
          </div>

          {/* 모달 애니메이션 */}
          {showModal && selectedProject && (
            <motion.div
              className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              // style={{ pointerEvents: "none" }}
            >
              <motion.div
                className="bg-[#0D1B11] p-[30px] rounded-lg w-[100%] max-w-3xl text-[#FCF8F2] items-center flex flex-col gap-3"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.3 }}
                style={{
                  // pointerEvents: "auto",
                  boxShadow: "rgba(255, 255, 255, 0.5) 1px -1px 25px 0px",
                }}
              >
                <button onClick={() => setShowModal(false)} className="font-bold  text-white hover:text-[#FCF8F2] flex w-full justify-between items-end">
                  <div></div>
                  <div></div>
                  <HiMiniXMark />
                </button>
                <h3 className="text-4xl font-bold mb-2 ">{selectedProject.title}</h3>
                <span className="text-lg bg-[#FCF8F2] text-[#0D1B11] py-1 px-7 mb-2 rounded-full">{selectedProject.type}</span>

                {/* ✅ 슬라이드쇼 삽입 */}
                {selectedProject.images && selectedProject.images.length > 0 && <Slideshow images={selectedProject.images} />}
                <div className="font-subtitle w-2xl text-lg h-[100px] mt-3 overflow-hidden break-words">{selectedProject.info}</div>

                <div className="flex gap-5">
                  <a
                    href={selectedProject.githubUrl} // ✅ 실제 GitHub 링크로 수정
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block bg-[#3B3B1F] text-[#FEC901] text-lg px-5 py-3 rounded-2xl text-center"
                  >
                    VISIT GitHub
                  </a>

                  <a
                    href={selectedProject.siteUrl} // ✅ 실제 GitHub 링크로 수정
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block bg-[#3B3B1F] text-[#FEC901] text-lg px-5 py-3 rounded-2xl text-center"
                  >
                    VISIT SITE
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </section>
      </div>
    </>
  );
}
