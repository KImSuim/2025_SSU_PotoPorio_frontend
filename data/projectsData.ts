import { Project } from "../types/Project";

export const projects: Project[] = [
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
    title: "z_v-project",
    info: "대학교 2학년 때 동기들과 같이 진행한 프로젝트로, 동물병원 찾기 등과 관련된 웹사이트를 제작했습니다.",
    type: "Team Project",
    tags: ["React", "MySql", "Java Spring"],
    imageUrl: "/zv1.png",
    images: [{ src: "/zv1.png" }, { src: "/zv2.png" }, { src: "/zv3.png" }, { src: "/zv4.png" }, { src: "/zv5.png" }],
    githubUrl: "https://github.com/WAT-Bast/z-v-project",
  },
  {
    id: 5,
    title: "Kokoa Clone Coding",
    info: "대학교 1학년 때 동아리 활동을 통해 진행한 첫 번째 웹 개발 프로젝트로, HTML, CSS, JavaScript의 기초를 익히며 카카오톡 웹 버전을 클론 코딩했습니다. 웹 개발의 기본기를 다지는 것을 목표로, 시맨틱 HTML 구조 설계부터 CSS Flexbox와 Grid를 활용한 레이아웃 구성, JavaScript를 통한 기본적인 인터랙션까지 구현했습니다. 반응형 디자인 원칙을 적용하여 다양한 화면 크기에서도 일관된 사용자 경험을 제공하며, 실제 카카오톡의 UI/UX를 분석하고 재현하는 과정에서 디자인 시스템에 대한 이해도를 높였습니다. 비록 간단한 프로젝트였지만, 웹 개발의 전반적인 흐름을 이해하고 코딩 실력의 기초를 쌓을 수 있었던 의미있는 첫걸음이었습니다.",
    type: "Side Project",
    tags: ["HTML", "CSS", "JavaScript"],
    imageUrl: "/kokoa1.png",
    images: [{ src: "/kokoa1.png" }, { src: "/kokoa2.png" }],
    githubUrl: "https://github.com/KImSuim/kokoa-clone",
  },
];

export const categories = ["All", "Team Project", "Side Project"];
