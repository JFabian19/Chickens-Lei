import React, { useEffect, useState } from 'react';
import { MenuCategory } from '../types';
import { COLORS } from '../constants';

interface Props {
  categories: MenuCategory[];
}

export const CategoryNav: React.FC<Props> = ({ categories }) => {
  const [activeId, setActiveId] = useState<string>(categories[0].categoria);
  const navContainerRef = React.useRef<HTMLDivElement>(null);

  /* Scroll Spy Logic to update active state on scroll */
  useEffect(() => {
    const handleScrollSpy = () => {
      // Offset to ensure the active state switches when the header enters the view reasonably
      const spyOffset = 150; // Increased offset slightly for better UX
      const scrollPosition = window.scrollY + spyOffset;

      // Default to first category
      let currentSection = categories[0].categoria;

      // Find the section that covers the current scroll position
      // Check from bottom up or top down? Top down is fine if we track the "last one that passed the threshold"
      for (const cat of categories) {
        const element = document.getElementById(cat.categoria);
        if (element) {
          // If the top of the section is above our scroll marker, it's the current candidate
          // We want the last one that satisfies this to be the current section
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
  }, [categories, activeId]); // activeId in deps causes re-bind, but it's needed for the check.

  /* NEW: Scroll the active button into view when it changes */
  useEffect(() => {
    if (navContainerRef.current) {
      // We need to match the button. We can use the data-category attribute.
      // Special handling for special characters in selector if needed, but categories usually simple.
      // Using CSS.escape() for safety although quotes handle most.
      const activeButton = navContainerRef.current.querySelector(`button[data-category="${activeId.replace(/"/g, '\\"')}"]`);

      if (activeButton) {
        activeButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [activeId]);

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
      // State will be updated by the scroll listener eventually, but we act immediately for UI responsiveness
      setActiveId(id);
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-white shadow-md border-b border-stone-200">
      <div
        ref={navContainerRef}
        className="flex overflow-x-auto py-3 px-2 hide-scrollbar space-x-2"
      >
        {categories.map((cat) => (
          <button
            key={cat.categoria}
            data-category={cat.categoria}
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