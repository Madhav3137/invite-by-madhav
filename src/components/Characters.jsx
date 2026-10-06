import React, { useEffect, useState } from 'react';
import { ANIMATION_CONFIG } from '../config';

export default function Characters({
  boyState = 'standing', // 'standing' | 'kneeling' | 'dancing'
  girlState = 'standing', // 'standing' | 'dancing'
}) {
  const [danceFrame, setDanceFrame] = useState(0);

  useEffect(() => {
    if (boyState === 'dancing' || girlState === 'dancing') {
      const interval = setInterval(() => {
        setDanceFrame((prev) => (prev === 0 ? 1 : 0));
      }, ANIMATION_CONFIG.danceFrameInterval);
      return () => clearInterval(interval);
    }
  }, [boyState, girlState]);

  return (
    <>
      {/* Boy Character */}
      <div
        style={{
          position: 'absolute',
          zIndex: 10,
          pointerEvents: 'none',
          imageRendering: 'pixelated',
          transition: 'all 0.25s cubic-bezier(0.18, 0.89, 0.32, 1.28)',
          ...(boyState === 'standing' && {
            left: '65px',
            top: '105px',
            width: '55px',
            height: '98px',
          }),
          ...(boyState === 'kneeling' && {
            left: '88px',
            top: '115px',
            width: '55px',
            height: '85px',
          }),
          ...(boyState === 'dancing' && {
            left: '63px',
            top: danceFrame === 0 ? '102px' : '98px',
            width: '70px',
            height: '95px',
            transform: danceFrame === 0 ? 'rotate(-2deg)' : 'rotate(3deg)',
          }),
        }}
      >
        {boyState === 'standing' && (
          <img
            src="/assets/boy_standing.png"
            alt="Boy standing"
            style={{ width: '100%', height: '100%', imageRendering: 'pixelated' }}
          />
        )}
        {boyState === 'kneeling' && (
          <img
            src="/assets/boy_kneeling.png"
            alt="Boy pleading"
            style={{ width: '100%', height: '100%', imageRendering: 'pixelated' }}
          />
        )}
        {boyState === 'dancing' && (
          <img
            src={danceFrame === 0 ? '/assets/boy_dancing_1.png' : '/assets/boy_dancing_2.png'}
            alt="Boy dancing"
            style={{ width: '100%', height: '100%', imageRendering: 'pixelated' }}
          />
        )}
      </div>

      {/* Girl Character */}
      <div
        style={{
          position: 'absolute',
          zIndex: 10,
          pointerEvents: 'none',
          imageRendering: 'pixelated',
          transition: 'transform 0.25s ease-in-out',
          ...(girlState === 'standing' && {
            left: '345px',
            top: '105px',
            width: '65px',
            height: '98px',
          }),
          ...(girlState === 'dancing' && {
            left: '340px',
            top: '105px',
            width: '70px',
            height: '98px',
            transform: danceFrame === 0 ? 'scale(1)' : 'scale(1.02) rotate(1deg)',
          }),
        }}
      >
        <img
          src={girlState === 'dancing' && danceFrame === 1 ? '/assets/girl_dancing.png' : '/assets/girl_standing.png'}
          alt="Girl in Garba lehenga"
          style={{ width: '100%', height: '100%', imageRendering: 'pixelated' }}
        />
      </div>
    </>
  );
}
