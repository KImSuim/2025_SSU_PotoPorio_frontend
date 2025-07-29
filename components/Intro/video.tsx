// "use client";

// export default function Video() {
//   return (
//     <video
//       className="absolute top-0 left-0 w-full h-full object-cover z-0 y-[711px]"
//       src="video.mp4" // public 폴더에 있는 비디오 경로
//       autoPlay
//       muted
//       loop
//       playsInline
//     />
//   );
// }

"use client";

export default function Video() {
  return (
    <video
      className="w-full h-full object-cover"
      src="video.mp4" // public 폴더에 위치
      autoPlay
      muted
      loop
      playsInline
    />
  );
}
