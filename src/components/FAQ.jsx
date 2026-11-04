import React, { useState } from 'react';
import { Plus, Minus, MessageCircle, Sparkles } from 'lucide-react';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: '¿Cómo envío mis fotos y frase para el grabado?',
      answer: 'Al presionar "Personalizar" en el producto puedes cargar tu imagen y escribir la frase. Además, antes de mandar a fabricar, te enviamos una pre-vista digital por WhatsApp para confirmar que todo quede a tu gusto.',
    },
    {
      question: '¿Qué medidas de cuadros LED tienen?',
      answer: 'Manajamos cuadros desde 15x20 cm hasta 20x30 cm con base de madera de pino natural. Si buscas una medida especial para un muro, podemos fabricarla bajo pedido.',
    },
    {
      question: '¿Cuánto demora mi pedido?',
      answer: 'Los envíos estándar a Lima y provincias demoran entre 3 a 5 días hábiles. Si estás en Lima y lo necesitas con urgencia, contamos con opción express para tenerlo listo en 24 a 48 horas.',
    },
    {
      question: '¿La luz LED requiere conexión o baterías?',
      answer: 'Nuestras bases de madera vienen equipadas con tira LED cálida de alta durabilidad con conexión USB, lista para conectar a cualquier cargador de celular o puerto USB.',
    },
    {
      question: '¿Qué medios de pago aceptan?',
      answer: 'Aceptamos Yape, Plin, transferencias bancarias (BCP, Interbank, BBVA) y pagos con tarjeta.',
    },
    {
      question: '¿Tienen garantía los productos?',
      answer: '¡Sí! Todos nuestros cuadros cuentan con garantía en los acabados de madera, grabado acrílico e iluminación LED. Si tu pedido llega con algún inconveniente por transporte, lo reemplazamos inmediatamente.',
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-6 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Columna Izquierda: Títulos y Contacto WhatsApp */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF2EA] text-[#2D4A3E] text-xs font-semibold tracking-wide border border-[#C5D8C1]">
            <Sparkles size={12} className="text-[#D4A359]" />
            <span>PREGUNTAS FRECUENTES</span>
          </div>

          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1C3326] leading-tight">
            Resolvemos <br />
            <span className="italic font-normal text-[#2D4A3E]">tus dudas</span>
          </h2>

          <p className="text-sm text-[#5A7365] leading-relaxed">
            ¿No encuentras la respuesta que buscas? Te atendemos directamente para ayudarte a crear el detalle ideal.
          </p>

          <a 
            href="https://wa.me/51933381303" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#1C3326] text-[#1C3326] text-xs font-semibold hover:bg-[#2D4A3E] hover:text-white transition-all shadow-sm group"
          >
            <MessageCircle size={16} />
            <span>Escríbenos por WhatsApp</span>
          </a>
        </div>

        {/* Columna Derecha: Acordeón de preguntas */}
        <div className="lg:col-span-7 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl border border-[#E3ECE1] overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm text-[#1C3326]"
                >
                  <span>{faq.question}</span>
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${isOpen ? 'bg-[#2D4A3E] text-white' : 'bg-[#EBF2EA] text-[#2D4A3E]'}`}>
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-[#5A7365] leading-relaxed border-t border-[#F0F4EF] pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}