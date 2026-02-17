import React from 'react';
import { COLORS } from '../constants';

interface PriceStarProps {
  price: number;
  className?: string;
}

export const PriceStar: React.FC<PriceStarProps> = ({ price, className = "" }) => {
  return (
    <div className={`relative flex items-center justify-center w-20 h-20 ${className}`}>
      {/* Explosive Star Shape */}
      <svg
        viewBox="0 0 100 100"
        className="absolute w-full h-full drop-shadow-md animate-pulse-slow"
        style={{ color: COLORS.yellowStar }}
      >
        <path
          d="M50 0 L63 25 L90 20 L75 45 L95 65 L70 75 L65 98 L45 78 L25 95 L20 70 L0 60 L25 40 L10 15 L38 25 Z"
          fill="currentColor"
          stroke={COLORS.redFire}
          strokeWidth="2"
        />
      </svg>
      {/* Price Text */}
      <div className="relative z-10 flex flex-col items-center justify-center -rotate-6">
        <span 
            className="text-xs font-bold leading-none"
            style={{ color: COLORS.redFire, fontFamily: 'Roboto Condensed' }}
        >
            S/
        </span>
        <span 
            className="text-2xl font-black leading-none" 
            style={{ color: COLORS.redFire, fontFamily: 'Anton' }}
        >
          {price.toFixed(0)}
        </span>
        <span 
            className="text-[0.6rem] font-bold leading-none"
            style={{ color: COLORS.redFire, fontFamily: 'Roboto Condensed' }}
        >
            .00
        </span>
      </div>
    </div>
  );
};