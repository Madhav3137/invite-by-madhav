import React, { useEffect, useState } from 'react';
import { ANIMATION_CONFIG } from '../config';

const SPIRAL_FRAMES = [
  '/assets/spiral/spiral_0.00.png',
  '/assets/spiral/spiral_0.10.png',
  '/assets/spiral/spiral_0.20.png',
  '/assets/spiral/spiral_0.30.png',
  '/assets/spiral/spiral_0.40.png',
  '/assets/spiral/spiral_0.50.png',
  '/assets/spiral/spiral_0.60.png',
  '/assets/spiral/spiral_0.70.png',
  '/assets/spiral/spiral_0.80.png',
  '/assets/spiral/spiral_0.90.png',
  '/assets/spiral/spiral_1.00.png',
  '/assets/spiral/spiral_1.10.png',
  '/assets/spiral/spiral_1.20.png',
  '/assets/spiral/spiral_1.30.png',
  '/assets/spiral/spiral_1.40.png',
  '/assets/spiral/spiral_1.50.png',
  '/assets/spiral/spiral_1.60.png',
];

export default function LoadingScene({ onComplete }) {
  const [frameIndex, setFrameIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Preload frames for smooth playback
    SPIRAL_FRAMES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const intervalTime = Math.floor(ANIMATION_CONFIG.loadingDuration / SPIRAL_FRAMES.length);
    const timer = setInterval(() => {
      setFrameIndex((prev) => {
        if (prev < SPIRAL_FRAMES.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setIsFadingOut(true);
          setTimeout(() => {
            onComplete();
          }, 300);
          return prev;
        }
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

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
        transition: 'opacity 0.35s ease-out',
        pointerEvents: isFadingOut ? 'none' : 'auto',
      }}
    >
      <img
        src={SPIRAL_FRAMES[frameIndex]}
        alt="Garba garland loading"
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
