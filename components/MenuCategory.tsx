import React from 'react';
import { MenuCategory as MenuCategoryType } from '../types';
import { MenuItem } from './MenuItem';
import { COLORS } from '../constants';

interface Props {
  category: MenuCategoryType;
  id: string;
}

export const MenuCategory: React.FC<Props> = ({ category, id }) => {
  const bgClass = category.theme === 'parchment' ? 'bg-parchment' : 'bg-grunge';

  return (
    <section id={id} className={`py-8 px-4 ${bgClass} border-b-4 border-dashed border-stone-300`}>
      {/* Category Title with High Impact */}
      <div className="mb-6 text-center relative">
        <h2
          className="text-4xl tracking-wide uppercase inline-block relative z-10 px-4 transform -rotate-1"
          style={{
            fontFamily: 'Anton',
            color: COLORS.orangeVibrant,
            textShadow: '2px 2px 0px #fff, 4px 4px 0px rgba(0,0,0,0.1)'
          }}
        >
          {category.categoria}
        </h2>
      </div>

      {/* Category Image Placeholder - 3:2 Aspect Ratio */}
      <div className="mb-8 mx-auto w-full max-w-lg shadow-md rounded-lg overflow-hidden relative border-2 border-dashed border-stone-400 bg-stone-200">
        <div className="aspect-[3/2] w-full flex items-center justify-center">
          <span className="text-xl font-bold uppercase tracking-widest text-stone-500 opacity-70">
            ACA VA IMAGEN
          </span>
        </div>
      </div>

      {/* Optional Note */}
      {category.nota && (
        <div className="mb-6 bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400 shadow-sm mx-2">
          <p className="text-stone-700 italic text-sm text-center font-medium">
            <span className="mr-2">💡</span>{category.nota}
          </p>
        </div>
      )}

      {/* Items Grid - Mobile First (1 col), Tablet (2 cols) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {category.items.map((item, index) => (
          <MenuItem
            key={`${category.categoria}-${index}`}
            item={item}
            index={index}
            categoryName={category.categoria}
          />
        ))}
      </div>
    </section>
  );
};