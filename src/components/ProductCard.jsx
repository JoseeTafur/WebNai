import React from 'react';
import { Star, Heart, Sparkles, Plus } from 'lucide-react';

export default function ProductCard({ product, isLiked, onToggleLike, onAddToCart, onOpenCustomizer }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E3ECE1] overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group relative">
      
      {/* Badge */}
      <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-[#2D4A3E] text-white text-[10px] font-semibold tracking-wide shadow-sm">
        {product.badge}
      </span>

      {/* Botón Wishlist */}
      <button 
        onClick={() => onToggleLike(product.id)}
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#1C3326] hover:bg-white transition-colors shadow-sm"
      >
        <Heart size={16} className={isLiked ? "fill-[#C85A5A] text-[#C85A5A]" : ""} />
      </button>

      {/* Imagen */}
      <div className="relative h-64 overflow-hidden bg-[#F2EFE9]">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Info */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1 text-xs text-[#D4A359] mb-1.5">
            <Star size={13} className="fill-[#D4A359]" />
            <span className="font-bold text-[#1C3326]">{product.rating}</span>
            <span className="text-[#8A9B90]">({product.reviews} opiniones)</span>
          </div>

          <h3 className="font-serif font-medium text-lg text-[#1C3326] group-hover:text-[#2D4A3E] transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-[#5A7365] mt-1.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Acciones */}
        <div className="mt-5 pt-3 border-t border-[#F0F4EF] flex items-center justify-between">
          <div>
            <span className="text-xs text-[#8A9B90] line-through mr-1.5">S/ {product.originalPrice.toFixed(2)}</span>
            <span className="text-lg font-bold text-[#1C3326]">S/ {product.price.toFixed(2)}</span>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={() => onOpenCustomizer(product)}
              className="p-2 rounded-lg bg-[#EBF2EA] text-[#2D4A3E] hover:bg-[#C5D8C1] transition-colors"
              title="Personalizar foto"
            >
              <Sparkles size={16} />
            </button>

            <button 
              onClick={() => onAddToCart(product)}
              className="px-3 py-2 rounded-lg bg-[#2D4A3E] text-white hover:bg-[#1C3326] transition-colors text-xs font-semibold flex items-center gap-1 shadow-sm"
            >
              <Plus size={14} /> Añadir
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}