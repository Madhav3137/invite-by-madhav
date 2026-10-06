import React, { useEffect, useState } from 'react';
import { ANIMATION_CONFIG, TEXT_CONTENT } from '../config';

export default function InstagramOutro({ onReplay }) {
  const [phase, setPhase] = useState('initial'); // 'initial' -> 'gradient' -> 'soft_white'

  useEffect(() => {
    // Phase 1: White icon appears and scales in (0 - 600ms)
    // Phase 2: Sunset gradient blooms (600ms - 2600ms)
    const gradientTimer = setTimeout(() => {
      setPhase('gradient');
    }, 600);

    // Phase 3: Subtly fades toward white glow while handle remains visible (2600ms+)
    const whiteTimer = setTimeout(() => {
      setPhase('soft_white');
    }, ANIMATION_CONFIG.outroWhiteFadeDelay);

    return () => {
      clearTimeout(gradientTimer);
      clearTimeout(whiteTimer);
    };
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.74)',
        backdropFilter: 'blur(1.5px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeIn 0.7s ease-out forwards',
      }}
    >
      {/* Instagram Icon */}
      <div
        style={{
          width: '56px',
          height: '56px',
          animation: 'instagramPulse 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
          marginBottom: '14px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          viewBox="0 0 24 24"
          width="100%"
          height="100%"
          fill="none"
          stroke={phase === 'gradient' ? 'url(#igSunset)' : '#ffffff'}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transition: 'stroke 0.8s ease-in-out, filter 0.8s ease-in-out',
            filter: phase === 'gradient'
              ? 'drop-shadow(0 0 6px rgba(225, 48, 108, 0.6))'
              : phase === 'soft_white'
              ? 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))'
              : 'none',
          }}
        >
          <defs>
            <linearGradient id="igSunset" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#feda75" />
              <stop offset="25%" stopColor="#fa7e1e" />
              <stop offset="50%" stopColor="#d62976" />
              <stop offset="75%" stopColor="#962fbf" />
              <stop offset="100%" stopColor="#4f5bd5" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.8" />
        </svg>
      </div>

      {/* Social Handle */}
      <div
        style={{
          fontFamily: "'Bebas Neue', 'Oswald', sans-serif",
          fontSize: '16px',
          color: '#ffffff',
          letterSpacing: '1.2px',
          textAlign: 'center',
          animation: 'fadeIn 0.6s ease-out 0.3s both',
          textShadow: '0 2px 4px rgba(0,0,0,0.8)',
        }}
      >
        {TEXT_CONTENT.instagramHandle}
      </div>

      {/* Replay action */}
      <button
        onClick={onReplay}
        style={{
          marginTop: '16px',
          fontFamily: "'Pixelify Sans', monospace, sans-serif",
          fontSize: '6.5px',
          color: '#e2a843',
          backgroundColor: 'rgba(255, 255, 255, 0.12)',
          border: '1px solid #e2a843',
          borderRadius: '4px',
          padding: '3px 8px',
          cursor: 'pointer',
          animation: 'fadeIn 0.5s ease-out 1.2s both',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(226, 168, 67, 0.25)';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        ↺ REPLAY INVITATION
      </button>
    </div>
  );
}
