import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'gold';
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'light',
  showTagline = false,
  size = 'md',
}) => {
  const isLight = variant === 'light';

  // Explicit, pixel-perfect medallion sizing
  const medallionSizes = {
    sm: 'w-[48px] h-[48px]',
    md: 'w-[68px] h-[68px] sm:w-[78px] sm:h-[78px]', // Increased size for prominent luxury branding
    lg: 'w-[88px] h-[88px] sm:w-[100px] sm:h-[100px]',
    xl: 'w-[110px] h-[110px] sm:w-[128px] sm:h-[128px]',
  }[size];

  const titleSizes = {
    sm: 'text-base sm:text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-3xl sm:text-4xl',
  }[size];

  const subSizes = {
    sm: 'text-[10px] tracking-[0.34em]',
    md: 'text-[12px] sm:text-[13px] tracking-[0.42em]',
    lg: 'text-sm sm:text-base tracking-[0.44em]',
    xl: 'text-base sm:text-lg tracking-[0.46em]',
  }[size];

  const taglineSizes = {
    sm: 'text-[8px]',
    md: 'text-[9.5px] sm:text-[10.5px]',
    lg: 'text-xs',
    xl: 'text-sm',
  }[size];

  return (
    <Link to="/" className={`flex items-center gap-3.5 group flex-shrink-0 ${className}`}>
      {/* Official Imperial Tours Qatar Medallion with Authentic 3D Gold Framing */}
      <div
        className={`relative ${medallionSizes} flex-shrink-0 group-hover:scale-105 transition-all duration-300 drop-shadow-[0_4px_12px_rgba(0,0,0,0.22)]`}
      >
        <img
          src="/logo.png"
          alt="Imperial Tours Qatar (ITQ) Official Logo"
          className="w-full h-full object-contain select-none"
        />
      </div>

      {/* Typography - Clean Luxury Brand Mark (Solution 1) */}
      <div className="flex flex-col justify-center select-none">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-serif tracking-wider ${titleSizes} font-extrabold uppercase transition-colors ${
              isLight ? 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]' : 'text-slate-950'
            }`}
          >
            Imperial
          </span>
          <span
            className={`font-serif tracking-wider ${titleSizes} font-extrabold uppercase transition-colors ${
              isLight
                ? 'text-yellow-400 drop-shadow-[0_2px_10px_rgba(250,204,21,0.35)]'
                : 'text-amber-600'
            }`}
          >
            Tours
          </span>
        </div>

        {/* Subtitle: Q A T A R with luxury tracking */}
        <div className="flex items-center gap-2 mt-1.5 leading-none">
          <span
            className={`${subSizes} font-bold uppercase transition-colors ${
              isLight ? 'text-yellow-200/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]' : 'text-qatar-maroon'
            }`}
          >
            Qatar
          </span>
        </div>

        {showTagline && (
          <span className={`${taglineSizes} text-slate-300 tracking-wider uppercase mt-1 font-medium`}>
            Explore • Discover • Experience
          </span>
        )}
      </div>
    </Link>
  );
};
