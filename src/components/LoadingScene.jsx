import React, { useEffect, useRef, useState } from 'react';

export default function LoadingScene({ onComplete }) {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef(null);
  const completedRef = useRef(false);

  const handleFinish = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 280);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 1.0;
      video.play().catch(() => {
        // Autoplay policy or error fallback
      });
    }

    // Safety timeout in case video ends or delays
    const timer = setTimeout(() => {
      handleFinish();
    }, 1650);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#f5951d',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isFadingOut ? 0 : 1,
        transition: 'opacity 0.28s ease-out',
        pointerEvents: isFadingOut ? 'none' : 'auto',
        overflow: 'hidden',
      }}
    >
      <video
        ref={videoRef}
        src="/assets/loading_spiral.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleFinish}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          imageRendering: 'pixelated',
          display: 'block',
        }}
      />
    </div>
  );
}
