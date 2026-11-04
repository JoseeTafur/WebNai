import React, { useState } from 'react';
import { X, Upload, Sparkles, Check } from 'lucide-react';

export default function CustomizerModal({ product, isOpen, onClose, onConfirm }) {
  const [customText, setCustomText] = useState('Siempre Juntos');
  const [previewImage, setPreviewImage] = useState(null);

  if (!isOpen || !product) return null;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    onConfirm({
      ...product,
      customText,
      customImage: previewImage || product.image,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 relative shadow-2xl overflow-hidden border border-emerald-900/10 max-h-[90vh] overflow-y-auto">
        
        {/* Botón Cerrar */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-stone-400 hover:text-stone-700 p-2 rounded-full bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs mb-2">
          <Sparkles className="w-4 h-4" /> Personaliza tu regalo
        </div>
        <h3 className="text-2xl font-serif font-bold text-stone-900 mb-6">{product.name}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Vista previa en tiempo real */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
              Vista Previa Aproximada
            </label>
            <div className="relative aspect-square rounded-2xl bg-stone-900 overflow-hidden flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-stone-700">
              {previewImage ? (
                <img src={previewImage} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-60" />
              ) : null}
              
              <div className="relative z-10 space-y-2 text-amber-200 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]">
                <p className="font-serif italic text-xl tracking-wide">
                  "{customText || 'Escribe tu frase'}"
                </p>
              </div>
            </div>
            <p className="text-[11px] text-stone-400 text-center">
              Revisamos la resolución de tu foto antes de grabar/imprimir.
            </p>
          </div>

          {/* Opciones de personalización */}
          <div className="space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              
              {/* Subir foto */}
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-2">
                  1. Sube tu fotografía
                </label>
                <label className="flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed border-emerald-800/30 rounded-xl bg-emerald-50/50 hover:bg-emerald-50 cursor-pointer transition-colors text-emerald-900 text-sm font-medium">
                  <Upload className="w-4 h-4" />
                  {previewImage ? 'Cambiar Imagen' : 'Cargar Foto desde Galería'}
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>

              {/* Frase grabada */}
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-2">
                  2. Frase o Nombres para el grabado
                </label>
                <input 
                  type="text" 
                  value={customText} 
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Ej. Carlos & María 14/02/2026"
                  maxLength={40}
                  className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-800 focus:outline-none text-sm"
                />
                <span className="text-[10px] text-stone-400 float-right mt-1">Máx 40 caracteres</span>
              </div>
            </div>

            {/* Confirmar */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-400 block">Total</span>
                <span className="text-xl font-bold text-emerald-950">S/ {product.price.toFixed(2)}</span>
              </div>
              <button 
                onClick={handleSave}
                className="px-6 py-3 bg-emerald-900 hover:bg-emerald-950 text-white font-medium rounded-xl transition-all shadow-md flex items-center gap-2 text-sm"
              >
                <Check className="w-4 h-4" /> Guardar y Agregar
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}