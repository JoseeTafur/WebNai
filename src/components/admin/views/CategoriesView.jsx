import React, { useState } from 'react';
import { 
  FolderTree, 
  Plus, 
  Edit3, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Tag, 
  LayoutGrid, 
  Save, 
  CheckCircle2 
} from 'lucide-react';

export default function CategoriesView({ products = [] }) {
  // Estado inicial de categorías
  const [categories, setCategories] = useState([
    {
      id: 'cuadros-led',
      name: 'Cuadros LED',
      slug: 'cuadros-led',
      tagline: 'Luz cálida, madera de pino y tu recuerdo favorito grabado a láser.',
      isActive: true,
    },
    {
      id: 'imantados',
      name: 'Imantados',
      slug: 'imantados',
      tagline: 'Tus fotos favoritas, siempre a la vista en la refri.',
      isActive: true,
    },
    {
      id: 'packs',
      name: 'Packs de Regalo',
      slug: 'packs',
      tagline: 'Regalos completos, listos para emocionar a quien más quieres.',
      isActive: true,
    },
  ]);

  const [selectedCategoryKey, setSelectedCategoryKey] = useState('cuadros-led');
  const [editingCategory, setEditingCategory] = useState(null);
  const [showSavedToast, setShowSavedToast] = useState(false);

  // Formulario nueva categoría
  const [newCat, setNewCat] = useState({
    name: '',
    slug: '',
    tagline: '',
  });

  // Soft delete / Toggle estado de categoría
  const handleToggleCategory = (id) => {
    setCategories(prev =>
      prev.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c)
    );
  };

  // Crear categoría
  const handleCreateCategory = (e) => {
    e.preventDefault();
    if (!newCat.name) return;

    const slug = newCat.slug || newCat.name.toLowerCase().replace(/\s+/g, '-');
    const created = {
      id: slug,
      name: newCat.name,
      slug: slug,
      tagline: newCat.tagline || 'Detalles únicos hechos con dedicación.',
      isActive: true,
    };

    setCategories([...categories, created]);
    setNewCat({ name: '', slug: '', tagline: '' });
  };

  // Guardar cambios de tagline o edición
  const handleSaveEdits = (e) => {
    e.preventDefault();
    if (!editingCategory) return;

    setCategories(prev =>
      prev.map(c => c.id === editingCategory.id ? editingCategory : c)
    );
    setEditingCategory(null);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  // Filtrar productos asociados a la categoría seleccionada para vista previa del mega menú
  const activeCatData = categories.find(c => c.id === selectedCategoryKey) || categories[0];
  const catProducts = products.filter(p => p.category === activeCatData?.slug);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-[#E3ECE1] shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#5A7365]">Estructura y Navegación</span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C3326] mt-1">Categorías & Mega-Menú</h1>
        </div>

        {showSavedToast && (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-semibold">
            <CheckCircle2 size={16} />
            <span>Mega-menú actualizado</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* COLUMNA IZQUIERDA: Crear y Listar Categorías */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Formulario Crear Categoría */}
          <div className="bg-white p-6 rounded-3xl border border-[#E3ECE1] shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-base text-[#1C3326] flex items-center gap-2">
              <Plus size={16} className="text-[#2D4A3E]" /> Nueva Categoría
            </h3>

            <form onSubmit={handleCreateCategory} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#1C3326] mb-1">Nombre</label>
                <input 
                  type="text"
                  required
                  value={newCat.name}
                  onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
                  placeholder="Ej. Fotoálbumes Tapa Dura"
                  className="w-full p-2.5 rounded-xl border border-[#C5D8C1] bg-[#FDFBF7] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1C3326] mb-1">Slug (Identificador en URL)</label>
                <input 
                  type="text"
                  value={newCat.slug}
                  onChange={(e) => setNewCat({ ...newCat, slug: e.target.value })}
                  placeholder="fotoalbumes-tapa-dura"
                  className="w-full p-2.5 rounded-xl border border-[#C5D8C1] bg-[#FDFBF7] focus:outline-none text-stone-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1C3326] mb-1">Frase Descriptiva (Mega-Menú)</label>
                <textarea 
                  value={newCat.tagline}
                  onChange={(e) => setNewCat({ ...newCat, tagline: e.target.value })}
                  placeholder="Álbumes artesanales con tus fotografías..."
                  className="w-full p-2.5 rounded-xl border border-[#C5D8C1] bg-[#FDFBF7] focus:outline-none h-16 resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-2.5 rounded-full bg-[#2D4A3E] text-white font-bold hover:bg-[#1C3326] transition-all cursor-pointer"
              >
                Agregar Categoría
              </button>
            </form>
          </div>

          {/* Listado de Categorías Existentes */}
          <div className="bg-white p-6 rounded-3xl border border-[#E3ECE1] shadow-xs space-y-3">
            <h3 className="font-serif font-bold text-base text-[#1C3326] flex items-center gap-2">
              <FolderTree size={16} className="text-[#2D4A3E]" /> Categorías Registradas ({categories.length})
            </h3>

            <div className="space-y-2.5">
              {categories.map((cat) => {
                const isSelected = selectedCategoryKey === cat.id;
                return (
                  <div 
                    key={cat.id}
                    onClick={() => setSelectedCategoryKey(cat.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected 
                        ? 'bg-[#EBF2EA] border-[#2D4A3E] shadow-xs' 
                        : 'bg-[#FDFBF7] border-[#E3ECE1] hover:bg-[#F5F0E6]'
                    } ${!cat.isActive && 'opacity-50'}`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[#1C3326] truncate">{cat.name}</span>
                        {!cat.isActive && (
                          <span className="text-[9px] bg-stone-200 text-stone-600 px-1.5 py-0.5 rounded font-medium">Inactiva</span>
                        )}
                      </div>
                      <p className="text-[10px] text-[#5A7365] truncate mt-0.5">{cat.tagline}</p>
                    </div>

                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleToggleCategory(cat.id)}
                        className="p-1.5 rounded-lg text-[#2D4A3E] hover:bg-white transition-colors"
                        title={cat.isActive ? 'Desactivar de la tienda' : 'Activar en tienda'}
                      >
                        {cat.isActive ? <Eye size={15} /> : <EyeOff size={15} />}
                      </button>

                      <button
                        onClick={() => setEditingCategory(cat)}
                        className="p-1.5 rounded-lg text-[#1C3326] hover:bg-white transition-colors"
                        title="Editar textos"
                      >
                        <Edit3 size={15} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* COLUMNA DERECHA: Personalización del Desplegable Mega-Menú */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-[#E3ECE1] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E3ECE1]">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#D4A359]">Vista Previa Mega-Menú Navbar</span>
                <h3 className="font-serif font-bold text-lg text-[#1C3326]">
                  Configuración para: <span className="text-[#2D4A3E] italic">{activeCatData?.name}</span>
                </h3>
              </div>
            </div>

            {/* Formulario de Edición de Tagline para el Menú */}
            <form onSubmit={handleSaveEdits} className="space-y-4 bg-[#F5F0E6] p-4 rounded-2xl border border-[#C5D8C1]">
              <div>
                <label className="block text-xs font-semibold text-[#1C3326] mb-1 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-[#D4A359]" /> Frase Destacada en el Mega-Menú
                </label>
                <input 
                  type="text" 
                  value={editingCategory?.id === activeCatData?.id ? editingCategory.tagline : activeCatData?.tagline || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setEditingCategory({
                      ...(editingCategory || activeCatData),
                      tagline: val,
                    });
                  }}
                  className="w-full p-2.5 rounded-xl border border-[#C5D8C1] bg-white text-xs focus:outline-none"
                />
              </div>

              <div className="flex justify-end">
                <button 
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#2D4A3E] text-white text-xs font-bold hover:bg-[#1C3326] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Save size={14} />
                  <span>Guardar Frase del Menú</span>
                </button>
              </div>
            </form>

            {/* Vista Previa Visual de los Productos que aparecerán en el Navbar */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#1C3326]">Productos Asignados a esta Categoría ({catProducts.length})</span>
                <span className="text-[#5A7365] text-[11px]">Se muestran los primeros 4 en el menú</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {catProducts.slice(0, 4).map((prod) => (
                  <div 
                    key={prod.id} 
                    className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-[#C5D8C1] bg-stone-100 group shadow-xs"
                  >
                    <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-2 flex flex-col justify-end text-white text-left">
                      <span className="text-[10px] font-bold truncate leading-tight">{prod.name}</span>
                      <span className="text-[9px] text-amber-200 font-semibold">S/ {prod.price.toFixed(2)}</span>
                    </div>
                  </div>
                ))}

                {catProducts.length === 0 && (
                  <div className="col-span-4 py-8 text-center bg-[#FDFBF7] rounded-2xl border border-dashed border-[#C5D8C1] text-xs text-[#5A7365]">
                    No hay productos asignados a esta categoría todavía.
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}