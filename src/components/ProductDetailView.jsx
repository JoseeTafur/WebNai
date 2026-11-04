import React, { useState } from 'react';
import Breadcrumbs from './Breadcrumbs';
import { ShoppingBag, Sparkles, ShieldCheck, Truck, RotateCcw, Plus, Minus } from 'lucide-react';

export default function ProductDetailView({ 
  product, 
  onBack, 
  onNavigateHome, 
  onAddToCart, 
  onOpenCustomizer 
}) {
  const [quantity, setQuantity] = useState(1);
  const [selectedPack, setSelectedPack] = useState('1 und');
  const [activeImage, setActiveImage] = useState(product?.image);

  if (!product) return null;

  const galleryImages = [
    product.image,
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600',
  ];

  const handleAddToCartWithQty = () => {
    onAddToCart({
      ...product,
      quantity,
      selectedPack
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <Breadcrumbs 
        items={[
          { label: 'Colecciones', action: onBack },
          { label: product.category, action: onBack },
          { label: product.name }
        ]}
        onNavigate={onNavigateHome}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Galería de imágenes */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          <div className="flex sm:flex-col gap-3 shrink-0 overflow-x-auto sm:overflow-y-auto">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                  activeImage === img ? 'border-[#2D4A3E] scale-105 shadow-xs' : 'border-[#E3ECE1] opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          <div className="flex-1 aspect-square rounded-3xl overflow-hidden border border-[#C5D8C1] bg-white relative shadow-xs">
            <img 
              src={activeImage || product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />

            {product.badge && (
              <span className="absolute top-4 left-4 bg-[#E0C097] text-[#1C3326] text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                {product.badge}
              </span>
            )}
          </div>
        </div>

        {/* Panel de detalles del producto */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C3326] leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-3 mt-3">
              <span className="font-serif font-bold text-2xl text-[#2D4A3E]">
                S/ {product.price.toFixed(2)}
              </span>
              {product.oldPrice && (
                <>
                  <span className="text-sm text-stone-400 line-through">
                    S/ {product.oldPrice.toFixed(2)}
                  </span>
                  <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                    PROMO
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="bg-[#EBF2EA] p-4 rounded-2xl border border-[#C5D8C1] flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="font-bold text-xs text-[#1C3326] flex items-center gap-1.5">
                <Sparkles size={14} className="text-[#D4A359]" /> Diseña tu producto con tus fotos
              </span>
              <p className="text-[11px] text-[#5A7365]">Sube tu foto y obsérvala antes de comprar.</p>
            </div>
            
            <button
              onClick={() => onOpenCustomizer(product)}
              className="px-4 py-2 rounded-full bg-[#2D4A3E] text-white font-bold text-xs hover:bg-[#1C3326] transition-colors shrink-0 cursor-pointer shadow-xs"
            >
              Empezar
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 bg-[#FDFBF7] p-3 rounded-2xl border border-[#E3ECE1] text-center text-[10px] text-[#5A7365]">
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck size={16} className="text-[#2D4A3E]" />
              <span className="font-semibold text-[#1C3326]">Garantía</span>
              <span>De satisfacción</span>
            </div>
            <div className="flex flex-col items-center gap-1 border-x border-[#E3ECE1] px-1">
              <RotateCcw size={16} className="text-[#2D4A3E]" />
              <span className="font-semibold text-[#1C3326]">Pega y despega</span>
              <span>Sin marcas</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Truck size={16} className="text-[#2D4A3E]" />
              <span className="font-semibold text-[#1C3326]">Envíos</span>
              <span>A todo el Perú</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#1C3326] uppercase tracking-wider">
              PAQUETES: <span className="text-[#5A7365] normal-case">{selectedPack}</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['1 und', '3 und', '6 und', '9 und'].map((pack) => (
                <button
                  key={pack}
                  onClick={() => setSelectedPack(pack)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    selectedPack === pack
                      ? 'bg-[#1C3326] text-white border-[#1C3326] shadow-xs'
                      : 'bg-white text-[#2C3531] border-[#C5D8C1] hover:bg-[#F5F0E6]'
                  }`}
                >
                  {pack}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <label className="block text-xs font-bold text-[#1C3326]">Cantidad:</label>
            <div className="flex gap-3">
              <div className="flex items-center bg-white rounded-full border border-[#C5D8C1] px-3 py-1">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 text-[#5A7365] hover:text-[#1C3326] cursor-pointer"
                >
                  <Minus size={14} />
                </button>
                <span className="px-4 font-bold text-xs text-[#1C3326]">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 text-[#5A7365] hover:text-[#1C3326] cursor-pointer"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                onClick={handleAddToCartWithQty}
                className="flex-1 py-3.5 px-6 rounded-full bg-[#2D4A3E] text-white font-bold text-xs hover:bg-[#1C3326] transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag size={16} />
                <span>Personaliza tu foto para añadir al carrito</span>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E3ECE1] space-y-2">
            <h4 className="font-bold text-xs text-[#1C3326] uppercase tracking-wider">Descripción del producto</h4>
            <p className="text-xs text-[#5A7365] leading-relaxed">
              {product.description || 'Detalle artesanal grabado sobre pino seleccionado. Incluye sistema de iluminación cálida LED y acabado de alta durabilidad.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}