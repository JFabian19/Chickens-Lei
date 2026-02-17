import React from 'react';
import { DATA } from './constants';
import { Header } from './components/Header';
import { MenuCategory } from './components/MenuCategory';
import { CategoryNav } from './components/CategoryNav';
import { CartProvider, useCart } from './context/CartContext';
import { FloatingCartButton } from './components/Cart/FloatingCartButton';
import { CartModal } from './components/Cart/CartModal';
import { FloatingShareButton } from './components/FloatingShareButton';

import { MenuProvider, useMenu } from './context/MenuContext';

const AppContent: React.FC = () => {
  const { openCart, setOpenCart } = useCart();
  const { menuData, loading, error } = useMenu();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-100 text-red-500">
        Error loading menu: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col max-w-screen-md mx-auto shadow-2xl bg-stone-100">
      {/* Hero Header */}
      <Header info={menuData.informacion_negocio} />

      {/* Sticky Navigation for Categories */}
      <CategoryNav categories={menuData.menu} />

      {/* Main Content Area */}
      <main className="flex-grow pb-32">
        {menuData.menu.map((category) => (
          <MenuCategory
            key={category.categoria}
            category={category}
            id={category.categoria}
          />
        ))}
      </main>

      {/* Cart Components */}
      <FloatingCartButton />
      <FloatingShareButton />
      {openCart && (
        <CartModal
          onClose={() => setOpenCart(false)}
          phoneNumber={menuData.informacion_negocio.telefono_delivery}
        />
      )}

      {/* Footer with Payment Methods */}
      <footer className="bg-stone-900 text-stone-300 py-12 px-6 text-center pb-32">

        {/* Payment Methods Section */}
        <div className="mb-10 flex flex-col items-center">
          <h3 className="text-xl font-bold text-orange-400 mb-6 uppercase tracking-wider border-b-2 border-orange-400/30 pb-2 inline-block">
            Medios de Pago
          </h3>

          <div className="flex gap-8 justify-center items-center mb-6">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-white rounded-2xl p-2 shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform">
                <img src="/yape.png" alt="Yape" className="w-full h-full object-contain" />
              </div>
              <span className="text-xs font-bold text-gray-400">Yape</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-white rounded-2xl p-2 shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform">
                <img src="/plin.png" alt="Plin" className="w-full h-full object-contain" />
              </div>
              <span className="text-xs font-bold text-gray-400">Plin</span>
            </div>
          </div>

          <div
            className="flex items-center gap-3 bg-stone-800 px-6 py-3 rounded-xl border border-stone-700 active:bg-stone-700 cursor-pointer group transition-colors"
            onClick={() => {
              navigator.clipboard.writeText('948327953');
              // Optional: You could add a toast here, but for simplicity we'll just use visual feedback
              alert('Número copiado al portapapeles: 948327953');
            }}
          >
            <span className="font-mono text-xl font-bold text-white tracking-wider group-hover:text-orange-400 transition-colors">
              948 327 953
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-500 group-hover:text-white transition-colors">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </div>
          <p className="text-xs text-stone-500 mt-2">Haz clic para copiar número</p>
        </div>

        <div className="border-t border-stone-800 pt-8 mt-12">
          <p className="text-sm font-light text-stone-500 mb-6">
            &copy; {new Date().getFullYear()} {menuData.informacion_negocio.nombre}
          </p>

          <a
            href="https://tymasolutions.lat/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block group transition-transform hover:scale-105"
          >
            <span className="text-stone-600 text-xs font-medium mr-2 group-hover:text-stone-500 transition-colors">Hecho por</span>
            <span className="font-bold text-lg tracking-tight">
              <span className="text-sky-400 group-hover:text-sky-300 transition-colors">Tyma</span>
              <span className="text-white group-hover:text-stone-100 transition-colors">Solutions</span>
            </span>
            <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-sky-400 to-white transition-all duration-300 rounded-full mt-1"></div>
          </a>

          <p className="text-[10px] mt-8 opacity-20 text-stone-500">
            Imágenes referenciales. Precios sujetos a cambios.
          </p>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <MenuProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </MenuProvider>
  );
};

export default App;