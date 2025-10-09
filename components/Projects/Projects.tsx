"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Slideshow } from "./Slideshow";
import { HiMiniXMark } from "react-icons/hi2";

const projects = [
  {
    id: 1,
    title: "Spotify Clone Coding",
    info: "Next.js와 TypeScript를 기반으로 제작한 Spotify 클론 프로젝트입니다. 실제 서비스처럼 직관적인 UI/UX를 구현하고, Framer Motion을 활용한 애니메이션과 반응형 디자인으로 어떤 디바이스에서든 뛰어난 사용자 경험을 제공합니다.TypeScript의 타입 시스템과 컴포넌트 기반 설계를 통해 코드의 재사용성과 유지보수성을 높였습니다. 아티스트 검색, 앨범 조회 등 핵심 기능을 갖춘 이 프로젝트는 단순한 클론을 넘어, 사용자 경험과 코드 효율성까지 깊이 고민한 결과물입니다.",
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
    info: "대학교 1학년 때 동아리 활동을 통해 진행한 첫 번째 웹 개발 프로젝트로, HTML, CSS, JavaScript의 기초를 익히며 카카오톡 웹 버전을 클론 코딩했습니다. 웹 개발의 기본기를 다지는 것을 목표로, 시맨틱 HTML 구조 설계부터 CSS Flexbox와 Grid를 활용한 레이아웃 구성, JavaScript를 통한 기본적인 인터랙션까지 구현했습니다. 반응형 디자인 원칙을 적용하여 다양한 화면 크기에서도 일관된 사용자 경험을 제공하며, 실제 카카오톡의 UI/UX를 분석하고 재현하는 과정에서 디자인 시스템에 대한 이해도를 높였습니다. 비록 간단한 프로젝트였지만, 웹 개발의 전반적인 흐름을 이해하고 코딩 실력의 기초를 쌓을 수 있었던 의미있는 첫걸음이었습니다.",
    type: "Side Project",
    tags: ["Html", "CSS", "JavaScript"],
    imageUrl: "/kokoa1.png",
    images: [{ src: "/kokoa1.png" }, { src: "/kokoa2.png" }],
    githubUrl: "https://github.com/KImSuim/kokoa-clone",
  },
  {
    id: 3,
    title: "Vita 헌혈 웹 코딩",
    info: "대학교 3학년 졸업작품으로 혈액 부족 문제와 지정 헌혈자를 찾기 어려운 현실적 어려움을 해결하기 위해 개발한 웹 서비스 프로젝트입니다. 헌혈 요청자와 참여자를 연결하는 플랫폼을 제공하여, 누구나 쉽게 헌혈 참여 및 요청을 할 수 있도록 했습니다. 또한 헌혈, 봉사, 기부 활동 이력을 한눈에 볼 수 있는 직관적인 인터페이스를 구현하여 사용자의 접근성과 편의성을 극대화했습니다. Java Spring과 React를 활용한 풀스택 개발로 안정적이고 효율적인 서비스를 구축하였으며, MySQL 데이터베이스를 통해 사용자 정보와 활동 이력을 체계적으로 관리합니다. 이 프로젝트는 단순한 웹사이트를 넘어 사회적 가치 창출을 목표로 한 의미있는 졸업작품입니다.",
    type: "Team Project",
    tags: ["Java", "React", "Spring", "Data JPA", "Figma", "MySQL"],
    imageUrl: "/vita1.png",
    images: [{ src: "/vita1.png" }, { src: "/vita2.png" }, { src: "/vita3.png" }, { src: "/vita4.png" }],
    githubUrl: "https://github.com/BC-VITA",
  },
  {
    id: 4,
    title: "Todolist",
    info: "TypeScript와 Zustand를 활용하여 제작한 현대적인 투두리스트 웹 애플리케이션입니다. 기존의 단순한 할 일 관리를 넘어서, 직관적인 사용자 경험과 효율적인 상태 관리에 중점을 두고 개발했습니다. Zustand의 경량화된 상태 관리 라이브러리를 통해 복잡한 보일러플레이트 없이도 깔끔한 코드 구조를 유지했으며, TypeScript의 강력한 타입 시스템으로 런타임 에러를 사전에 방지했습니다. Framer Motion을 활용한 부드러운 애니메이션과 Tailwind CSS의 유틸리티 퍼스트 접근법으로 반응형 디자인을 구현하여, 데스크톱과 모바일 환경 모두에서 최적화된 사용자 경험을 제공합니다. 할 일 추가, 수정, 삭제, 완료 처리 등의 핵심 기능과 함께 로컬 스토리지를 활용한 데이터 지속성까지 고려한 실용적인 프로젝트입니다.",
    type: "Side Project",
    tags: ["TypeScript", "React", "Framer Motion", "Tailwind CSS", "Zustand"],
    imageUrl: "/ToDo1.png",
    images: [{ src: "/ToDo1.png" }],
    siteUrl: "https://ts-todolist-theta.vercel.app/",
    githubUrl: "https://github.com/KImSuim/ts_todolist",
  },
  {
    id: 5,
    title: "z_v-project",
    info: "대학교 2학년 때 동기들과 같이 진행한 프로젝트로, 동물병원 찾기 등과 관련된 웹사이트를 제작했습니다.",
    type: "Team Project",
    tags: ["React", "MySql", "Java Spring"],
    imageUrl: "/zv1.png",
    images: [{ src: "/zv1.png" }, { src: "/zv2.png" }, { src: "/zv3.png" }, { src: "/zv4.png" }, { src: "/zv5.png" }],
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
  siteUrl?: string;
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
                <div className="font-subtitle md:w-2xl text-sm md:text-base lg:text-lg h-[100px] mt-3 overflow-y-auto break-words">{selectedProject.info}</div>
                <div className="flex gap-5">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lg:mt-4 inline-block text-xs md:text-lg px-3 md:px-9 py-2 md:py-3 rounded-full text-center bg-[#3B3B1F] text-[#FEC901] lg:bg-[#575749] lg:text-[#0D1B11] hover:bg-[#3B3B1F] hover:text-[#FEC901] transition-colors duration-300"
                  >
                    VISIT GitHub
                  </a>

                  {/* siteUrl이 있을 때만 VISIT SITE 버튼 렌더링 */}
                  {selectedProject.siteUrl && (
                    <a
                      href={selectedProject.siteUrl}
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
          )}
        </section>
      </div>
    </>
  );
}
