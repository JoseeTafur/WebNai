import React, { useState } from 'react';
import { 
  Settings, 
  MessageCircle, 
  Truck, 
  Sparkles, 
  Save, 
  CheckCircle2, 
  Phone, 
  Globe, 
  Camera
} from 'lucide-react';

export default function SettingsView({ config, onUpdateConfig }) {
  // Estado local para los ajustes de la tienda
  const [settings, setSettings] = useState(config || {
    whatsappNumber: '51933381303',
    whatsappMessage: '¡Hola Nailu! Me gustaría solicitar información para personalizar un producto.',
    freeShippingThreshold: 180,
    announcementText: 'Envíos a todo el Perú • Regalos únicos y listos para emocionar',
    contactEmail: 'hola@nailu.pe',
    instagramUrl: 'https://instagram.com/nailu.pe',
    footerDescription: 'Especialistas en regalos personalizados que iluminan recuerdos. Cuadros LED, fotos imantadas y detalles hechos a mano con amor en Perú.'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onUpdateConfig) {
      onUpdateConfig(settings);
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Cabecera del Módulo */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-[#E3ECE1] shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#5A7365]">Canales y Parámetros</span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C3326] mt-1">Ajustes Generales de la Tienda</h1>
        </div>
        
        {savedSuccess && (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-semibold animate-fade-in">
            <CheckCircle2 size={16} />
            <span>¡Cambios guardados con éxito!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* BLOQUE 1: WhatsApp y Pedidos Directos */}
        <div className="bg-white p-6 rounded-3xl border border-[#E3ECE1] shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#E3ECE1]">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
              <MessageCircle size={18} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#1C3326]">Canal de Atención WhatsApp</h3>
              <p className="text-xs text-[#5A7365]">Define el número al que llegarán los pedidos y consultas del cliente</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-[#1C3326] mb-1 flex items-center gap-1.5">
                <Phone size={14} className="text-[#2D4A3E]" /> Número de WhatsApp (Con código de país)
              </label>
              <input 
                type="text" 
                required
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                placeholder="51933381303"
                className="w-full p-2.5 rounded-xl border border-[#C5D8C1] bg-[#FDFBF7] focus:outline-none focus:ring-2 focus:ring-[#2D4A3E]"
              />
              <span className="text-[10px] text-[#8A9B90] mt-1 block">Ejemplo: 51933381303 (sin espacios ni símbolos +)</span>
            </div>

            <div>
              <label className="block font-semibold text-[#1C3326] mb-1">Plantilla de Mensaje Inicial</label>
              <textarea 
                value={settings.whatsappMessage}
                onChange={(e) => setSettings({ ...settings, whatsappMessage: e.target.value })}
                placeholder="¡Hola Nailu! Me gustaría hacer una consulta..."
                className="w-full p-2.5 rounded-xl border border-[#C5D8C1] bg-[#FDFBF7] focus:outline-none h-20 resize-none"
              />
            </div>
          </div>
        </div>

        {/* BLOQUE 2: Cintillo de Anuncios y Promoción de Envíos */}
        <div className="bg-white p-6 rounded-3xl border border-[#E3ECE1] shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#E3ECE1]">
            <div className="w-9 h-9 rounded-xl bg-[#EBF2EA] flex items-center justify-center text-[#2D4A3E]">
              <Truck size={18} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#1C3326]">Envíos y Anuncio Superior</h3>
              <p className="text-xs text-[#5A7365]">Personaliza la franja superior del Navbar y umbrales promocionales</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="md:col-span-2">
              <label className="block font-semibold text-[#1C3326] mb-1 flex items-center gap-1.5">
                <Sparkles size={14} className="text-[#D4A359]" /> Texto de la Barra Superior
              </label>
              <input 
                type="text" 
                required
                value={settings.announcementText}
                onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
                placeholder="Envíos a todo el Perú • Regalos únicos..."
                className="w-full p-2.5 rounded-xl border border-[#C5D8C1] bg-[#FDFBF7] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#1C3326] mb-1">Monto Mínimo Envío Gratis (S/)</label>
              <input 
                type="number" 
                value={settings.freeShippingThreshold}
                onChange={(e) => setSettings({ ...settings, freeShippingThreshold: parseFloat(e.target.value) || 0 })}
                placeholder="180"
                className="w-full p-2.5 rounded-xl border border-[#C5D8C1] bg-[#FDFBF7] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* BLOQUE 3: Pie de Página y Enlaces a Redes */}
        <div className="bg-white p-6 rounded-3xl border border-[#E3ECE1] shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#E3ECE1]">
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
              <Globe size={18} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#1C3326]">Información del Footer y Redes</h3>
              <p className="text-xs text-[#5A7365]">Textos del pie de página y redes sociales corporativas</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-[#1C3326] mb-1">Correo de Contacto</label>
              <input 
                type="email" 
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                placeholder="hola@nailu.pe"
                className="w-full p-2.5 rounded-xl border border-[#C5D8C1] bg-[#FDFBF7] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#1C3326] mb-1 flex items-center gap-1.5">
                <Camera size={14} className="text-[#2D4A3E]" /> Enlace a Instagram
              </label>
              <input 
                type="text" 
                value={settings.instagramUrl}
                onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                placeholder="https://instagram.com/..."
                className="w-full p-2.5 rounded-xl border border-[#C5D8C1] bg-[#FDFBF7] focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold text-[#1C3326] mb-1">Frase Descriptiva en Footer</label>
              <textarea 
                value={settings.footerDescription}
                onChange={(e) => setSettings({ ...settings, footerDescription: e.target.value })}
                placeholder="Especialistas en regalos personalizados..."
                className="w-full p-2.5 rounded-xl border border-[#C5D8C1] bg-[#FDFBF7] focus:outline-none h-20 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Botón Guardar Cambios Globales */}
        <div className="flex justify-end pt-2">
          <button 
            type="submit"
            className="px-8 py-3.5 rounded-full bg-[#2D4A3E] text-white font-bold text-xs hover:bg-[#1C3326] transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Save size={16} />
            <span>Guardar Configuración Global</span>
          </button>
        </div>
      </form>
    </div>
  );
}