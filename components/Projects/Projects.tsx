"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Slideshow } from "./Slideshow";
import { HiMiniXMark } from "react-icons/hi2";

const projects = [
  {
    id: 1,
    title: "Spotify Clone Coding",
    info: "Next.js와 TypeScript 학습 이후, 이를 직접 적용해보고자 Spotify 클론 코딩 프로젝트를 진행했습니다.",
    type: "Team Project",
    tags: ["Next.js", "TypeScript", "React", "Firebase", "Framer Motion"],
    imageUrl: "/Spotify1.png",
    images: [{ src: "/Spotify1.png" }, { src: "/Spotify2.png" }, { src: "/Spotify3.png" }],
    siteUrl: "https://team-spotify-zeta.vercel.app/",
    githubUrl: "https://github.com/Ori0li/TeamSpotify",
  },
  {
    id: 2,
    title: "Kokoa Clone Coding",
    info: "대학교 1학년 때 동아리를 통해 진행한 프로젝트로, HTML, CSS, JavaScript를 활용하여 카카오 홈페이지를 클론 코딩했습니다.",
    type: "Side Project",
    tags: ["Html", "CSS", "JavaScript"],
    imageUrl: "/kokoa1.png",
    images: [{ src: "/kokoa1.png" }, { src: "/kokoa2.png" }],
    siteUrl: "https://asom0160.github.io/pokemon_JS_TeamProject/",
    githubUrl: "https://github.com/KImSuim/kokoa-clone",
  },
  {
    id: 3,
    title: "Vita 헌혈 웹 코딩",
    info: "대학교 3학년 졸업작품으로 지정헌혈이 없는 헌혈자를 위한 웹 서비스를 개발했습니다.",
    type: "Team Project",
    tags: ["React", "MySql", "Java Spring"],
    imageUrl: "/vita1.png",
    images: [{ src: "/vita1.png" }, { src: "/vita2.png" }, { src: "/vita3.png" }, { src: "/vita4.png" }],
    siteUrl: "https://team-spotify-zeta.vercel.app/",
    githubUrl: "https://github.com/BC-VITA",
  },
  {
    id: 4,
    title: "Todolist",
    info: "Next.js와 TypeScript를 활용하여 간단한 투두리스트 웹 애플리케이션을 제작했습니다.",
    type: "Side Project",
    tags: ["Next.js", "TypeScript", "React", "Firebase", "Framer Motion"],
    imageUrl: "/todolist.png",
    images: [{ src: "/todolist.png" }, { src: "/todolist2.png" }],
    siteUrl: "https://asom0160.github.io/pokemon_JS_TeamProject/",
    githubUrl: "https://github.com/asom0160/pokemon_JS_TeamProject?tab=readme-ov-files",
  },
  {
    id: 5,
    title: "z_v-project",
    info: "대학교 2학년 때 동기들과 같이 진행한 프로젝트로, 동물병원 찾기 등과 관련된 웹사이트를 제작했습니다.",
    type: "Team Project",
    tags: ["React", "MySql", "Java Spring"],
    imageUrl: "/z_v.png",
    images: [{ src: "/z_v.png" }, { src: "/z_v2.png" }, { src: "/z_v3.png" }, { src: "/z_v4.png" }],
    siteUrl: "https://team-spotify-zeta.vercel.app/",
    githubUrl: "https://github.com/WAT-Bast/z-v-project",
  },
];

type Project = {
  id: number;
  title: string;
  info: string;
  type: string;
  tags: string[];
  imageUrl?: string;
  images: { src: string }[];
  siteUrl: string;
  githubUrl: string;
};

const categories = ["All", "Team Project", "Side Project"];

// 박스 너비에 따라 폰트 크기 자동 조절 카드 컴포넌트
function ProjectCard({ project, onView }: { project: Project; onView: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [fontSizeH3, setFontSizeH3] = useState(20);
  const [fontSizeSpan, setFontSizeSpan] = useState(20);

  useEffect(() => {
    const handleResize = () => {
      if (cardRef.current) {
        const width = cardRef.current.offsetWidth;
        // 300px~450px 사이에서 18~28px로 폰트 크기 조절
        const sizeH3 = Math.max(18, Math.min(23, width / 15));
        const sizeSpan = Math.max(15, Math.min(15, width / 15));
        setFontSizeH3(sizeH3);
        setFontSizeSpan(sizeSpan);
      }
    };
    handleResize();
    const observer = new window.ResizeObserver(handleResize);
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={cardRef} className="bg-[#102315] rounded-lg p-4 w-full max-w-[95vw] sm:max-w-[400px] md:max-w-[400px] lg:max-w-[450px] relative group">
      <h3 className="font-bold mb-2" style={{ fontSize: fontSizeH3 }}>
        {project.title}
      </h3>
      <span className="text-base bg-white/20 text-white py-[3px] px-4 rounded-full" style={{ fontSize: fontSizeSpan }}>
        {project.type}
      </span>
      <img src={project.imageUrl} alt={project.title} className="w-3xl rounded-lg my-5" />
      <div className="flex overflow-x-auto gap-2 scrollbar-hide mb-4">
        {project.tags.map((tag, i) => (
          <span key={i} className="whitespace-nowrap bg-white/10 text-[13px] px-4 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <button
        onClick={onView}
        className="text-[23px] tracking-wider w-full font-bold py-1.5 rounded-lg mb-4 z-20 relative transition-colors bg-[#3B3B1F] text-[#FEC901] lg:bg-[#575749] lg:text-[#0D1B11] group-hover:bg-[#3B3B1F] group-hover:text-[#FEC901] duration-400"
      >
        VIEW
      </button>
    </div>
  );
}

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
        <div className="text-[48px] sm:text-[60px] md:text-[65px] lg:text-[80px] text-center">Projects</div>
        <section className=" py-4 text-white">
          <div className="flex justify-center gap-4 lg:gap-6 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 sm:px-6 py-2 rounded-full font-semibold transition-colors duration-200 text-[15px] sm:text-lg  leading-4 bg-white/40 ${
                  activeCategory === category ? "text-[#FEC901]" : "text-[#16331F] hover:text-[#3C6C4F]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onView={() => {
                  setSelectedProject(project);
                  setShowModal(true);
                }}
              />
            ))}
          </div>

          {/* 모달 애니메이션 */}
          {showModal && selectedProject && (
            <motion.div
              className="px-10 fixed inset-0 bg-black/50 flex justify-center items-center z-50 backdrop-blur-sm"
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
                <button onClick={() => setShowModal(false)} className="font-bold text-white hover:text-[#FCF8F2] flex w-full justify-between items-center mt-2 mb-1">
                  <div></div>
                  <h3 className="text-xl md:text-3xl lg:text-4xl font-bold lg:mb-2 ">{selectedProject.title}</h3>
                  <HiMiniXMark size={25} className="lg:hover:drop-shadow-[0_0_5px_white] transition-all duration-200" />
                </button>
                <span className="text-sm md:text-base md:mb-1 bg-[#FCF8F285] text-[#0D1B11] py-1 px-5 md-1 lg:mb-2 rounded-full">{selectedProject.type}</span>
                {selectedProject.images && selectedProject.images.length > 0 && <Slideshow images={selectedProject.images} />}
                <div className="font-subtitle md:w-2xl text-sm md:text-base lg:text-lg h-[100px] mt-3 overflow-hidden break-words">{selectedProject.info}</div>
                <div className="flex gap-5">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lg:mt-4 inline-block text-xs md:text-lg px-3 md:px-9 py-2 md:py-3 rounded-full text-center bg-[#3B3B1F] text-[#FEC901] lg:bg-[#575749] lg:text-[#0D1B11] hover:bg-[#3B3B1F] hover:text-[#FEC901] transition-colors duration-300"
                  >
                    VISIT GitHub
                  </a>
                  <a
                    href={selectedProject.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lg:mt-4 inline-block text-xs md:text-lg px-3 md:px-9 py-2 md:py-3 rounded-full text-center bg-[#3B3B1F] text-[#FEC901] lg:bg-[#575749] lg:text-[#0D1B11] hover:bg-[#3B3B1F] hover:text-[#FEC901] transition-colors duration-300"
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
