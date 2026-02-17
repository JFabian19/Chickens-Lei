import React from 'react';
import { ChefHat, Utensils } from 'lucide-react';

export const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
    return (
        <div className={`relative flex items-center justify-center bg-orange-500 rounded-lg overflow-hidden p-4 select-none ${className}`}>
            {/* Background Pattern (Polka Dots) */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)',
                    backgroundSize: '16px 16px'
                }}
            />

            <div className="relative z-10 flex items-center gap-4">
                {/* Pot Icon Placeholder (Left) */}
                <div className="hidden sm:flex items-center justify-center transform -rotate-12">
                    <span className="text-6xl drop-shadow-md filter sepia hue-rotate-320 brightness-75">🍲</span>
                </div>

                {/* Text Group */}
                <div className="flex flex-col items-center">
                    {/* Main Title */}
                    <h1
                        className="font-script text-5xl md:text-6xl text-amber-900 leading-tight transform -rotate-2 drop-shadow-lg"
                        style={{
                            fontFamily: "'Pacifico', cursive",
                            textShadow: '2px 2px 0px #fff, 4px 4px 0px rgba(0,0,0,0.2)'
                        }}
                    >
                        Chicken's Lei
                    </h1>

                    {/* Subtitle */}
                    <h2
                        className="font-display text-lg md:text-xl text-amber-900 tracking-widest font-black uppercase mt-1 bg-amber-200/50 px-2 rounded-sm"
                        style={{
                            fontFamily: "'Roboto Condensed', sans-serif",
                            letterSpacing: '0.2em'
                        }}
                    >
                        Restaurant Polleria
                    </h2>
                </div>

                {/* Chicken Icon Placeholder (Right) */}
                <div className="hidden sm:flex items-center justify-center transform rotate-6">
                    <span className="text-6xl drop-shadow-md filter brightness-110 contrast-125">🐔</span>
                </div>
            </div>

            {/* Mobile only simplified icons if needed, currently hidden on small screens in flex */}
            <div className="flex sm:hidden absolute top-2 right-2 opacity-50">
                <Utensils size={16} className="text-amber-900" />
            </div>
        </div>
    );
};
