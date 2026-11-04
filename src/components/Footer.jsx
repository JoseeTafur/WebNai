import React from 'react';
import { Heart, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contacto" className="bg-[#1C3326] text-[#E8F0E6] pt-16 pb-12 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#2D4A3E]">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif text-3xl font-bold text-white">Nailu</span>
              <Heart size={16} className="fill-[#8FB38D] text-[#8FB38D]" />
            </div>
            <p className="text-xs text-[#A3B8AA] leading-relaxed">
              Especialistas en regalos personalizados que iluminan recuerdos. Cuadros LED, fotos imantadas y detalles hechos a mano con amor en Perú.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-sm font-semibold text-white mb-4">Categorías</h4>
            <ul className="space-y-2 text-xs text-[#A3B8AA]">
              <li><a href="#catalogo" className="hover:text-white transition-colors">Cuadros LED de Madera</a></li>
              <li><a href="#catalogo" className="hover:text-white transition-colors">Fotos Imantadas HD</a></li>
              <li><a href="#catalogo" className="hover:text-white transition-colors">Packs de Regalo Aniversario</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm font-semibold text-white mb-4">Atención al Cliente</h4>
            <ul className="space-y-2 text-xs text-[#A3B8AA]">
              <li><a href="#" className="hover:text-white transition-colors">Preguntas Frecuentes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tiempos de Envío</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Garantías</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm font-semibold text-white mb-4">¿Dudas o pedidos?</h4>
            <p className="text-xs text-[#A3B8AA] mb-4">Atención por WhatsApp para diseñar tu regalo ideal.</p>
            <a 
              href="https://wa.me/51933381303" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366] text-slate-900 font-bold text-xs hover:bg-[#20bd5a] transition-colors"
            >
              <MessageCircle size={16} />
              <span>Escríbenos al WhatsApp</span>
            </a>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A9382]">
          <p>© 2026 Nailu - Regalos Personalizados. Todos los derechos reservados.</p>
          <p className="mt-2 sm:mt-0">Diseñado con estética cozy & minimalista</p>
        </div>
      </div>
    </footer>
  );
}