import React, { useEffect, useState } from 'react';
import { IconX } from './AdminIcons';

export default function CrudModal({ isOpen, onClose, title, subtitle, children, maxWidth = "max-w-xl" }) {
  const [shouldRender, setShouldRender] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Pequeño delay para activar las transiciones CSS de entrada
      const timer = setTimeout(() => setAnimate(true), 10);
      return () => clearTimeout(timer);
    } else {
      setAnimate(false);
      // Esperar a que termine la animación de salida antes de desmontar
      const timer = setTimeout(() => setShouldRender(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  return (
    <div 
      onClick={onClose}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto transition-all duration-300 ease-out ${
        animate 
          ? 'bg-[#1C3326]/60 backdrop-blur-md opacity-100' 
          : 'bg-black/0 backdrop-blur-none opacity-0'
      }`}
    >
      {/* Tarjeta emergente con animación de escala y desvanecimiento */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`bg-[#FDFBF7] rounded-3xl w-full ${maxWidth} shadow-2xl border border-[#C5D8C1] overflow-hidden transform transition-all duration-300 ease-out my-8 ${
          animate 
            ? 'scale-100 translate-y-0 opacity-100' 
            : 'scale-95 translate-y-4 opacity-0'
        }`}
      >
        {/* Cabecera del Modal */}
        <div className="bg-[#1C3326] text-white p-5 sm:p-6 flex items-center justify-between border-b border-[#2D4A3E]">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#E8F0E6]">{title}</h3>
            {subtitle && <p className="text-xs text-[#C5D8C1] mt-0.5">{subtitle}</p>}
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-[#C5D8C1] hover:bg-[#2D4A3E] hover:text-white transition-colors cursor-pointer"
          >
            <IconX size={20} />
          </button>
        </div>

        {/* Cuerpo del Formulario */}
        <div className="p-6 sm:p-8 space-y-4 max-h-[75vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}