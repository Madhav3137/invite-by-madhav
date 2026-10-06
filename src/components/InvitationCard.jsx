import React from 'react';
import { TEXT_CONTENT } from '../config';

export default function InvitationCard({ onYes }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: '165px',
        top: '48px',
        width: '148px',
        height: '88px',
        zIndex: 30,
        backgroundColor: '#fcf8f2',
        border: '2px solid #387a74',
        borderRadius: '5px',
        boxShadow: '0 2px 0 #1b4b47, 0 3px 8px rgba(0,0,0,0.15)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '7px 8px 8px 8px',
        imageRendering: 'pixelated',
        animation: 'fadeIn 0.3s ease-out',
      }}
    >
      {/* Corner Gold Pixel Accents */}
      <div style={{ position: 'absolute', top: '2.5px', left: '2.5px', width: '2px', height: '2px', backgroundColor: '#e2a843' }} />
      <div style={{ position: 'absolute', top: '2.5px', right: '2.5px', width: '2px', height: '2px', backgroundColor: '#e2a843' }} />
      <div style={{ position: 'absolute', bottom: '2.5px', left: '2.5px', width: '2px', height: '2px', backgroundColor: '#e2a843' }} />
      <div style={{ position: 'absolute', bottom: '2.5px', right: '2.5px', width: '2px', height: '2px', backgroundColor: '#e2a843' }} />

      {/* Top Intro */}
      <div
        style={{
          fontFamily: "'Pixelify Sans', monospace, sans-serif",
          fontSize: '5.5px',
          color: '#c2923a',
          letterSpacing: '0.2px',
          textAlign: 'center',
        }}
      >
        {TEXT_CONTENT.questionIntro}
      </div>

      {/* Main Question */}
      <div
        style={{
          fontFamily: "'Pixelify Sans', monospace, sans-serif",
          fontSize: '8.5px',
          fontWeight: 700,
          color: '#397472',
          textAlign: 'center',
          lineHeight: '1.25',
          marginTop: '2px',
          marginBottom: '2px',
        }}
      >
        <div>{TEXT_CONTENT.questionLine1}</div>
        <div>{TEXT_CONTENT.questionLine2}</div>
      </div>

      {/* YES Button */}
      <button
        onClick={onYes}
        style={{
          width: '36px',
          height: '14px',
          backgroundColor: '#387a74',
          border: '1.5px solid #1c4945',
          borderRadius: '3px',
          color: '#ffffff',
          fontFamily: "'Pixelify Sans', monospace, sans-serif",
          fontSize: '6.5px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          boxShadow: '0 1.5px 0 #153835',
          cursor: 'pointer',
          transition: 'transform 0.1s ease, background-color 0.15s ease',
        }}
        onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.94) translateY(1px)'; }}
        onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#418b84'; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#387a74'; }}
        title="Yes!"
      >
        {TEXT_CONTENT.yesButton}
      </button>
    </div>
  );
}
