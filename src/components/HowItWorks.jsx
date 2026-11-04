import React from 'react';
import { LayoutGrid, Upload, CreditCard, PackageCheck, ArrowRight, Sparkles } from 'lucide-react';

export default function HowItWorks({ onStartClick }) {
  const steps = [
    {
      number: '01',
      icon: <LayoutGrid className="w-5 h-5 text-[#2D4A3E]" />,
      title: 'Elige tu producto',
      description: 'Cuadros LED de madera, fotos imantadas o packs completos en la medida que prefieras.',
    },
    {
      number: '02',
      icon: <Upload className="w-5 h-5 text-[#2D4A3E]" />,
      title: 'Sube tus fotos',
      description: 'Directo desde tu celular: agrega tu fotografía y la frase o nombres que deseas grabar.',
    },
    {
      number: '03',
      icon: <CreditCard className="w-5 h-5 text-[#2D4A3E]" />,
      title: 'Coordina tu pedido',
      description: 'Confirmamos contigo el diseño final por WhatsApp y aceptas con Yape, Plin o transferencia.',
    },
    {
      number: '04',
      icon: <PackageCheck className="w-5 h-5 text-[#2D4A3E]" />,
      title: 'Recíbelo en casa',
      description: 'Lo fabricamos con detalle artesanal y te lo enviamos empacado listo para regalar.',
    },
  ];

  return (
    <section className="py-16 px-6 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12 text-center">
        
        {/* Cabecera */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF2EA] text-[#2D4A3E] text-xs font-semibold tracking-wide border border-[#C5D8C1]">
            <Sparkles size={12} className="text-[#D4A359]" />
            <span>CÓMO FUNCIONA</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1C3326]">
            Tu pedido listo en <span className="italic font-normal text-[#2D4A3E]">4 simples pasos</span>
          </h2>
        </div>

        {/* Pasos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-3xl border border-[#E3ECE1] shadow-sm relative flex flex-col justify-between text-left hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#EBF2EA] flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="font-serif text-2xl font-bold text-[#C5D8C1]">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-serif font-semibold text-lg text-[#1C3326] mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-[#5A7365] leading-relaxed">
                  {step.description}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-[#C5D8C1]">
                  <ArrowRight size={18} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Botón Acción */}
        <div className="pt-2">
          <button 
            onClick={onStartClick}
            className="px-8 py-3.5 rounded-full bg-[#2D4A3E] text-white font-medium text-sm hover:bg-[#1C3326] transition-all shadow-md inline-flex items-center gap-2 group"
          >
            <span>Empezar ahora</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}