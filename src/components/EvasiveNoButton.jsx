import React, { useState, useCallback, useRef } from 'react';
import { NO_SAFE_POSITIONS, ANIMATION_CONFIG } from '../config';

export default function EvasiveNoButton({ onDodge, dodgeCount }) {
  const [positionIndex, setPositionIndex] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const lastDodgeTime = useRef(0);

  const handleEvade = useCallback(() => {
    const now = Date.now();
    if (now - lastDodgeTime.current < 150) return; // Debounce rapid consecutive fires
    lastDodgeTime.current = now;

    setIsJumping(true);
    setPositionIndex((prev) => (prev + 1) % NO_SAFE_POSITIONS.length);
    onDodge();

    setTimeout(() => {
      setIsJumping(false);
    }, 180);
  }, [onDodge]);

  const currentPos = NO_SAFE_POSITIONS[positionIndex];

  return (
    <div
      onMouseEnter={handleEvade}
      onMouseMove={handleEvade}
      onTouchStart={handleEvade}
      onClick={handleEvade}
      style={{
        position: 'absolute',
        left: `${currentPos.x - 14}px`,
        top: `${currentPos.y - 14}px`,
        width: '54px',
        height: '42px',
        zIndex: 35,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'left 0.16s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.16s cubic-bezier(0.34, 1.56, 0.64, 1)',
        imageRendering: 'pixelated',
      }}
    >
      <button
        style={{
          width: '26px',
          height: '14px',
          backgroundColor: '#fae8eb',
          border: '1.5px solid #387a74',
          borderRadius: '3px',
          color: '#387a74',
          fontFamily: "'Pixelify Sans', monospace, sans-serif",
          fontSize: '6.5px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          boxShadow: '0 1.5px 0 #285854',
          cursor: 'pointer',
          transform: isJumping ? 'scale(1.18)' : 'scale(1)',
          transition: 'transform 0.14s ease-out',
          imageRendering: 'pixelated',
          pointerEvents: 'none', // parent div catches proximity
        }}
        title="No"
      >
        NO
      </button>
    </div>
  );
}
