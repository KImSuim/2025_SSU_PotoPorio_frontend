"use client";

export default function Video() {
  return (
    <video
      className="w-full h-full object-cover max-w-[600px] mx-auto sm:max-w-full"
      src="video.mp4" // public 폴더에 위치
      autoPlay
      muted
      loop
      playsInline
      style={{
        aspectRatio: "16/9",
        maxHeight: "100vh",
      }}
    />
  );
}
