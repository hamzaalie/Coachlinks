import React from 'react';

interface CoachLinksLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function CoachLinksLogo({ className = '', showText = true, size = 'md' }: CoachLinksLogoProps) {
  const sizes = {
    sm: { icon: 28, text: 'text-lg' },
    md: { icon: 34, text: 'text-xl sm:text-2xl' },
    lg: { icon: 44, text: 'text-3xl' },
  };

  const { icon, text } = sizes[size];

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Icon mark */}
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <defs>
          <linearGradient id="logo-bg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>

        {/* Solid rounded square */}
        <rect x="0" y="0" width="48" height="48" rx="13" fill="url(#logo-bg)" />

        {/* Chain link icon — two interlocked rounded rectangles at 45° */}
        {/* Top-right link */}
        <rect
          x="22" y="10" width="10" height="20" rx="5"
          transform="rotate(45 27 20)"
          fill="none"
          stroke="white"
          strokeWidth="3"
        />
        {/* Bottom-left link */}
        <rect
          x="16" y="18" width="10" height="20" rx="5"
          transform="rotate(45 21 28)"
          fill="none"
          stroke="white"
          strokeWidth="3"
          opacity="0.7"
        />
      </svg>

      {/* Wordmark */}
      {showText && (
        <span className={`${text} font-black tracking-tight leading-none`}>
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            Coach
          </span>
          <span className="text-white">Links</span>
        </span>
      )}
    </span>
  );
}
