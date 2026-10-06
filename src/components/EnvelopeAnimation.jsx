import React, { useState } from 'react';

export default function EnvelopeAnimation({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 450);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'absolute',
        left: '185px',
        top: '70px',
        width: '108px',
        height: '78px',
        zIndex: 25,
        cursor: 'pointer',
        transform: isOpening ? 'scale(1.1) translateY(-10px)' : 'scale(1)',
        opacity: isOpening ? 0 : 1,
        transition: 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease-out',
        animation: 'heartBeat 1.8s infinite ease-in-out',
      }}
      title="Click to open invitation"
    >
      <img
        src="/assets/envelope.png"
        alt="Romantic Garba invitation envelope"
        style={{
          width: '100%',
          height: '100%',
          imageRendering: 'pixelated',
          display: 'block',
        }}
      />
    </div>
  );
}
