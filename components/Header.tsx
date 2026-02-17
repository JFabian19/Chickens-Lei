import React from 'react';
import { BusinessInfo } from '../types';
import { COLORS } from '../constants';
import { Facebook, Instagram, Phone } from 'lucide-react';

interface Props {
  info: BusinessInfo;
}

export const Header: React.FC<Props> = ({ info }) => {
  return (
    <header className="relative overflow-hidden pt-12 pb-20 px-6 text-center shadow-lg z-10">
      {/* Background with gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{ background: `linear-gradient(135deg, ${COLORS.orangeVibrant} 0%, #FF9800 100%)` }}
      />

      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 opacity-10 z-0" style={{ backgroundImage: 'radial-gradient(circle, #fff 2px, transparent 2.5px)', backgroundSize: '20px 20px' }}></div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Image */}
        <img
          src="/logo.png"
          alt="Logo"
          className="w-80 h-80 object-contain mb-4 drop-shadow-xl hover:scale-105 transition-transform duration-300"
        />

        {/* Badge */}
        <div
          className="inline-flex items-center px-4 py-1 rounded-full shadow-lg transform rotate-1 mb-6"
          style={{ backgroundColor: COLORS.greenFresh }}
        >
          <span className="text-white font-bold uppercase text-sm tracking-wider">
            {info.servicio}
          </span>
        </div>

        {/* Social Icons */}
        <div className="flex gap-6 items-center justify-center">
          {/* Facebook */}
          <a href="#" className="text-white hover:text-yellow-200 transition-colors transform hover:scale-110">
            <Facebook size={32} />
          </a>
          {/* Instagram */}
          <a href="#" className="text-white hover:text-yellow-200 transition-colors transform hover:scale-110">
            <Instagram size={32} />
          </a>
          {/* WhatsApp */}
          <a
            href={`https://wa.me/51${info.telefono_delivery.replace(/\s+/g, '')}`}
            className="text-white hover:text-yellow-200 transition-colors transform hover:scale-110"
            target="_blank"
            rel="noreferrer"
          >
            <Phone size={32} />
          </a>
        </div>
      </div>

      {/* Bottom Wave Decoration (SVG) */}
      <div className="absolute bottom-0 left-0 w-full leading-none z-20 text-white">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-16 object-cover" preserveAspectRatio="none">
          <path fill="#F3E5AB" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </header>
  );
};