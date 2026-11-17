import React from 'react';
import { Link } from 'react-router-dom';

export default function BrandLogo({ size = 'md', to = '/', showTag = true, className = '' }) {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  const tagSizes = {
    sm: 'text-[9px] px-1 py-0.2',
    md: 'text-[10px] px-1.5 py-0.5',
    lg: 'text-xs px-2 py-0.5',
  };

  return (
    <Link to={to} className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* Original Shield Symbol */}
      <div className={`relative flex items-center justify-center ${iconSizes[size]} transition-transform duration-200 group-hover:scale-105`}>
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
          {/* Outer Protective Armor */}
          <path
            d="M18 3L5 8.5V17C5 25.2 10.7 32.8 18 34.5C25.3 32.8 31 25.2 31 17V8.5L18 3Z"
            fill="#183B56"
            stroke="#111827"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Dual-Facet High-Signal Core */}
          <path
            d="M18 6.5L8.5 10.8V17C8.5 23.4 12.8 29.4 18 31V6.5Z"
            fill="#2563EB"
          />
          <path
            d="M18 6.5L27.5 10.8V17C27.5 23.4 23.2 29.4 18 31V6.5Z"
            fill="#1D4ED8"
          />
          {/* Invariant Execution Pulse Glyphs */}
          <path
            d="M18 12L13.5 18.5H17.5L16.5 24.5L23 17.5H19L20.5 12H18Z"
            fill="#FFFFFF"
          />
          <circle cx="18" cy="18.5" r="2" fill="#6557C8" />
        </svg>
      </div>

      {/* Brand Wordmark */}
      <div className="flex items-center gap-1.5 tracking-tight font-bold">
        <span className={`text-graphite tracking-tight font-extrabold ${textSizes[size]}`}>
          HACK<span className="text-signal-blue font-black">GUARD</span>
        </span>
        {showTag && (
          <span className={`font-mono uppercase font-semibold tracking-wider rounded bg-[#183B56] text-[#F5F6F8] border border-[#111827]/20 ${tagSizes[size]}`}>
            AI
          </span>
        )}
      </div>
    </Link>
  );
}
