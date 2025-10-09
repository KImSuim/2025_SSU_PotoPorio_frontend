"use client";

import { useState, useEffect, useRef } from "react";
import { Project } from "../../types/Project";

interface ProjectCardProps {
  project: Project;
  onView: () => void;
}

export default function ProjectCard({ project, onView }: ProjectCardProps) {
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
