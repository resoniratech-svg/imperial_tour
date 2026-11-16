import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'gold';
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'light',
  showTagline = true,
  size = 'md',
}) => {
  const isLight = variant === 'light';

  return (
    <Link to="/" className={`flex items-center gap-3 group ${className}`}>
      {/* Official Imperial Tours Qatar Medallion */}
      <div className={`relative ${size === 'sm' ? 'w-10 h-10' : size === 'lg' ? 'w-16 h-16' : 'w-12 h-12'} flex-shrink-0 rounded-full overflow-hidden shadow-lg border border-gold-500/50 group-hover:scale-105 group-hover:shadow-gold-glow transition-all duration-300 bg-slate-950`}>
        <img
          src="/logo.png"
          alt="Imperial Tours Qatar (ITQ) Official Logo"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-serif tracking-widest text-lg font-bold uppercase transition-colors ${
              isLight ? 'text-white' : 'text-slate-900'
            }`}
          >
            Imperial
          </span>
          <span className="font-serif tracking-widest text-lg font-bold text-gold-500 uppercase">
            Tours
          </span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span
            className={`text-[9.5px] font-bold tracking-[0.25em] uppercase transition-colors ${
              isLight ? 'text-slate-300' : 'text-qatar-maroon'
            }`}
          >
            Qatar
          </span>
          <span className="text-[8px] text-gold-400 font-semibold px-1 py-0.2 rounded border border-gold-500/40 tracking-wider">
            ITQ
          </span>
        </div>
        {showTagline && (
          <span className="text-[8px] text-slate-400 tracking-wider uppercase hidden sm:block mt-0.5">
            Explore • Discover • Experience
          </span>
        )}
      </div>
    </Link>
  );
};
