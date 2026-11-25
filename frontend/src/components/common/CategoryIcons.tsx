import React from 'react';

interface IconProps {
  className?: string;
}

export const DesertSafariIcon: React.FC<IconProps> = ({ className = 'w-9 h-9' }) => (
  <svg
    viewBox="0 0 44 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Clean anatomical camel outline facing right */}
    <path
      d="M 34.5 12.5 
         C 36 12.8 37.2 13.8 37.2 15 
         C 37.2 16.5 35.8 17.2 34.2 16.8 
         C 32 16.2 31 15 30 13 
         C 28.8 10.5 28 9 26.8 9 
         C 25.8 9 25.2 10.2 25.2 12 
         C 25.2 14.5 24.2 19 22.8 21 
         C 21.8 21 20.8 19 19.2 15 
         C 17.8 11.2 15.2 9 12.5 9 
         C 9.2 9 7.5 12.5 6.2 17 
         C 5.2 20.5 4.2 22 3 23.5 
         L 3.8 27.5 
         C 4.6 25.5 5.5 23 6.8 21.5 
         C 7.5 23.2 8.5 24.5 10 24.5 
         L 10 36 
         M 13.8 24.5 L 13.8 36 
         M 13.8 24.5 
         C 16.8 24.8 19.5 24.8 22.5 23 
         L 23.5 36 
         M 27.2 21.5 L 27.5 36 
         M 22.5 23 
         C 24.5 23 26 21 27.2 18 
         C 28.5 14.5 29 12 30.5 10 
         C 31.8 8.8 33.2 8.8 34.5 10 
         C 35.5 11 35.5 12 34.5 12.5 Z"
      stroke="#7A421D"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DhowCruiseIcon: React.FC<IconProps> = ({ className = 'w-9 h-9' }) => (
  <svg
    viewBox="0 0 44 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Wooden Boat Hull */}
    <path
      d="M 4 25 L 8 33 C 8 33 18 34 33 33 L 39 25 C 33 26.5 20 26.5 4 25 Z"
      fill="#C58D4E"
      stroke="#7A421D"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    {/* Hull Deck/Plank Line */}
    <path
      d="M 7 28.5 C 16 29.5 28 29.5 36 28"
      stroke="#7A421D"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    {/* Mast */}
    <path
      d="M 21 7 L 21 25"
      stroke="#7A421D"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    {/* Angled Spar / Yardarm */}
    <path
      d="M 6 25 L 28 5"
      stroke="#7A421D"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    {/* Lateen Triangular Sail */}
    <path
      d="M 8 24 L 27 6 C 24 13 22 18 20.5 24 Z"
      fill="#FDFBF7"
      stroke="#7A421D"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    {/* Jib / Front Sail */}
    <path
      d="M 22 8 L 33 24 C 27 23 23 23 22 24 Z"
      fill="#FDFBF7"
      stroke="#7A421D"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </svg>
);

export const CulturalHeritageIcon: React.FC<IconProps> = ({ className = 'w-9 h-9' }) => (
  <svg
    viewBox="0 0 44 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Ground Baseline */}
    <path d="M 4 35 L 40 35" stroke="#7A421D" strokeWidth="1.8" strokeLinecap="round" />
    {/* Left Wing */}
    <path
      d="M 7 35 L 7 19 L 16 19 L 16 35"
      fill="#FDFBF7"
      stroke="#7A421D"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    {/* Left Wing Windows */}
    <path
      d="M 10 24 C 10 22.5 11 22 11.5 22 C 12 22 13 22.5 13 24 L 13 26 L 10 26 Z"
      fill="#7A421D"
    />
    <path
      d="M 10 30 C 10 28.5 11 28 11.5 28 C 12 28 13 28.5 13 30 L 13 32 L 10 32 Z"
      fill="#7A421D"
    />

    {/* Right Wing */}
    <path
      d="M 28 35 L 28 19 L 37 19 L 37 35"
      fill="#FDFBF7"
      stroke="#7A421D"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    {/* Right Wing Windows */}
    <path
      d="M 31 24 C 31 22.5 32 22 32.5 22 C 33 22 34 22.5 34 24 L 34 26 L 31 26 Z"
      fill="#7A421D"
    />
    <path
      d="M 31 30 C 31 28.5 32 28 32.5 28 C 33 28 34 28.5 34 30 L 34 32 L 31 32 Z"
      fill="#7A421D"
    />

    {/* Center Taller Pavilion with Pointed Top / Dome */}
    <path
      d="M 16 35 L 16 12 C 16 12 18 8 22 6 C 26 8 28 12 28 12 L 28 35"
      fill="#FDFBF7"
      stroke="#7A421D"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    {/* Center Archway */}
    <path
      d="M 19 35 L 19 25 C 19 22.5 22 20.5 22 20.5 C 22 20.5 25 22.5 25 25 L 25 35"
      stroke="#7A421D"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    {/* Center Upper Window */}
    <path
      d="M 21 16 C 21 15 21.5 14.5 22 14.5 C 22.5 14.5 23 15 23 16 L 23 18 L 21 18 Z"
      fill="#7A421D"
    />
  </svg>
);

export const LuxuryPrivateIcon: React.FC<IconProps> = ({ className = 'w-9 h-9' }) => (
  <svg
    viewBox="0 0 44 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Outer Diamond Contour */}
    <path
      d="M 12 10 L 32 10 L 39 19 L 22 36 L 5 19 Z"
      fill="#FDFBF7"
      stroke="#7A421D"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    {/* Girdle Horizontal Line */}
    <path d="M 5 19 L 39 19" stroke="#7A421D" strokeWidth="1.8" />
    {/* Crown Facet Lines */}
    <path
      d="M 12 10 L 17 19 L 22 10 L 27 19 L 32 10"
      stroke="#7A421D"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    {/* Pavilion Facet Lines */}
    <path
      d="M 17 19 L 22 36 L 27 19"
      stroke="#7A421D"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

export const GroupToursIcon: React.FC<IconProps> = ({ className = 'w-9 h-9' }) => (
  <svg
    viewBox="0 0 44 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Left Person (behind) */}
    <circle cx="13" cy="18" r="4.2" stroke="#7A421D" strokeWidth="1.8" />
    <path
      d="M 5 33 C 5 27.5 8.5 25.5 13 25.5 C 14.8 25.5 16.2 26 17.5 27"
      stroke="#7A421D"
      strokeWidth="1.8"
      strokeLinecap="round"
    />

    {/* Right Person (behind) */}
    <circle cx="31" cy="18" r="4.2" stroke="#7A421D" strokeWidth="1.8" />
    <path
      d="M 26.5 27 C 27.8 26 29.2 25.5 31 25.5 C 35.5 25.5 39 27.5 39 33"
      stroke="#7A421D"
      strokeWidth="1.8"
      strokeLinecap="round"
    />

    {/* Center Person (foreground) */}
    <circle cx="22" cy="14" r="5" fill="#FAF5ED" stroke="#7A421D" strokeWidth="1.8" />
    <path
      d="M 12 34 C 12 27 16 23.5 22 23.5 C 28 23.5 32 27 32 34"
      fill="#FAF5ED"
      stroke="#7A421D"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
