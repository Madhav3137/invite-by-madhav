import React, { useState, useEffect, useRef, useCallback } from 'react';
import LoadingScene from './LoadingScene';
import Characters from './Characters';
import EnvelopeAnimation from './EnvelopeAnimation';
import InvitationCard from './InvitationCard';
import EvasiveNoButton from './EvasiveNoButton';
import SuccessCard from './SuccessCard';
import SoundControl from './SoundControl';
import { ANIMATION_CONFIG, APP_STATES } from '../config';

const SCENE_WIDTH = 478;
const SCENE_HEIGHT = 214;

export default function GarbaScene() {
  const [appState, setAppState] = useState(APP_STATES.LOADING);
  const [boyState, setBoyState] = useState('standing'); // 'standing' | 'kneeling' | 'dancing'
  const [girlState, setGirlState] = useState('standing'); // 'standing' | 'dancing'
  const [dodgeCount, setDodgeCount] = useState(0);
  const [musicTrigger, setMusicTrigger] = useState(false);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [manualOverride, setManualOverride] = useState(null); // null | 0 | 90
  const containerRef = useRef(null);

  // Responsive scale and landscape orientation calculation
  useEffect(() => {
    const handleResize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const mobileDevice = Math.min(vw, vh) <= 768;
      const isPortrait = vh > vw;
      setIsMobile(mobileDevice);

      // Determine rotation:
      // If manual override is active, use it; otherwise, on mobile portrait, force landscape (90deg)
      let currentRotation = 0;
      if (manualOverride !== null) {
        currentRotation = manualOverride;
      } else if (mobileDevice && isPortrait) {
        currentRotation = 90;
      } else {
        currentRotation = 0;
      }
      setRotation(currentRotation);

      // Calculate scale depending on rotation
      if (currentRotation === 90 || currentRotation === 270) {
        // Rotated: width occupies vh, height occupies vw
        const scaleX = (vh * 0.95) / SCENE_WIDTH;
        const scaleY = (vw * 0.95) / SCENE_HEIGHT;
        const newScale = Math.min(scaleX, scaleY);
        setScale(Math.max(0.6, newScale));
      } else {
        // Upright: standard scale
        const scaleX = (vw * 0.96) / SCENE_WIDTH;
        const scaleY = (vh * 0.88) / SCENE_HEIGHT;
        const newScale = Math.min(scaleX, scaleY);
        setScale(Math.max(0.6, newScale));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [manualOverride]);

  // Attempt screen orientation lock on user interaction if supported
  const tryLockOrientation = useCallback(() => {
    if (window.screen && window.screen.orientation && window.screen.orientation.lock) {
      window.screen.orientation.lock('landscape').catch(() => {});
    }
  }, []);

  const toggleManualRotation = (e) => {
    e.stopPropagation();
    setManualOverride((prev) => (prev === 90 ? 0 : 90));
  };

  // Flow Step 1: Loading completes -> Reveal Garba Scene
  const handleLoadingComplete = useCallback(() => {
    setAppState(APP_STATES.REVEAL);
    setMusicTrigger(true);
    tryLockOrientation();

    // After reveal settle duration (~900ms), show Envelope
    setTimeout(() => {
      setAppState(APP_STATES.ENVELOPE);
    }, ANIMATION_CONFIG.revealSettleDuration);
  }, [tryLockOrientation]);

  // Flow Step 2: Envelope opened -> Show Question Card
  const handleEnvelopeOpen = useCallback(() => {
    setAppState(APP_STATES.QUESTION);
    tryLockOrientation();
  }, [tryLockOrientation]);

  // Flow Step 3: NO button dodged -> Track count & update Boy to Kneeling/Pleading
  const handleNoDodge = useCallback(() => {
    setDodgeCount((prev) => {
      const nextCount = prev + 1;
      if (nextCount >= ANIMATION_CONFIG.dodgesToKneel && boyState === 'standing') {
        setBoyState('kneeling');
      }
      return nextCount;
    });
  }, [boyState]);

  // Flow Step 4: YES clicked -> Success & Dance celebration
  const handleYesClick = useCallback(() => {
    setAppState(APP_STATES.SUCCESS);

    // After a brief pause, boy transitions into Garba celebratory dance!
    setTimeout(() => {
      setBoyState('dancing');
      setGirlState('dancing');
    }, ANIMATION_CONFIG.danceStartDelay);
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0a0a0d',
        overflow: 'hidden',
        position: 'relative',
        touchAction: 'none',
      }}
    >
      {/* Mobile Orientation Toggle Hint */}
      {isMobile && (
        <button
          onClick={toggleManualRotation}
          style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            zIndex: 100,
            fontFamily: "'Pixelify Sans', monospace, sans-serif",
            fontSize: '6.5px',
            color: '#f7e1b8',
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            border: '1px solid rgba(247, 225, 184, 0.4)',
            borderRadius: '4px',
            padding: '3px 6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
          }}
          title="Toggle Landscape/Portrait"
        >
          <span>↻</span>
          <span>{rotation === 90 ? 'PORTRAIT' : 'LANDSCAPE'}</span>
        </button>
      )}

      {/* Main Pixel-Art Scene Wrapper with proportional scaling and landscape orientation */}
      <div
        ref={containerRef}
        style={{
          width: `${SCENE_WIDTH}px`,
          height: `${SCENE_HEIGHT}px`,
          position: 'relative',
          transform: `rotate(${rotation}deg) scale(${scale})`,
          transformOrigin: 'center center',
          transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
          imageRendering: 'pixelated',
          overflow: 'hidden',
          backgroundColor: '#f7e1b8',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        }}
      >
        {/* Background Garba Festive Pattern */}
        <img
          src="/assets/garba_bg.png"
          alt="Garba Festive Rangoli Background"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            imageRendering: 'pixelated',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        {/* Music toggle button */}
        <SoundControl autoPlayTrigger={musicTrigger} />

        {/* Pixel Art Characters (Boy & Girl) */}
        {appState !== APP_STATES.LOADING && (
          <Characters boyState={boyState} girlState={girlState} />
        )}

        {/* Step 1: Initial Floral Garland Spiral Loading */}
        {appState === APP_STATES.LOADING && (
          <LoadingScene onComplete={handleLoadingComplete} />
        )}

        {/* Step 2: Red Envelope Interaction */}
        {appState === APP_STATES.ENVELOPE && (
          <EnvelopeAnimation onOpen={handleEnvelopeOpen} />
        )}

        {/* Step 3: Question Invitation Card & Evasive NO button */}
        {appState === APP_STATES.QUESTION && (
          <>
            <InvitationCard onYes={handleYesClick} />
            <EvasiveNoButton onDodge={handleNoDodge} dodgeCount={dodgeCount} />
          </>
        )}

        {/* Step 4: Success State Card */}
        {appState === APP_STATES.SUCCESS && (
          <SuccessCard />
        )}
      </div>
    </div>
  );
}
