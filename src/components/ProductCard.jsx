import React from 'react';
import { Heart, ShoppingBag, Sparkles } from 'lucide-react';

export default function ProductCard({ product, isLiked, onToggleLike, onAddToCart, onOpenCustomizer, onClickProduct }) {
  return (
    <div 
      onClick={() => onClickProduct && onClickProduct(product)}
      className="bg-white rounded-3xl overflow-hidden border border-[#E3ECE1] shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
    >
      <div className="relative aspect-square overflow-hidden bg-stone-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />

        {product.badge && (
          <span className="absolute top-3 left-3 bg-[#E0C097] text-[#1C3326] text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
            {product.badge}
          </span>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike(product.id);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm text-[#1C3326] hover:bg-white transition-colors cursor-pointer"
        >
          <Heart size={16} className={isLiked ? "fill-[#C85A5A] text-[#C85A5A]" : ""} />
        </button>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A7365] block">{product.category}</span>
          <h3 className="font-serif font-bold text-base text-[#1C3326] group-hover:text-[#2D4A3E] transition-colors leading-snug mt-0.5">
            {product.name}
          </h3>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#F0F4EF]">
          <div>
            <span className="font-serif font-bold text-lg text-[#2D4A3E]">S/ {product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="text-xs text-stone-400 line-through block -mt-1">S/ {product.oldPrice.toFixed(2)}</span>
            )}
          </div>

          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => onOpenCustomizer(product)}
              className="p-2.5 rounded-full bg-[#EBF2EA] text-[#2D4A3E] hover:bg-[#2D4A3E] hover:text-white transition-colors cursor-pointer"
              title="Personalizar con fotos"
            >
              <Sparkles size={15} />
            </button>

            <button
              onClick={() => onAddToCart(product)}
              className="p-2.5 rounded-full bg-[#2D4A3E] text-white hover:bg-[#1C3326] transition-colors cursor-pointer"
              title="Agregar al carrito"
            >
              <ShoppingBag size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}