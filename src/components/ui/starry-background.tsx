"use client"

import React, { useRef, useEffect, useState, useMemo } from 'react';

interface StarryBackgroundProps {
  gridOpacity?: number;
  starsCount?: {
    primary?: number;
    secondary?: number;
    accent?: number;
    dust?: number;
  };
}

interface Star {
  id: string;
  size: string;
  top: string;
  left: string;
  opacity: number;
  animation: string;
}

export function StarryBackground({
  gridOpacity = 0.03,
  starsCount = {
    primary: 40,
    secondary: 30,
    accent: 20,
    dust: 20
  }
}: StarryBackgroundProps) {
  // Helper config for star types
  const starConfigs = [
    {
      type: 'primary',
      count: starsCount.primary ?? 0,
      className: 'bg-primary',
      size: () => Math.random() * 3 + 2,
      opacity: () => Math.random() * 0.5 + 0.2,
      animation: () => `twinkle ${Math.random() * 4 + 3}s ease-in-out infinite ${Math.random() * 5}s`,
    },
    {
      type: 'secondary',
      count: starsCount.secondary ?? 0,
      className: 'bg-secondary',
      size: () => Math.random() * 4 + 2,
      opacity: () => Math.random() * 0.5 + 0.2,
      animation: () => `twinkle ${Math.random() * 4 + 3}s ease-in-out infinite ${Math.random() * 5}s`,
    },
    {
      type: 'accent',
      count: starsCount.accent ?? 0,
      className: 'bg-accent',
      size: () => Math.random() * 3 + 2,
      opacity: () => Math.random() * 0.5 + 0.15,
      animation: () => `twinkle ${Math.random() * 4 + 3}s ease-in-out infinite ${Math.random() * 5}s`,
    },
    {
      type: 'dust',
      count: starsCount.dust ?? 0,
      className: 'bg-gradient-to-br from-primary/40 to-transparent',
      size: () => Math.random() * 10 + 5,
      opacity: () => Math.random() * 0.25 + 0.1,
      animation: () => `float-dust ${Math.random() * 20 + 30}s linear infinite ${Math.random() * 10}s`,
    },
  ];

  // useMemo to generate all stars only when counts change
  const stars = useMemo(() => {
    return starConfigs.flatMap(cfg =>
      Array.from({ length: cfg.count }, (_, i) => ({
        key: `${cfg.type}-${i}`,
        className: cfg.className,
        style: {
          width: cfg.size() + 'px',
          height: cfg.size() + 'px',
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: cfg.opacity(),
          animation: cfg.animation(),
        },
      }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [starsCount.primary, starsCount.secondary, starsCount.accent, starsCount.dust]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Grid lines for digital sandbox feel */}
      <div className="absolute inset-0" style={{ opacity: gridOpacity }}>
        {[...Array(20)].map((_, i) => (
          <div key={`h-${i}`} className="absolute left-0 right-0 h-px bg-primary" style={{top: `${i * 5}%`}}></div>
        ))}
        {[...Array(20)].map((_, i) => (
          <div key={`v-${i}`} className="absolute top-0 bottom-0 w-px bg-primary" style={{left: `${i * 5}%`}}></div>
        ))}
      </div>
      {/* All stars */}
      {stars.map(star => (
        <div key={star.key} className={`absolute rounded-full ${star.className}`} style={star.style} />
      ))}
      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
        @keyframes float-dust {
          0% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -20px) rotate(120deg); }
          66% { transform: translate(-20px, 40px) rotate(240deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
        @keyframes float {
          0% { transform: translate(0, 0); }
          50% { transform: translate(15px, -15px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes float-slow {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, -10px) rotate(5deg); }
          50% { transform: translate(15px, 5px) rotate(0deg); }
          75% { transform: translate(5px, 10px) rotate(-5deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        .animate-float { animation: float 20s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 15s ease-in-out infinite; }
        .animate-delay-1000 { animation-delay: 1s; }
        .animate-delay-1500 { animation-delay: 1.5s; }
        .animate-delay-2000 { animation-delay: 2s; }
        .animate-delay-2500 { animation-delay: 2.5s; }
        .animate-delay-3000 { animation-delay: 3s; }
        .animate-delay-3500 { animation-delay: 3.5s; }
        .animate-delay-4000 { animation-delay: 4s; }
        .neon-border { box-shadow: 0 0 5px #4361EE, 0 0 10px rgba(67, 97, 238, 0.5); }
        .neon-glow { text-shadow: 0 0 2px rgba(67, 97, 238, 0.7), 0 0 5px rgba(67, 97, 238, 0.5); }
      `}</style>
    </div>
  );
}