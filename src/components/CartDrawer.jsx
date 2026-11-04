import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cart, onRemoveItem }) {
  if (!isOpen) return null;

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handleCheckoutWhatsApp = () => {
    let message = "Hola Nailu! 🌸 Quisiera realizar el siguiente pedido:\n\n";
    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}* - S/ ${item.price.toFixed(2)}\n`;
      if (item.customText) message += `   - Frase: "${item.customText}"\n`;
    });
    message += `\n*Total:* S/ ${total.toFixed(2)}`;
    
    const url = `https://wa.me/51933381303?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-sm flex justify-end">
      <div className="bg-white w-full max-w-md h-full p-6 flex flex-col justify-between shadow-2xl relative">
        
        {/* Cabecera Carrito */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-xl">
              <ShoppingBag className="w-5 h-5 text-emerald-800" /> Carrito de Compras
            </div>
            <button onClick={onClose} className="p-2 text-stone-400 hover:text-stone-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lista de Items */}
          <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            {cart.length === 0 ? (
              <p className="text-center text-stone-400 text-sm py-12">Tu carrito está vacío por ahora.</p>
            ) : (
              cart.map((item, index) => (
                <div key={index} className="flex gap-4 p-3 bg-stone-50 rounded-2xl border border-stone-200/60 items-center">
                  <img src={item.customImage || item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-stone-800 truncate">{item.name}</h4>
                    {item.customText && (
                      <p className="text-[11px] text-emerald-800 italic truncate">"{item.customText}"</p>
                    )}
                    <span className="text-sm font-bold text-emerald-950 block mt-1">S/ {item.price.toFixed(2)}</span>
                  </div>
                  <button onClick={() => onRemoveItem(index)} className="text-stone-400 hover:text-rose-500 p-2">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pie del Carrito */}
        {cart.length > 0 && (
          <div className="pt-4 border-t border-stone-100 space-y-4">
            <div className="flex justify-between items-center text-base font-bold text-stone-900">
              <span>Total Estimado</span>
              <span className="text-xl text-emerald-950">S/ {total.toFixed(2)}</span>
            </div>

            <button 
              onClick={handleCheckoutWhatsApp}
              className="w-full py-3.5 bg-emerald-900 hover:bg-emerald-950 text-white font-medium rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm"
            >
              Pedir por WhatsApp <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}