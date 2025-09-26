// Loader.tsx
"use client";

import { useEffect, useState } from "react";
import TitleAnimation from "./TitleAnimation";
import YearAnimation from "./YearAnimation";
import MainScreen from "../Intro/MainScreen";

interface LoaderProps {
  onFinish: () => void;
}

export default function Loader({ onFinish }: LoaderProps) {
  const [year, setYear] = useState(2021);

  useEffect(() => {
    if (year < 2025) {
      const interval = setInterval(() => {
        setYear((prev) => prev + 1);
      }, 200);
      return () => clearInterval(interval);
    } else {
      const timeout = setTimeout(() => {
        onFinish(); // 로딩 끝났다고 알림
      }, 900);
      return () => clearTimeout(timeout);
    }
  }, [year, onFinish]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#f9f5ef] overflow-hidden">
      <TitleAnimation />
      <YearAnimation year={year} loadingDone={false} />
    </div>
  );
}
