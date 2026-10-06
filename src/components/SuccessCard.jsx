import React from 'react';
import { TEXT_CONTENT } from '../config';

export default function SuccessCard() {
  return (
    <div
      style={{
        position: 'absolute',
        left: '163px',
        top: '44px',
        width: '152px',
        height: '96px',
        zIndex: 30,
        backgroundColor: '#fcf8f2',
        border: '2px solid #387a74',
        borderRadius: '5px',
        boxShadow: '0 2px 0 #1b4b47, 0 3px 8px rgba(0,0,0,0.15)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6px 6px 7px 6px',
        imageRendering: 'pixelated',
        animation: 'fadeIn 0.4s ease-out',
      }}
    >
      {/* Corner Gold Pixel Accents */}
      <div style={{ position: 'absolute', top: '2.5px', left: '2.5px', width: '2px', height: '2px', backgroundColor: '#e2a843' }} />
      <div style={{ position: 'absolute', top: '2.5px', right: '2.5px', width: '2px', height: '2px', backgroundColor: '#e2a843' }} />
      <div style={{ position: 'absolute', bottom: '2.5px', left: '2.5px', width: '2px', height: '2px', backgroundColor: '#e2a843' }} />
      <div style={{ position: 'absolute', bottom: '2.5px', right: '2.5px', width: '2px', height: '2px', backgroundColor: '#e2a843' }} />

      {/* Top Heading */}
      <div
        style={{
          fontFamily: "'Pixelify Sans', monospace, sans-serif",
          fontSize: '5.5px',
          color: '#8b8b8b',
          letterSpacing: '0.2px',
          textAlign: 'center',
        }}
      >
        {TEXT_CONTENT.successHeading}
      </div>

      {/* Main Success Text */}
      <div
        style={{
          fontFamily: "'Pixelify Sans', monospace, sans-serif",
          fontSize: '8.5px',
          fontWeight: 700,
          color: '#397472',
          textAlign: 'center',
          lineHeight: '1.22',
        }}
      >
        <div>{TEXT_CONTENT.successLine1}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px' }}>
          <span>{TEXT_CONTENT.successLine2}</span>
        </div>
      </div>

      {/* Subtext: Lots of love and fun ahead */}
      <div
        style={{
          fontFamily: "'Pixelify Sans', monospace, sans-serif",
          fontSize: '5.5px',
          color: '#558782',
          letterSpacing: '0.2px',
          textAlign: 'center',
          fontWeight: 600,
        }}
      >
        {TEXT_CONTENT.successSub}
      </div>

      {/* DM Confirmation Notice Badge */}
      <div
        style={{
          backgroundColor: '#edf5f4',
          border: '1px solid #387a74',
          borderRadius: '3px',
          padding: '2px 5px',
          fontFamily: "'Pixelify Sans', monospace, sans-serif",
          fontSize: '4.8px',
          fontWeight: 600,
          color: '#285e59',
          textAlign: 'center',
          letterSpacing: '0.1px',
          boxShadow: '0 1px 0 rgba(40, 94, 89, 0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
        }}
      >
        <span>{TEXT_CONTENT.successDmNotice}</span>
      </div>
    </div>
  );
}
