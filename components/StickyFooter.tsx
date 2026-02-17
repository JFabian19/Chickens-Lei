import React from 'react';
import { PhoneCall } from 'lucide-react';
import { BusinessInfo } from '../types';
import { COLORS } from '../constants';

interface Props {
  info: BusinessInfo;
}

export const StickyFooter: React.FC<Props> = ({ info }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-white via-white to-transparent pb-6 pt-8">
      <a 
        href={`tel:${info.telefono_delivery.replace(/\s/g, '')}`}
        className="flex items-center justify-between w-full max-w-md mx-auto rounded-full shadow-2xl overflow-hidden transform active:scale-95 transition-transform"
        style={{ backgroundColor: COLORS.greenFresh }}
      >
        <div className="flex items-center pl-6 py-3">
          <div className="bg-white p-2 rounded-full mr-3 animate-pulse">
            <PhoneCall size={24} className="text-green-600" />
          </div>
          <div className="flex flex-col text-white">
            <span className="text-xs font-bold uppercase tracking-wider opacity-90">Pide Delivery al</span>
            <span className="text-xl font-black font-mono leading-none">{info.telefono_delivery}</span>
          </div>
        </div>
        
        <div className="h-full bg-green-700 px-6 py-4 flex items-center justify-center font-bold text-white uppercase tracking-wider text-sm">
           Llamar
        </div>
      </a>
    </div>
  );
};