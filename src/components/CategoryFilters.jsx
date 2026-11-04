import React from 'react';

export default function CategoryFilters({ activeCategory, onSelectCategory }) {
  const categories = [
    { id: 'all', label: 'Todos los regalos' },
    { id: 'led', label: 'Cuadros LED' },
    { id: 'magnets', label: 'Fotos Imantadas' },
    { id: 'packs', label: 'Packs Especiales' },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelectCategory(cat.id)}
          className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
            activeCategory === cat.id
              ? 'bg-emerald-900 text-white shadow-sm'
              : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}