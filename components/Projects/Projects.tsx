"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // 프레이머 모션 임포트
import { Slideshow } from "./Slideshow";
import { HiMiniXMark } from "react-icons/hi2";
import Image from "next/image"; // next/image 임포트

const projects = [
  {
    id: 1,
    title: "Spotify Clone Coding",
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
      document.body.style.overflow = "hidden"; // 모달이 열리면 스크롤을 막음
    } else {
      document.body.style.overflow = "auto"; // 모달이 닫히면 스크롤을 다시 활성화
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
                className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 bg-white/30 ${activeCategory === category ? "text-[#FEC901]" : "text-[#16331F] hover:text-[#3C6C4F]"}`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-y-10  justify-items-center">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-[#102315] rounded-lg p-4 max-w-11/12">
                <h3 className="text-[28px] font-bold mb-2">{project.title}</h3>
                <span className="text-sm bg-white/20 text-white py-1 px-2 rounded-full">{project.type}</span>

                {/* next/image로 변경 */}
                {project.imageUrl && (
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    width={500} // 이미지를 렌더링할 크기 지정
                    height={300} // 이미지를 렌더링할 크기 지정
                    className="w-full rounded-lg my-4"
                    priority // 페이지 로딩 시 이미지 우선 로딩
                  />
                )}

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
              style={{ pointerEvents: "none" }}
            >
              <motion.div
                className="bg-[#0D1B11] p-[30px] rounded-lg w-[100%] max-w-lg text-[#FCF8F2] items-center flex flex-col gap-3"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.3 }}
                style={{
                  pointerEvents: "auto",
                  boxShadow: "rgba(255, 255, 255, 0.5) 1px -1px 25px 0px",
                }}
              >
                <button onClick={() => setShowModal(false)} className="text-3xl font-bold  text-white hover:text-[#FCF8F2] flex w-full justify-between items-end">
                  <div></div>
                  <div></div>
                  <HiMiniXMark />
                </button>
                <h3 className="text-3xl font-bold ">{selectedProject.title}</h3>
                <span className="text-sm bg-[#FCF8F2] text-[#0D1B11] py-1 px-7  mb-2 rounded-full">{selectedProject.type}</span>

                {/* ✅ 슬라이드쇼 삽입 */}
                {selectedProject.images && selectedProject.images.length > 0 && <Slideshow images={selectedProject.images} />}
                <div className="w-[460px] h-[100px] overflow-hidden break-words">1asdasdasdasdasd2asdasdasdasd3asdasdasdasd</div>

                <div className="flex gap-5">
                  <a
                    href={selectedProject.githubUrl} // ✅ 실제 GitHub 링크로 수정
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block bg-[#3B3B1F] text-[#FEC901] text-lg px-4 py-2 rounded text-center"
                  >
                    VISIT GitHub
                  </a>

                  <a
                    href={selectedProject.siteUrl} // ✅ 실제 GitHub 링크로 수정
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block bg-[#3B3B1F] text-[#FEC901] text-lg px-4 py-2 rounded text-center"
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
