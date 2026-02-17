import React from 'react';
import { BusinessInfo } from '../types';
import { COLORS } from '../constants';
import { Facebook, Phone, MapPin, MessageCircle } from 'lucide-react';
// import { Logo } from './Logo';

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

      {/* Top Right Delivery Button */}
      <a
        href={`https://wa.me/51${info.telefono_delivery.replace(/\s+/g, '')}`}
        target="_blank"
        rel="noreferrer"
        className="absolute top-4 right-4 z-30 flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full font-bold shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="text-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
        <span>Delivery</span>
      </a>

      {/* Main Content Grid */}
      <div className="flex flex-col items-center justify-center w-full max-w-6xl gap-8 mt-12 z-20 relative">

        {/* Logo/Text Row */}
        {/* Main Content Layout */}
        <div className="flex flex-col items-center justify-center gap-2 w-full z-10">

          {/* Logo Title Row with Images */}
          <div className="flex flex-row items-center justify-center gap-2 md:gap-8 w-full max-w-[95vw]">
            {/* Left Image (Pot) */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-48 md:h-48 relative transform -rotate-12 transition-transform hover:scale-110 flex-shrink-0">
              <img
                src="/logo izquierda.png"
                alt="Olla de barro"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>

            {/* Central Title */}
            <h1
              className="font-script text-4xl sm:text-5xl md:text-8xl text-white leading-tight drop-shadow-lg flex-shrink"
              style={{
                fontFamily: "'Pacifico', cursive",
                textShadow: '2px 2px 0px #C2410C, 4px 4px 6px rgba(0,0,0,0.3)'
              }}
            >
              Chicken's Lei
            </h1>

            {/* Right Image (Chicken) */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-48 md:h-48 relative transform rotate-12 transition-transform hover:scale-110 flex-shrink-0">
              <img
                src="/logo derecga.png"
                alt="Pollo delivery"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Subtitle */}
          <h2
            className="font-display text-2xl md:text-4xl text-yellow-200 tracking-widest font-black uppercase mt-2 bg-orange-900/60 px-6 py-2 rounded-lg backdrop-blur-sm transform -rotate-2 shadow-xl border-2 border-yellow-400/30"
            style={{
              fontFamily: "'Roboto Condensed', sans-serif",
            }}
          >
            Restaurant Polleria
          </h2>

          {/* Action Buttons under Text */}
          <div className="flex flex-col items-center gap-6 mt-8">
            {/* Ubícanos Button */}
            <a
              href="https://maps.app.goo.gl/xiPcRmQJ7egYUSed8"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-white text-orange-600 px-8 py-3 rounded-full font-bold shadow-lg hover:bg-gray-100 transition-all transform hover:scale-105 active:scale-95"
            >
              <MapPin size={24} />
              <span>Ubícanos</span>
            </a>

            {/* Social Icons Row */}
            <div className="flex gap-4">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=61556699050975"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-yellow-200 transition-all transform hover:scale-110 bg-white/20 p-3 rounded-full hover:bg-white/30 backdrop-blur-sm"
              >
                <Facebook size={28} />
              </a>

              {/* Call Button (Phone) */}
              <a
                href={`tel:${info.telefono_delivery.replace(/\s+/g, '')}`}
                className="text-white hover:text-yellow-200 transition-all transform hover:scale-110 bg-white/20 p-3 rounded-full hover:bg-white/30 backdrop-blur-sm"
              >
                <Phone size={28} />
              </a>
            </div>
          </div>
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