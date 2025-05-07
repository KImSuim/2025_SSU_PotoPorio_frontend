"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

type Image = {
  src: string;
};

export const Slideshow = ({ images }: { images: Image[] }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoSlide = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
  }, [images.length]);

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoSlide]);

  const goToNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % images.length);
    startAutoSlide();
  };

  const goToPrevious = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + images.length) % images.length);
    startAutoSlide();
  };

  if (images.length === 0) return null;

  return (
    <div className="w-full h-auto flex justify-center items-center relative">
      <div className="relative w-[500px] h-[300px] overflow-hidden rounded-lg">
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={images[index].src}
            alt={`슬라이드 ${index}`}
            className="absolute w-full h-full object-cover rounded-lg"
            initial={{ x: direction === 1 ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction === 1 ? -300 : 300, opacity: 0 }}
            transition={{ duration: 0.7 }}
          />
        </AnimatePresence>
      </div>

      <button onClick={goToPrevious} className="absolute left-6 top-1/2 transform -translate-y-1/2 text-[#FEC901]">
        <FaArrowAltCircleLeft />
      </button>
      <button onClick={goToNext} className="absolute right-6 top-1/2 transform -translate-y-1/2 text-[#FEC901]">
        <FaArrowAltCircleRight />
      </button>
    </div>
  );
};
