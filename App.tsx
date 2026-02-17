import React from 'react';
import { DATA } from './constants';
import { Header } from './components/Header';
import { MenuCategory } from './components/MenuCategory';
import { CategoryNav } from './components/CategoryNav';
import { CartProvider, useCart } from './context/CartContext';
import { FloatingCartButton } from './components/Cart/FloatingCartButton';
import { CartModal } from './components/Cart/CartModal';

const AppContent: React.FC = () => {
  const { openCart, setOpenCart } = useCart();

  return (
    <div className="min-h-screen flex flex-col max-w-screen-md mx-auto shadow-2xl bg-stone-100">
      {/* Hero Header */}
      <Header info={DATA.informacion_negocio} />

      {/* Sticky Navigation for Categories */}
      <CategoryNav categories={DATA.menu} />

      {/* Main Content Area */}
      <main className="flex-grow pb-32">
        {DATA.menu.map((category) => (
          <MenuCategory
            key={category.categoria}
            category={category}
            id={category.categoria}
          />
        ))}
      </main>

      {/* Cart Components */}
      <FloatingCartButton />
      {openCart && (
        <CartModal
          onClose={() => setOpenCart(false)}
          phoneNumber={DATA.informacion_negocio.telefono_delivery}
        />
      )}

      {/* Simple Footer Note */}
      <footer className="bg-stone-800 text-stone-400 py-8 px-4 text-center pb-32">
        <p className="text-sm font-light">
          &copy; {new Date().getFullYear()} {DATA.informacion_negocio.nombre}
        </p>
        <p className="text-xs mt-2 opacity-50">
          Imágenes referenciales. Precios sujetos a cambios sin previo aviso.
        </p>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
};

export default App;