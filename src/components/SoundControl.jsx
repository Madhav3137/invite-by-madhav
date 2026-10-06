import React, { useEffect, useRef, useState } from 'react';

export default function SoundControl({ autoPlayTrigger }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.6;

    // Handle seamless infinite looping fallback
    const handleEnded = () => {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };
    audio.addEventListener('ended', handleEnded);

    const startAudio = () => {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay policy prevented immediate playback
        setIsPlaying(false);
      });
    };

    // Attempt start on autoPlayTrigger
    if (autoPlayTrigger) {
      startAudio();
    }

    // Also start on any first user interaction anywhere on the window
    const handleFirstInteraction = () => {
      if (audio.paused) {
        startAudio();
      }
    };

    window.addEventListener('click', handleFirstInteraction, { passive: true });
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true });
    window.addEventListener('keydown', handleFirstInteraction, { passive: true });

    return () => {
      audio.removeEventListener('ended', handleEnded);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [autoPlayTrigger]);

  const toggleSound = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '6px',
        right: '8px',
        zIndex: 60,
      }}
    >
      <audio
        ref={audioRef}
        src="/assets/garba_music.mp3"
        loop
        preload="auto"
      />
      <button
        onClick={toggleSound}
        style={{
          fontFamily: "'Pixelify Sans', monospace, sans-serif",
          fontSize: '6px',
          color: '#387a74',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid #387a74',
          borderRadius: '3px',
          padding: '2px 5px',
          display: 'flex',
          alignItems: 'center',
          gap: '3px',
          cursor: 'pointer',
          boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
        }}
        title={isPlaying ? 'Mute Music' : 'Play Music'}
      >
        <span>{isPlaying ? '🔊' : '🔇'}</span>
        <span>{isPlaying ? 'MUSIC ON' : 'MUSIC OFF'}</span>
      </button>
    </div>
  );
}
