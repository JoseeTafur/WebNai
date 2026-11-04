import React, { useState } from 'react';
import { 
  Tag, 
  Plus, 
  Sparkles, 
  Calendar, 
  Percent, 
  DollarSign, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Clock, 
  AlertCircle 
} from 'lucide-react';

export default function PromosView({ products = [], onUpdateProducts }) {
  // Estado inicial de campañas
  const [promos, setPromos] = useState([
    {
      id: 'promo-navidad',
      name: 'Especial Navidad 🎄',
      discountType: 'percentage', // 'percentage' | 'fixed'
      discountValue: 15,
      categoryTarget: 'cuadros-led', // 'all' o slug de categoría
      minPurchase: 100,
      startDate: '2026-12-01',
      endDate: '2026-12-25',
      isActive: true,
      badgeText: 'Navidad 15% OFF',
    },
    {
      id: 'promo-cyber',
      name: 'Cyber Packs 🎁',
      discountType: 'fixed',
      discountValue: 20,
      categoryTarget: 'packs',
      minPurchase: 120,
      startDate: '2026-11-15',
      endDate: '2026-11-30',
      isActive: false,
      badgeText: 'Cyber -S/20',
    },
  ]);

  const [toastMessage, setToastMessage] = useState('');

  // Formulario de nueva campaña
  const [newPromo, setNewPromo] = useState({
    name: '',
    discountType: 'percentage',
    discountValue: '',
    categoryTarget: 'all',
    minPurchase: '',
    startDate: '',
    endDate: '',
    badgeText: '',
  });

  // Toggle Activar / Pausar Campaña
  const handleTogglePromo = (promoId) => {
    setPromos((prev) =>
      prev.map((p) => {
        if (p.id === promoId) {
          const nextState = !p.isActive;
          // Notificación visual rápida
          showToast(nextState ? `Campaña "${p.name}" activada` : `Campaña "${p.name}" pausada`);
          return { ...p, isActive: nextState };
        }
        return p;
      })
    );
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Crear nueva campaña
  const handleCreatePromo = (e) => {
    e.preventDefault();
    if (!newPromo.name || !newPromo.discountValue) return;

    const created = {
      id: `promo-${Date.now()}`,
      name: newPromo.name,
      discountType: newPromo.discountType,
      discountValue: parseFloat(newPromo.discountValue),
      categoryTarget: newPromo.categoryTarget,
      minPurchase: newPromo.minPurchase ? parseFloat(newPromo.minPurchase) : 0,
      startDate: newPromo.startDate || 'Vigente',
      endDate: newPromo.endDate || 'Indefinido',
      isActive: true,
      badgeText: newPromo.badgeText || 'Oferta Especial',
    };

    setPromos([created, ...promos]);
    showToast(`Campaña "${created.name}" creada con éxito`);
    setNewPromo({
      name: '',
      discountType: 'percentage',
      discountValue: '',
      categoryTarget: 'all',
      minPurchase: '',
      startDate: '',
      endDate: '',
      badgeText: '',
    });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-[#E3ECE1] shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#5A7365]">Descuentos & Ofertas</span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C3326] mt-1">Gestor de Promociones Masivas</h1>
        </div>

        {toastMessage && (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-semibold animate-fade-in">
            <CheckCircle2 size={16} />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* COLUMNA IZQUIERDA: Formulario de Nueva Campaña */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#E3ECE1] shadow-xs space-y-4 lg:sticky lg:top-6">
          <h3 className="font-serif font-bold text-base text-[#1C3326] flex items-center gap-2">
            <Sparkles size={16} className="text-[#D4A359]" /> Crear Nueva Campaña
          </h3>

          <form onSubmit={handleCreatePromo} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-semibold text-[#1C3326] mb-1">Nombre de la campaña</label>
              <input 
                type="text"
                required
                value={newPromo.name}
                onChange={(e) => setNewPromo({ ...newPromo, name: e.target.value })}
                placeholder="Ej. Especial Día de los Enamorados ❤️"
                className="w-full p-2.5 rounded-xl border border-[#C5D8C1] bg-[#FDFBF7] focus:outline-none focus:ring-2 focus:ring-[#2D4A3E]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#1C3326] mb-1">Tipo de Descuento</label>
                <select 
                  value={newPromo.discountType}
                  onChange={(e) => setNewPromo({ ...newPromo, discountType: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#C5D8C1] bg-[#FDFBF7] focus:outline-none"
                >
                  <option value="percentage">Porcentaje (%)</option>
                  <option value="fixed">Monto Fijo (S/)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#1C3326] mb-1">Valor del Descuento</label>
                <input 
                  type="number"
                  step="0.5"
                  required
                  value={newPromo.discountValue}
                  onChange={(e) => setNewPromo({ ...newPromo, discountValue: e.target.value })}
                  placeholder={newPromo.discountType === 'percentage' ? '15 (para 15%)' : '20.00 (para S/20)'}
                  className="w-full p-2.5 rounded-xl border border-[#C5D8C1] bg-[#FDFBF7] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#1C3326] mb-1">Aplica a Categoría</label>
                <select 
                  value={newPromo.categoryTarget}
                  onChange={(e) => setNewPromo({ ...newPromo, categoryTarget: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#C5D8C1] bg-[#FDFBF7] focus:outline-none"
                >
                  <option value="all">Todas las Categorías</option>
                  <option value="cuadros-led">Solo Cuadros LED</option>
                  <option value="imantados">Solo Imantados</option>
                  <option value="packs">Solo Packs</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#1C3326] mb-1">Compra Mínima (S/)</label>
                <input 
                  type="number"
                  value={newPromo.minPurchase}
                  onChange={(e) => setNewPromo({ ...newPromo, minPurchase: e.target.value })}
                  placeholder="0 (Sin mínimo)"
                  className="w-full p-2.5 rounded-xl border border-[#C5D8C1] bg-[#FDFBF7] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#1C3326] mb-1">Fecha Inicio</label>
                <input 
                  type="date"
                  value={newPromo.startDate}
                  onChange={(e) => setNewPromo({ ...newPromo, startDate: e.target.value })}
                  className="w-full p-2 rounded-xl border border-[#C5D8C1] bg-[#FDFBF7] focus:outline-none text-[#1C3326]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1C3326] mb-1">Fecha Fin</label>
                <input 
                  type="date"
                  value={newPromo.endDate}
                  onChange={(e) => setNewPromo({ ...newPromo, endDate: e.target.value })}
                  className="w-full p-2 rounded-xl border border-[#C5D8C1] bg-[#FDFBF7] focus:outline-none text-[#1C3326]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#1C3326] mb-1">Texto del Badge / Etiqueta</label>
              <input 
                type="text"
                value={newPromo.badgeText}
                onChange={(e) => setNewPromo({ ...newPromo, badgeText: e.target.value })}
                placeholder="Ej. Promo 15% OFF"
                className="w-full p-2.5 rounded-xl border border-[#C5D8C1] bg-[#FDFBF7] focus:outline-none"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-3 rounded-full bg-[#2D4A3E] text-white font-bold hover:bg-[#1C3326] transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
            >
              <Plus size={16} />
              <span>Activar Campaña</span>
            </button>
          </form>
        </div>

        {/* COLUMNA DERECHA: Listado de Campañas Activas y Pausadas */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-base text-[#1C3326] flex items-center gap-2">
              <Tag size={16} className="text-[#2D4A3E]" /> Campañas Registradas ({promos.length})
            </h3>
          </div>

          <div className="space-y-3">
            {promos.map((promo) => {
              const isActive = promo.isActive;
              return (
                <div 
                  key={promo.id}
                  className={`bg-white p-5 rounded-3xl border transition-all flex flex-col justify-between gap-4 ${
                    isActive ? 'border-[#E3ECE1] shadow-xs' : 'border-dashed border-stone-300 opacity-60 bg-stone-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif font-bold text-base text-[#1C3326]">{promo.name}</h4>
                        <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                          isActive ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-stone-200 text-stone-600'
                        }`}>
                          {isActive ? 'En Curso' : 'Pausada'}
                        </span>
                      </div>

                      <p className="text-xs text-[#5A7365] mt-1">
                        Descuento: <span className="font-bold text-[#2D4A3E]">
                          {promo.discountType === 'percentage' ? `${promo.discountValue}% OFF` : `-S/ ${promo.discountValue.toFixed(2)}`}
                        </span> • Aplica a: <span className="capitalize font-semibold text-[#1C3326]">{promo.categoryTarget === 'all' ? 'Todo el Catálogo' : promo.categoryTarget}</span>
                      </p>
                    </div>

                    <button
                      onClick={() => handleTogglePromo(promo.id)}
                      className={`p-2.5 rounded-2xl transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
                        isActive 
                          ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100' 
                          : 'bg-[#EBF2EA] text-[#2D4A3E] border border-[#C5D8C1] hover:bg-[#DCE6D9]'
                      }`}
                      title={isActive ? 'Pausar descuento' : 'Activar descuento'}
                    >
                      {isActive ? <EyeOff size={15} /> : <Eye size={15} />}
                      <span>{isActive ? 'Pausar' : 'Activar'}</span>
                    </button>
                  </div>

                  {/* Restricciones y Rango */}
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#F0F4EF] text-[11px] text-[#5A7365]">
                    <div className="flex items-center gap-1.5">
                      <Clock size={13} className="text-[#2D4A3E]" />
                      <span>Vigencia: {promo.startDate} al {promo.endDate}</span>
                    </div>

                    <div className="flex items-center gap-1.5 justify-end">
                      <AlertCircle size={13} className="text-[#D4A359]" />
                      <span>{promo.minPurchase > 0 ? `Compra mín. S/ ${promo.minPurchase}` : 'Sin monto mínimo'}</span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}