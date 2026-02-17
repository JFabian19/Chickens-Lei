import React, { useEffect, useState } from 'react';
import { MenuCategory } from '../types';
import { COLORS } from '../constants';

interface Props {
  categories: MenuCategory[];
}

export const CategoryNav: React.FC<Props> = ({ categories }) => {
  const [activeId, setActiveId] = useState<string>(categories[0].categoria);

  /* Scroll Spy Logic to update active state on scroll */
  useEffect(() => {
    const handleScrollSpy = () => {
      // Offset to ensure the active state switches when the header enters the view reasonably
      // Nav height is approx 60-80px. We use 100px to trigger slightly early.
      const spyOffset = 120;
      const scrollPosition = window.scrollY + spyOffset;

      let currentSection = categories[0].categoria;

      // Find the section that covers the current scroll position
      for (const cat of categories) {
        const element = document.getElementById(cat.categoria);
        if (element) {
          // If the top of the section is above our scroll marker, it's a candidate
          if (element.offsetTop <= scrollPosition) {
            currentSection = cat.categoria;
          }
        }
      }

      if (currentSection !== activeId) {
        setActiveId(currentSection);
      }
    };

    window.addEventListener('scroll', handleScrollSpy);
    // Call once strictly to set initial state
    handleScrollSpy();

    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [categories, activeId]);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of nav + buffer
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      // State will be updated by the scroll listener, but we can optimistically set it too
      setActiveId(id);
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-white shadow-md border-b border-stone-200">
      <div className="flex overflow-x-auto py-3 px-2 hide-scrollbar space-x-2">
        {categories.map((cat) => (
          <button
            key={cat.categoria}
            onClick={() => handleScroll(cat.categoria)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold uppercase transition-all duration-300 flex-shrink-0 border-2 ${activeId === cat.categoria
                ? 'bg-orange-600 text-white border-orange-600 shadow-md transform scale-105'
                : 'bg-stone-50 text-stone-600 border-stone-200 hover:border-orange-300'
              }`}
            style={{ fontFamily: 'Roboto Condensed' }}
          >
            {cat.categoria}
          </button>
        ))}
      </div>
    </nav>
  );
};