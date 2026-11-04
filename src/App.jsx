import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './data/products';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import ProductCard from './components/ProductCard';
import Faq from './components/Faq';
import CustomizerModal from './components/CustomizerModal';
import CartDrawer from './components/CartDrawer';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [selectedProductForCustom, setSelectedProductForCustom] = useState(null);

  // Estados de catálogo dinámico y panel admin
  const [productsList, setProductsList] = useState(PRODUCTS);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    if (isAdminLoggedIn) return; // Desactiva observer de scroll en modo admin

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observerInstance.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [productsList, isAdminLoggedIn]);

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleAddToCart = (product) => {
    setCart(prev => [...prev, product]);
    setCartOpen(true);
  };

  const filteredProducts = selectedCategory === 'all' 
    ? productsList 
    : productsList.filter(p => p.category === selectedCategory);

  // VISTA INDEPENDIENTE DE ADMINISTRADOR (Si inició sesión, oculta la tienda pública)
  if (isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-[#F5F0E6] p-4 sm:p-8 font-sans">
        <AdminDashboard 
          products={productsList}
          onUpdateProducts={setProductsList}
          onLogout={() => setIsAdminLoggedIn(false)}
        />
      </div>
    );
  }

  // VISTA PÚBLICA / LANDING STORE
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C3531] font-sans">
      <Navbar 
        cartCount={cart.length} 
        wishlistCount={wishlist.length}
        onOpenCart={() => setCartOpen(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onOpenAdminLogin={() => setAdminLoginOpen(true)}
      />

      <div className="reveal">
        <Hero 
          onOpenCustomizer={() => {
            setSelectedProductForCustom(productsList[0]);
            setCustomizerOpen(true);
          }}
          onExploreClick={() => {
            document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </div>

      <div className="reveal">
        <HowItWorks 
          onStartClick={() => {
            document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </div>

      <main id="catalogo" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#5A7365]">Catálogo Exclusivo</span>
            <h2 className="font-serif text-3xl text-[#1C3326] mt-1">Nuestros Regalos Destacados</h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'Todos' },
              { id: 'cuadros-led', label: 'Cuadros LED' },
              { id: 'imantados', label: 'Imantados' },
              { id: 'packs', label: 'Packs de Regalo' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-[#2D4A3E] text-white shadow-sm'
                    : 'bg-white border border-[#D5E2D3] text-[#4A5D52] hover:bg-[#EBF2EA]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              isLiked={wishlist.includes(product.id)}
              onToggleLike={toggleWishlist}
              onAddToCart={handleAddToCart}
              onOpenCustomizer={(p) => {
                setSelectedProductForCustom(p);
                setCustomizerOpen(true);
              }}
            />
          ))}
        </div>
      </main>

      <div className="reveal">
        <Faq />
      </div>

      <div className="reveal">
        <Footer />
      </div>

      {/* Modales */}
      <AdminLogin 
        isOpen={adminLoginOpen}
        onClose={() => setAdminLoginOpen(false)}
        onLoginSuccess={() => setIsAdminLoggedIn(true)}
      />

      <CustomizerModal 
        product={selectedProductForCustom}
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
        onConfirm={handleAddToCart}
      />

      <CartDrawer 
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onRemoveItem={(index) => setCart(prev => prev.filter((_, i) => i !== index))}
      />
    </div>
  );
}