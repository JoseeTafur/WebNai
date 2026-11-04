import React from 'react';
import { Truck, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Truck className="w-6 h-6 text-emerald-800" />,
      title: 'Envíos a Todo el Perú',
      description: 'Llegamos a todas las provincias con empaques seguros para que tu regalo llegue impecable.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-800" />,
      title: 'Garantía de Calidad',
      description: 'Madera pino seleccionada, luz LED cálida duradera y fotos impresas en papel fotográfico premium.',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-emerald-800" />,
      title: 'Diseño Personalizado',
      description: 'Revisamos y encuadramos tus fotos antes de producir para asegurar el mejor acabado.',
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-emerald-800" />,
      title: 'Atención Directa',
      description: 'Te asesoramos paso a paso por WhatsApp para armar el detalle exactamente a tu gusto.',
    },
  ];

  return (
    <section className="bg-emerald-900/5 py-12 px-6 border-y border-emerald-900/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center space-y-3 bg-white p-6 rounded-2xl border border-stone-200/60 shadow-sm">
            <div className="p-3 bg-emerald-50 rounded-2xl">
              {item.icon}
            </div>
            <h3 className="font-serif font-bold text-stone-900 text-base">{item.title}</h3>
            <p className="text-xs text-stone-500 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}