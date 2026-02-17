import React from 'react';
import { MenuItem as MenuItemType } from '../types';
import { PriceStar } from './PriceStar';
import { COLORS } from '../constants';

interface Props {
  item: MenuItemType;
  index: number;
  categoryName: string;
}

export const MenuItem: React.FC<Props> = ({ item, index, categoryName }) => {
  return (
    <div className="relative flex flex-row items-center bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden mb-4 pr-2">

      {/* Content Section */}
      <div className="flex-1 p-3 flex flex-col justify-center min-h-[96px]">
        <h3
          className="text-lg leading-tight uppercase mb-1"
          style={{ fontFamily: 'Roboto Condensed', fontWeight: 700, color: '#333' }}
        >
          {item.nombre}
        </h3>

        {item.descripcion && (
          <p className="text-sm text-gray-500 leading-snug font-light">
            {item.descripcion}
          </p>
        )}
      </div>

      {/* Price Section - Absolute or Relative depending on layout */}
      <div className="flex-shrink-0 flex items-center justify-center pl-1">
        {item.precio !== null ? (
          <PriceStar price={item.precio} />
        ) : (
          <div className="px-2 py-1 bg-orange-100 rounded text-orange-600 text-xs font-bold text-center">
            Consultar
          </div>
        )}
      </div>
    </div>
  );
};