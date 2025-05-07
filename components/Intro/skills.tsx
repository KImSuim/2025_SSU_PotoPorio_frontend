// "use client";

// import { useEffect, useRef, useState } from "react";
// import { motion, useAnimation } from "framer-motion";

// export default function Skills() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const controls = useAnimation();

//   useEffect(() => {
//     if (containerRef.current) {
//       const width = containerRef.current.scrollWidth / 2;
//       controls.start({
//         x: -width,
//         transition: {
//           repeat: Infinity,
//           repeatType: "loop",
//           duration: 12,
//           ease: "linear",
//         },
//       });
//     }
//   }, []);

//   const items = ["HTML & CSS", "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "NestJS", "SpringBoot"];

//   return (
//     <>
//       <div
//         className="relative w-full overflow-hidden py-21 "
//         style={{
//           background: "radial-gradient(circle, rgba(19, 39, 25, 0) 80%, rgba(10, 20, 13, 0.6) 95%, rgba(12, 25, 16, 1) 100%)",
//         }}
//       >
//         <div
//           className="absolute inset-0 z-20 pointer-events-none"
//           style={{
//             background: "radial-gradient(circle, rgba(19, 39, 25, 0) 69%, rgba(10, 20, 13, 0.6) 88%, rgba(12, 25, 16, 1) 100%)",
//           }}
//         />
//         <motion.div ref={containerRef} animate={controls} className="flex whitespace-nowrap">
//           {[...Array(2)].map((_, idx) => (
//             <div key={idx} className="flex">
//               {items.map((item, index) => (
//                 <div key={index} className="text-white text-7xl font-bold mx-12 drop-shadow-lg">
//                   {item}
//                 </div>
//               ))}
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     </>
//   );
// }
"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.scrollWidth / 2;
      controls.start({
        x: -width,
        transition: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 12,
          ease: "linear",
        },
      });
    }
  }, []);

  const items = ["HTML & CSS", "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "NestJS", "SpringBoot"];

  return (
    <div
      className="relative w-full overflow-hidden py-18 "
      style={{
        background: "radial-gradient(circle, rgba(19, 39, 25, 0) 80%, rgba(10, 20, 13, 0.6) 95%, rgba(12, 25, 16, 1) 100%)",
      }}
    >
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(19, 39, 25, 0) 69%, rgba(10, 20, 13, 0.6) 88%, rgba(12, 25, 16, 1) 100%)",
        }}
      />
      <motion.div ref={containerRef} animate={controls} className="flex whitespace-nowrap">
        {[...Array(2)].map((_, idx) => (
          <div key={idx} className="flex">
            {items.map((item, index) => (
              <div key={index} className="text-white text-7xl font-bold mx-12 drop-shadow-lg">
                {item}
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
