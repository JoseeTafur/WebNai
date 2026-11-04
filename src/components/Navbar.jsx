import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, Sparkles, ChevronDown, ArrowRight, ShieldCheck } from 'lucide-react';
import { PRODUCTS } from '../data/products'; // <-- ajusta la ruta según donde tengas products.js

// Categorías que tienen panel desplegable (el orden es el del menú)
const MENU_CATEGORIES = [
  { key: 'cuadros-led', label: 'Cuadros LED' },
  { key: 'imantados', label: 'Imantados' },
  { key: 'packs', label: 'Packs de Regalo' },
];

// Frase corta que acompaña a cada panel
const TAGLINES = {
  'cuadros-led': 'Luz cálida, madera de pino y tu recuerdo favorito grabado a láser.',
  imantados: 'Tus fotos favoritas, siempre a la vista en la refri.',
  packs: 'Regalos completos, listos para emocionar a quien más quieres.',
};

export default function Navbar({ cartCount = 0, wishlistCount = 0, onOpenCart, onSelectCategory, selectedCategory, onOpenAdminLogin }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [openMenu, setOpenMenu] = useState(null);

  // Mantiene el último contenido mientras el panel se desvanece (evita que se vacíe de golpe)
  const lastMenuRef = useRef(MENU_CATEGORIES[0].key);
  if (openMenu) lastMenuRef.current = openMenu;
  const panelProducts = PRODUCTS.filter((p) => p.category === lastMenuRef.current);

  // Escuchar el scroll de la ventana para mover ligeramente las hojas
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Estilo CSS base de la hoja
  const leafStyle = {
    borderRadius: '47% 53% 100% 0% / 56% 0% 100% 44%',
  };

  // Desplazamiento reactivo según el scroll (factor muy suave)
  const scrollOffsetLeft = Math.sin(scrollY * 0.005) * 8;
  const scrollOffsetRight = Math.cos(scrollY * 0.005) * 8;

  return (
    <header
      onMouseLeave={() => setOpenMenu(null)}
      className="sticky top-0 z-40 bg-[#C5D8C1] shadow-sm transition-all duration-300 relative"
    >
      {/* Estilos CSS inyectados para el mecido continuo de brisa */}
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
        <span>Envíos a todo el Perú • Regalos únicos y listos para emocionar</span>
        <Sparkles size={14} className="text-[#E0C097] animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2 group">
              <span className="font-serif text-3xl font-bold tracking-tight text-[#1C3326] group-hover:text-[#2D4A3E] transition-colors">
                Nailu pava
              </span>
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#EBF2EA] text-[#2D4A3E] shadow-sm">
                <Heart size={14} className="fill-[#8FB38D] text-[#2D4A3E]" />
              </span>
            </a>
          </div>

          {/* Menú Desktop */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-[#243E30]">
            {MENU_CATEGORIES.map(({ key, label }) => (
              <button
                key={key}
                onMouseEnter={() => setOpenMenu(key)}
                onClick={() => { onSelectCategory(key); setOpenMenu(null); }}
                className={`flex items-center gap-1 transition-colors hover:text-[#0F2218] ${
                  selectedCategory === key ? 'font-bold border-b-2 border-[#243E30] pb-1' : ''
                }`}
              >
                {label}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${openMenu === key ? 'rotate-180' : ''}`}
                />
              </button>
            ))}
            <a href="#nosotros" onMouseEnter={() => setOpenMenu(null)} className="transition-colors hover:text-[#0F2218]">Nosotros</a>
            <a href="#contacto" onMouseEnter={() => setOpenMenu(null)} className="transition-colors hover:text-[#0F2218]">Contacto</a>
          </nav>

          {/* Acciones */}
          <div className="flex items-center gap-4">
            <button 
              className="relative p-2 rounded-full text-[#1C3326] hover:bg-white/40 transition-colors"
              title="Lista de deseos"
            >
              <Heart size={20} className={wishlistCount > 0 ? "fill-[#C85A5A] text-[#C85A5A]" : ""} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#C85A5A] text-white text-[10px] flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Agrega esto al lado del botón de carrito en las acciones de Navbar */}
<button 
  onClick={onOpenAdminLogin} 
  className="p-2 rounded-full text-[#1C3326] hover:bg-white/40 transition-colors"
  title="Acceso Administrador"
>
  <ShieldCheck size={20} />
</button>

            <button 
              onClick={onOpenCart}
              className="relative p-2 rounded-full text-[#1C3326] hover:bg-white/40 transition-colors"
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
              className="md:hidden p-2 rounded-lg text-[#1C3326] hover:bg-white/40 transition-colors"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </div>

      {/* Velo suave detrás del panel */}
      <div
        className={`hidden md:block absolute left-0 top-full w-full h-screen bg-[#1C3326]/15 pointer-events-none z-20 transition-opacity duration-300 ${
          openMenu ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Mega menú desktop: arranca debajo de las hojas (pt-[34px] deja la cenefa libre) */}
      <div
        className={`hidden md:block absolute left-0 top-full w-full z-30 pt-[34px] transition-all duration-300 ease-out ${
          openMenu ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible pointer-events-none'
        }`}
      >
        <div className="relative overflow-hidden bg-gradient-to-b from-[#FCFBF8] to-[#EEF4EC] border-y border-[#B2CDB0] shadow-[0_24px_40px_-14px_rgba(28,51,38,0.3)]">
          {/* Hojas decorativas de fondo */}
          <div aria-hidden="true" style={leafStyle} className="absolute -top-8 -right-8 w-40 h-40 bg-[#C5D8C1]/40 rotate-[140deg]" />
          <div aria-hidden="true" style={leafStyle} className="absolute -bottom-12 left-[38%] w-28 h-28 bg-[#C5D8C1]/30 rotate-[40deg]" />
          <div aria-hidden="true" style={leafStyle} className="absolute -bottom-10 -left-8 w-36 h-36 bg-[#8FB38D]/20 rotate-[200deg]" />

          <div className="relative max-w-7xl mx-auto px-8 py-9 flex items-stretch gap-10">
            {/* Izquierda: título, frase y lista */}
            <div className="w-72 shrink-0 flex flex-col">
              <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-[#EBF2EA] border border-[#B2CDB0] px-3 py-1 text-[11px] font-semibold text-[#2D4A3E]">
                <Sparkles size={12} className="text-[#C9A26B]" />
                Colección
              </span>
              <h3 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#1C3326]">
                {MENU_CATEGORIES.find((c) => c.key === lastMenuRef.current)?.label}
              </h3>
              <p className="mt-1 text-sm text-[#4F6B5C] leading-relaxed">{TAGLINES[lastMenuRef.current]}</p>

              <ul className="mt-5 space-y-2.5 text-sm font-semibold text-[#1C3326]">
                {panelProducts.map((product) => (
                  <li key={product.id}>
                    <button
                      onClick={() => { onSelectCategory(lastMenuRef.current); setOpenMenu(null); }}
                      className="group flex items-center gap-2.5 text-left hover:text-[#2D4A3E]"
                    >
                      <span
                        style={leafStyle}
                        className="w-2.5 h-2.5 shrink-0 bg-[#8FB38D] rotate-[135deg] transition-transform duration-300 group-hover:scale-150"
                      />
                      <span className="group-hover:translate-x-0.5 transition-transform">{product.name}</span>
                    </button>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => { onSelectCategory(lastMenuRef.current); setOpenMenu(null); }}
                className="mt-auto pt-5 self-start"
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-[#2D4A3E] px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#1C3326] hover:gap-3 transition-all">
                  Ver todo
                  <ArrowRight size={14} />
                </span>
              </button>
            </div>

            {/* Divisor punteado */}
            <div aria-hidden="true" className="w-px self-stretch border-l border-dashed border-[#B2CDB0]" />

            {/* Derecha: tarjetas con aparición escalonada */}
            <div className="flex flex-1 justify-end gap-5">
              {panelProducts.slice(0, 4).map((product, i) => (
                <button
                  key={product.id}
                  onClick={() => { onSelectCategory(lastMenuRef.current); setOpenMenu(null); }}
                  style={{ transitionDelay: openMenu ? `${90 + i * 70}ms` : '0ms' }}
                  className={`relative w-44 h-56 rounded-3xl overflow-hidden bg-[#B2CDB0] ring-4 ring-white shadow-lg group
                    transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl
                    ${openMenu ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-[#1C3326]/85 via-[#1C3326]/20 to-transparent" />

                  {product.badge && (
                    <span className="absolute top-3 left-3 rounded-full bg-[#E0C097] px-2.5 py-0.5 text-[10px] font-bold text-[#1C3326] shadow-sm">
                      {product.badge}
                    </span>
                  )}

                  <span className="absolute inset-x-0 bottom-0 p-3.5 text-left text-white">
                    <span className="block text-sm font-bold leading-tight line-clamp-2">{product.name}</span>
                    <span className="mt-1.5 inline-block rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-bold text-[#1C3326]">
                      S/ {product.price.toFixed(2)}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Franja inferior */}
          <div className="relative border-t border-dashed border-[#B2CDB0] bg-[#C5D8C1]/40 py-2 text-center text-[11px] font-medium tracking-wide text-[#2D4A3E]">
            Hecho a mano con cariño • Envíos a todo el Perú
          </div>
        </div>
      </div>

      {/* Menú Móvil */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#C5D8C1] border-t border-[#B2CDB0] px-4 pt-3 pb-6 space-y-3">
          <button 
            onClick={() => { onSelectCategory('cuadros-led'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 font-medium text-[#1C3326]"
          >
            Cuadros LED
          </button>
          <button 
            onClick={() => { onSelectCategory('imantados'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 font-medium text-[#1C3326]"
          >
            Imantados
          </button>
          <button 
            onClick={() => { onSelectCategory('packs'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 font-medium text-[#1C3326]"
          >
            Packs de Regalo
          </button>
          <a href="#nosotros" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-medium text-[#1C3326]">Nosotros</a>
          <a href="#contacto" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-medium text-[#1C3326]">Contacto</a>
        </div>
      )}

      {/* CENEFA CON MOVIMIENTO DE BRISA + REACCIÓN AL SCROLL */}
      <div className="absolute top-[99%] left-0 w-full h-8 pointer-events-none overflow-hidden z-10">
        <div className="relative w-full h-full flex justify-between items-start opacity-95">
          
          {/* Grupo 1 */}
          <div 
            className="flex gap-[-8px] -ml-2 transition-transform duration-100 ease-out"
            style={{ transform: `translateX(${scrollOffsetLeft}px)` }}
          >
            <div style={leafStyle} className="w-8 h-8 bg-[#C5D8C1] rotate-[135deg] -translate-y-2 shadow-xs animate-breeze-left" />
            <div style={leafStyle} className="w-6 h-6 bg-[#C5D8C1] rotate-[160deg] -translate-x-2 -translate-y-1 animate-breeze-right" />
            <div style={leafStyle} className="w-9 h-9 bg-[#C5D8C1] rotate-[110deg] -translate-x-4 -translate-y-3 animate-breeze-left" />
          </div>

          {/* Grupo 2 */}
          <div 
            className="flex gap-[-6px] transition-transform duration-100 ease-out"
            style={{ transform: `translateX(${scrollOffsetRight}px)` }}
          >
            <div style={leafStyle} className="w-7 h-7 bg-[#C5D8C1] rotate-[145deg] -translate-y-2 animate-breeze-right" />
            <div style={leafStyle} className="w-10 h-10 bg-[#C5D8C1] rotate-[120deg] -translate-x-3 -translate-y-4 animate-breeze-left" />
            <div style={leafStyle} className="w-6 h-6 bg-[#C5D8C1] rotate-[165deg] -translate-x-5 -translate-y-1 animate-breeze-right" />
          </div>

          {/* Grupo 3 (Centro) */}
          <div 
            className="flex gap-[-8px] transition-transform duration-100 ease-out"
            style={{ transform: `translateX(${-scrollOffsetLeft}px)` }}
          >
            <div style={leafStyle} className="w-9 h-9 bg-[#C5D8C1] rotate-[130deg] -translate-y-3 animate-breeze-left" />
            <div style={leafStyle} className="w-6 h-6 bg-[#C5D8C1] rotate-[150deg] -translate-x-2 -translate-y-1 animate-breeze-right" />
            <div style={leafStyle} className="w-11 h-11 bg-[#C5D8C1] rotate-[115deg] -translate-x-5 -translate-y-5 animate-breeze-left" />
            <div style={leafStyle} className="w-7 h-7 bg-[#C5D8C1] rotate-[140deg] -translate-x-8 -translate-y-2 animate-breeze-right" />
          </div>

          {/* Grupo 4 */}
          <div 
            className="flex gap-[-6px] transition-transform duration-100 ease-out"
            style={{ transform: `translateX(${-scrollOffsetRight}px)` }}
          >
            <div style={leafStyle} className="w-6 h-6 bg-[#C5D8C1] rotate-[155deg] -translate-y-1 animate-breeze-right" />
            <div style={leafStyle} className="w-10 h-10 bg-[#C5D8C1] rotate-[125deg] -translate-x-3 -translate-y-4 animate-breeze-left" />
            <div style={leafStyle} className="w-8 h-8 bg-[#C5D8C1] rotate-[135deg] -translate-x-6 -translate-y-2 animate-breeze-right" />
          </div>
          

          {/* Grupo 5 */}
          <div 
            className="flex gap-[-8px] -mr-2 transition-transform duration-100 ease-out"
            style={{ transform: `translateX(${scrollOffsetLeft}px)` }}
          >
            <div style={leafStyle} className="w-8 h-8 bg-[#C5D8C1] rotate-[120deg] -translate-y-2 animate-breeze-left" />
            <div style={leafStyle} className="w-10 h-10 bg-[#C5D8C1] rotate-[140deg] -translate-x-4 -translate-y-4 animate-breeze-right" />
            <div style={leafStyle} className="w-6 h-6 bg-[#C5D8C1] rotate-[160deg] -translate-x-6 -translate-y-1 animate-breeze-left" />
          </div>

        </div>
      </div>
    </header>
  );
}