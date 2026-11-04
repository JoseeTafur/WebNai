import React from 'react';
import heroNailu from '../images/hero-nailu.png';
import heroFrames from '../images/hero-frames.png';
import { ArrowRight, Sparkles, Heart, ShieldCheck, Truck } from 'lucide-react';

export default function Hero({ onExploreClick, onOpenCustomizer }) {
  // Estilo CSS de hoja botánica decorativa
  const leafStyle = {
    borderRadius: '47% 53% 100% 0% / 56% 0% 100% 44%',
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-[#FDFBF7]">
      {/* Elementos botánicos flotantes de fondo */}
      <div className="absolute top-10 left-6 pointer-events-none opacity-20 hidden md:block animate-pulse">
        <div style={leafStyle} className="w-12 h-12 bg-[#C5D8C1] rotate-[135deg]" />
      </div>
      <div className="absolute bottom-12 right-10 pointer-events-none opacity-20 hidden md:block">
        <div style={leafStyle} className="w-16 h-16 bg-[#2D4A3E] rotate-[35deg]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Columna Izquierda: Copywriting y Llamados a la Acción */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left z-10">
            
            {/* Tag de Marca */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF2EA] text-[#2D4A3E] text-xs font-semibold tracking-wide border border-[#C5D8C1]">
              <Heart size={12} className="fill-[#8FB38D] text-[#2D4A3E]" />
              <span>Regalos Personalizados en Perú</span>
            </div>

            {/* Titular Principal */}
            <h1 className="font-serif text-4xl sm:text-5xl xl:text-6xl text-[#1C3326] leading-[1.15] font-normal tracking-tight">
              Ilumina tus <br />
              <span className="italic font-light text-[#2D4A3E]">recuerdos más</span> especiales
            </h1>

            {/* Subtítulo */}
            <p className="text-base sm:text-lg text-[#5A7365] max-w-lg mx-auto lg:mx-0 font-normal leading-relaxed">
              Cuadros LED grabados a láser con base de madera de pino natural, fotos imantadas y detalles únicos hechos a mano para emocionar.
            </p>

            {/* Botones de Acción */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button 
                onClick={onExploreClick}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#2D4A3E] text-[#FDFBF7] font-medium text-sm hover:bg-[#1C3326] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Ver Cuadros LED</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={onOpenCustomizer}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white border border-[#A8C3A4] text-[#2D4A3E] font-medium text-sm hover:bg-[#EBF2EA] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <Sparkles size={16} className="text-[#D4A359]" />
                <span>Personalizar Mi Foto</span>
              </button>
            </div>

            {/* Garantías Rápidas en la Base */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#E8ECE6] max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
              <div>
                <div className="flex items-center justify-center lg:justify-start gap-1 text-[#2D4A3E] font-serif font-bold text-sm">
                  <ShieldCheck size={16} /> Aylu pavaza
                </div>
                <p className="text-[11px] text-[#5A7365] mt-0.5">Insertar descripción :v</p>
              </div>
              <div>
                <div className="flex items-center justify-center lg:justify-start gap-1 text-[#2D4A3E] font-serif font-bold text-sm">
                  <Sparkles size={16} className="text-[#D4A359]" /> la más pava
                </div>
                <p className="text-[11px] text-[#5A7365] mt-0.5">Precisión HD</p>
              </div>
              <div>
                <div className="flex items-center justify-center lg:justify-start gap-1 text-[#2D4A3E] font-serif font-bold text-sm">
                  <Truck size={16} /> Envíos Perú
                </div>
                <p className="text-[11px] text-[#5A7365] mt-0.5">Empaque seguro</p>
              </div>
            </div>

          </div>

          {/* Columna Derecha: Composición de Capas con Zoom en Cuadros */}
          <div className="lg:col-span-6 relative flex justify-center items-center min-h-[440px] group">
            
            {/* Resplandor tenue de fondo */}
            <div className="absolute w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-full bg-[#C5D8C1]/35 blur-3xl -z-10 animate-pulse" />

            {/* CAPA 1 (ATRÁS): Cuadros con efecto ZOOM al pasar el cursor por el grupo */}
            <div className="absolute inset-0 flex items-center justify-center sm:justify-start z-0 -translate-x-8 sm:-translate-x-12">
              <img 
                src={heroFrames} 
                alt="Cuadros de muestra Nailu" 
                className="w-full max-w-sm sm:max-w-md h-auto object-contain opacity-95 drop-shadow-md transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>

            {/* CAPA 2 (AL FRENTE): Personaje desplazado a la derecha, inclinación suave e iluminación de sombra */}
            <div className="relative z-10 flex items-center justify-end w-full pt-4 translate-x-12 sm:translate-x-24">
              <img 
                src={heroNailu}
                alt="Personaje Ilustrado Nailu" 
                className="w-full h-auto max-h-[440px] sm:max-h-[500px] object-contain cursor-pointer transition-all duration-500 ease-out drop-shadow-[0_25px_30px_rgba(0,0,0,0.22)] group-hover:rotate-[-3deg] group-hover:drop-shadow-[0_35px_40px_rgba(0,0,0,0.28)]"
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}