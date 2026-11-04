import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Heart, Menu, X, Sparkles, ChevronDown, ArrowRight, ShieldCheck } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export default function Navbar({ 
  cartCount = 0, 
  wishlistCount = 0, 
  onOpenCart, 
  onSelectCategory, 
  selectedCategory, 
  onOpenAdminLogin,
  announcementText = "Envíos a todo el Perú • Regalos únicos y listos para emocionar",
  products = PRODUCTS,
  categories = [
    { id: 'cuadros-led', name: 'Cuadros LED', tagline: 'Luz cálida, madera de pino y tu recuerdo favorito grabado a láser.', isActive: true },
    { id: 'imantados', name: 'Imantados', tagline: 'Tus fotos favoritas, siempre a la vista en la refri.', isActive: true },
    { id: 'packs', name: 'Packs de Regalo', tagline: 'Regalos completos, listos para emocionar a quien más quieres.', isActive: true }
  ],
  onSelectProduct
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [openMenu, setOpenMenu] = useState(null);

  const activeCategories = categories.filter(c => c.isActive !== false);

  const lastMenuRef = useRef(activeCategories[0]?.id || 'cuadros-led');
  if (openMenu) lastMenuRef.current = openMenu;
  
  const panelProducts = products.filter((p) => p.category === lastMenuRef.current && p.isActive !== false);
  const currentCategoryData = activeCategories.find(c => c.id === lastMenuRef.current) || activeCategories[0];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const leafStyle = {
    borderRadius: '47% 53% 100% 0% / 56% 0% 100% 44%',
  };

  const scrollOffsetLeft = Math.sin(scrollY * 0.005) * 8;
  const scrollOffsetRight = Math.cos(scrollY * 0.005) * 8;

  return (
    <header
      onMouseLeave={() => setOpenMenu(null)}
      className="sticky top-0 z-50 bg-[#C5D8C1] shadow-xs transition-all duration-300 relative"
    >
      <style>{`
        @keyframes breezeLeft {
          0%, 100% { transform: rotate(0deg) translateY(0px); }
          50% { transform: rotate(-5deg) translateY(-2px); }
        }
        @keyframes breezeRight {
          0%, 100% { transform: rotate(0deg) translateY(0px); }
          50% { transform: rotate(6deg) translateY(1px); }
        }
        .animate-breeze-left {
          animation: breezeLeft 4s ease-in-out infinite;
        }
        .animate-breeze-right {
          animation: breezeRight 5s ease-in-out infinite;
        }
      `}</style>

      {/* Barra superior de anuncios */}
      <div className="bg-[#2D4A3E] text-[#E8F0E6] text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles size={14} className="text-[#E0C097] animate-pulse" />
        <span>{announcementText}</span>
        <Sparkles size={14} className="text-[#E0C097] animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2 group">
              <span className="font-serif text-3xl font-bold tracking-tight text-[#1C3326] group-hover:text-[#2D4A3E] transition-colors">
                Nailu
              </span>
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#EBF2EA] text-[#2D4A3E] shadow-xs">
                <Heart size={14} className="fill-[#8FB38D] text-[#2D4A3E]" />
              </span>
            </a>
          </div>

          {/* Menú Desktop con línea animada tipo Wolpic */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-[#243E30]">
            {activeCategories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onMouseEnter={() => setOpenMenu(cat.id)}
                  onClick={() => { onSelectCategory(cat.id); setOpenMenu(null); }}
                  className="group relative py-2 flex items-center gap-1 transition-colors hover:text-[#0F2218] cursor-pointer"
                >
                  <span className={isSelected ? 'font-bold' : ''}>{cat.name}</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${openMenu === cat.id ? 'rotate-180' : ''}`}
                  />
                  
                  <span 
                    className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#243E30] transition-transform duration-300 ease-out origin-left ${
                      isSelected ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`} 
                  />
                </button>
              );
            })}

            <a 
              href="#nosotros" 
              onMouseEnter={() => setOpenMenu(null)} 
              className="group relative py-2 transition-colors hover:text-[#0F2218]"
            >
              <span>Nosotros</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#243E30] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
            </a>

            <a 
              href="#contacto" 
              onMouseEnter={() => setOpenMenu(null)} 
              className="group relative py-2 transition-colors hover:text-[#0F2218]"
            >
              <span>Contacto</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#243E30] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
            </a>
          </nav>

          {/* Acciones */}
          <div className="flex items-center gap-4">
            <button 
              className="relative p-2 rounded-full text-[#1C3326] hover:bg-white/40 transition-colors cursor-pointer"
              title="Lista de deseos"
            >
              <Heart size={20} className={wishlistCount > 0 ? "fill-[#C85A5A] text-[#C85A5A]" : ""} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#C85A5A] text-white text-[10px] flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button 
              onClick={onOpenAdminLogin} 
              className="p-2 rounded-full text-[#1C3326] hover:bg-white/40 transition-colors cursor-pointer"
              title="Acceso Administrador"
            >
              <ShieldCheck size={20} />
            </button>

            <button 
              onClick={onOpenCart}
              className="relative p-2 rounded-full text-[#1C3326] hover:bg-white/40 transition-colors cursor-pointer"
              title="Carrito de compras"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#2D4A3E] text-white text-[10px] flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#1C3326] hover:bg-white/40 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </div>

      {/* CENEFA DE HOJAS FLOTANTE */}
      <div className="absolute top-[99%] left-0 w-full h-8 pointer-events-none overflow-hidden z-40">
        <div className="relative w-full h-full flex justify-between items-start opacity-95">
          <div className="flex gap-[-8px] -ml-2 transition-transform duration-100 ease-out" style={{ transform: `translateX(${scrollOffsetLeft}px)` }}>
            <div style={leafStyle} className="w-8 h-8 bg-[#C5D8C1] rotate-[135deg] -translate-y-2 shadow-xs animate-breeze-left" />
            <div style={leafStyle} className="w-6 h-6 bg-[#C5D8C1] rotate-[160deg] -translate-x-2 -translate-y-1 animate-breeze-right" />
            <div style={leafStyle} className="w-9 h-9 bg-[#C5D8C1] rotate-[110deg] -translate-x-4 -translate-y-3 animate-breeze-left" />
          </div>

          <div className="flex gap-[-6px] transition-transform duration-100 ease-out" style={{ transform: `translateX(${scrollOffsetRight}px)` }}>
            <div style={leafStyle} className="w-7 h-7 bg-[#C5D8C1] rotate-[145deg] -translate-y-2 animate-breeze-right" />
            <div style={leafStyle} className="w-10 h-10 bg-[#C5D8C1] rotate-[120deg] -translate-x-3 -translate-y-4 animate-breeze-left" />
            <div style={leafStyle} className="w-6 h-6 bg-[#C5D8C1] rotate-[165deg] -translate-x-5 -translate-y-1 animate-breeze-right" />
          </div>

          <div className="flex gap-[-8px] transition-transform duration-100 ease-out" style={{ transform: `translateX(${-scrollOffsetLeft}px)` }}>
            <div style={leafStyle} className="w-9 h-9 bg-[#C5D8C1] rotate-[130deg] -translate-y-3 animate-breeze-left" />
            <div style={leafStyle} className="w-6 h-6 bg-[#C5D8C1] rotate-[150deg] -translate-x-2 -translate-y-1 animate-breeze-right" />
            <div style={leafStyle} className="w-11 h-11 bg-[#C5D8C1] rotate-[115deg] -translate-x-5 -translate-y-5 animate-breeze-left" />
            <div style={leafStyle} className="w-7 h-7 bg-[#C5D8C1] rotate-[140deg] -translate-x-8 -translate-y-2 animate-breeze-right" />
          </div>

          <div className="flex gap-[-6px] transition-transform duration-100 ease-out" style={{ transform: `translateX(${-scrollOffsetRight}px)` }}>
            <div style={leafStyle} className="w-6 h-6 bg-[#C5D8C1] rotate-[155deg] -translate-y-1 animate-breeze-right" />
            <div style={leafStyle} className="w-10 h-10 bg-[#C5D8C1] rotate-[125deg] -translate-x-3 -translate-y-4 animate-breeze-left" />
            <div style={leafStyle} className="w-8 h-8 bg-[#C5D8C1] rotate-[135deg] -translate-x-6 -translate-y-2 animate-breeze-right" />
          </div>

          <div className="flex gap-[-8px] -mr-2 transition-transform duration-100 ease-out" style={{ transform: `translateX(${scrollOffsetLeft}px)` }}>
            <div style={leafStyle} className="w-8 h-8 bg-[#C5D8C1] rotate-[120deg] -translate-y-2 animate-breeze-left" />
            <div style={leafStyle} className="w-10 h-10 bg-[#C5D8C1] rotate-[140deg] -translate-x-4 -translate-y-4 animate-breeze-right" />
            <div style={leafStyle} className="w-6 h-6 bg-[#C5D8C1] rotate-[160deg] -translate-x-6 -translate-y-1 animate-breeze-left" />
          </div>
        </div>
      </div>

      {/* DESPLEGABLE TIPO WOLPIC */}
      <div
        className={`hidden md:block absolute left-0 right-0 top-full z-30 pt-7 transition-all duration-300 ease-out ${
          openMenu ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible pointer-events-none'
        }`}
      >
        <div className="bg-white border-b border-[#E3ECE1] shadow-2xl">
          <div className="max-w-7xl mx-auto px-8 py-8 flex items-start justify-between gap-12">
            
            <div className="w-64 shrink-0 space-y-4">
              <h3 className="font-serif text-2xl font-bold text-[#1C3326]">
                {currentCategoryData?.name}
              </h3>

              <ul className="space-y-3 text-xs font-semibold text-[#2C3531]">
                {panelProducts.slice(0, 5).map((product) => (
                  <li key={product.id}>
                    <button
                      onClick={() => { 
                        if (onSelectProduct) onSelectProduct(product);
                        else onSelectCategory(lastMenuRef.current);
                        setOpenMenu(null); 
                      }}
                      className="group relative inline-block text-left hover:text-[#2D4A3E] transition-colors cursor-pointer py-0.5"
                    >
                      <span className="truncate block max-w-[220px]">{product.name}</span>
                      <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#2D4A3E] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <button
                  onClick={() => { onSelectCategory(lastMenuRef.current); setOpenMenu(null); }}
                  className="group inline-flex items-center gap-1.5 text-xs font-bold text-[#2D4A3E] cursor-pointer"
                >
                  <span>Ver todos los modelos</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Tarjetas destacadas */}
            <div className="flex-1 grid grid-cols-4 gap-4">
              {panelProducts.slice(0, 4).map((product) => (
                <button
                  key={product.id}
                  onClick={() => { 
                    if (onSelectProduct) onSelectProduct(product);
                    else onSelectCategory(lastMenuRef.current);
                    setOpenMenu(null); 
                  }}
                  className="group relative h-52 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer border border-[#E3ECE1] bg-stone-100"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {product.badge && (
                    <span className="absolute top-2.5 left-2.5 bg-[#E0C097] text-[#1C3326] text-[9px] font-bold px-2 py-0.5 rounded-full">
                      {product.badge}
                    </span>
                  )}

                  <div className="absolute inset-x-0 bottom-0 p-3 text-left text-white">
                    <span className="block text-xs font-bold leading-tight line-clamp-2">{product.name}</span>
                    <span className="text-[10px] text-amber-200 font-semibold mt-0.5 block">S/ {product.price.toFixed(2)}</span>
                  </div>
                </button>
              ))}

              {panelProducts.length === 0 && (
                <div className="col-span-4 py-12 text-center text-xs text-[#5A7365] bg-[#FDFBF7] rounded-2xl border border-dashed border-[#C5D8C1]">
                  No hay productos activos en esta categoría.
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Menú Móvil */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#C5D8C1] border-t border-[#B2CDB0] px-4 pt-3 pb-6 space-y-3">
          {activeCategories.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => { onSelectCategory(cat.id); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 font-medium text-[#1C3326]"
            >
              {cat.name}
            </button>
          ))}
          <a href="#nosotros" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-medium text-[#1C3326]">Nosotros</a>
          <a href="#contacto" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-medium text-[#1C3326]">Contacto</a>
        </div>
      )}
    </header>
  );
}