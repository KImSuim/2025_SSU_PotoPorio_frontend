"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function YouTubeVisualizer({ shouldUnmute }: { shouldUnmute: boolean }) {
  const playerRef = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<any>(null);
  const [playing, setPlaying] = useState(false);
  const [bars, setBars] = useState<number[]>([5, 5, 5, 5, 5]);

  // YouTube API 로드
  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    (window as any).onYouTubeIframeAPIReady = () => {
      const ytPlayer = new (window as any).YT.Player(playerRef.current, {
        height: "0",
        width: "0",
        videoId: "jz_I0U5fjD8", // 음악 영상 ID
        playerVars: {
          autoplay: 1, // 자동재생
          mute: 1, // 음소거(브라우저 정책상 필요)
        },
        events: {
          onReady: () => {
            setPlayer(ytPlayer);
            ytPlayer.playVideo(); // 자동재생
          },
          onStateChange: (event: any) => {
            // 1: 재생 중, 2: 일시정지
            if (event.data === 1) setPlaying(true);
            if (event.data === 2) setPlaying(false);
          },
        },
      });
    };
  }, []);

  useEffect(() => {
    if (player && shouldUnmute) {
      player.unMute();
    }
  }, [player, shouldUnmute]);

  // 막대 애니메이션을 랜덤으로 변경
  useEffect(() => {
    let interval: number | undefined;

    if (playing) {
      interval = window.setInterval(() => {
        const newBars = Array.from({ length: 5 }, () => Math.floor(Math.random() * 5) + 2);
        setBars(newBars);
      }, 200);
    } else {
      setBars([2, 2, 2, 2, 2]);
    }

    return () => {
      if (interval !== undefined) {
        clearInterval(interval);
      }
    };
  }, [playing]);

  // 재생/정지 토글
  const togglePlay = () => {
    if (!player) return;

    if (!playing) {
      player.unMute(); // 소리 켜기
      player.playVideo();
      setPlaying(true);
    } else {
      player.unMute(); // 소리 켜기
      player.pauseVideo();
      setPlaying(false);
    }
  };

  return (
    <div className="flex flex-col items-center ">
      {/* 숨겨진 YouTube 플레이어 */}
      <div ref={playerRef} />

      {/* 시각화 막대 */}
      <button onClick={togglePlay} className={`px-4 py-2 rounded font-bold  text-white`}>
        <div className="flex gap-2 h-10 md:h-20 items-end w-15 md:w-20">
          {bars.map((value, idx) => (
            <motion.div key={idx} animate={{ scaleY: value / 10 }} transition={{ duration: 0.2 }} className="w-2 bg-green-400 rounded" style={{ height: "100%" }} />
          ))}
        </div>
      </button>
    </div>
  );
}
