import React, { useState } from 'react';
import DataTable from '../ui/DataTable';
import CrudModal from '../ui/CrudModal';
import { 
  IconPlus, 
  IconEdit, 
  IconEye, 
  IconEyeOff 
} from '../ui/AdminIcons';

export default function CategoriesView({ products = [] }) {
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

  // Estado del Modal CRUD
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCat, setCurrentCat] = useState({
    id: null,
    name: '',
    slug: '',
    tagline: '',
    isActive: true,
  });

  // Toggle Activar / Desactivar (Soft Delete)
  const handleToggleCategory = (id) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  // Abrir Modal para Crear
  const handleOpenCreateModal = () => {
    setCurrentCat({
      id: null,
      name: '',
      slug: '',
      tagline: '',
      isActive: true,
    });
    setIsModalOpen(true);
  };

  // Abrir Modal para Editar
  const handleOpenEditModal = (category) => {
    setCurrentCat({ ...category });
    setIsModalOpen(true);
  };

  // Guardar Cambios (Crear o Editar)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentCat.name) return;

    const slug = currentCat.slug || currentCat.name.toLowerCase().replace(/\s+/g, '-');

    if (currentCat.id) {
      // Editar
      setCategories((prev) =>
        prev.map((c) =>
          c.id === currentCat.id
            ? { ...currentCat, slug, tagline: currentCat.tagline || 'Detalles únicos hechos con dedicación.' }
            : c
        )
      );
    } else {
      // Crear
      const newCategory = {
        ...currentCat,
        id: slug,
        slug,
        tagline: currentCat.tagline || 'Detalles únicos hechos con dedicación.',
        isActive: true,
      };
      setCategories([...categories, newCategory]);
    }

    setIsModalOpen(false);
  };

  // Productos de la categoría seleccionada para la vista previa del Mega-Menú
  const activeCatData = categories.find((c) => c.id === selectedCategoryKey) || categories[0];
  const catProducts = products.filter((p) => p.category === activeCatData?.slug);

  // Columnas para el DataTable
  const columns = [
    {
      header: 'Categoría',
      accessor: 'name',
      render: (row) => (
        <div 
          onClick={() => setSelectedCategoryKey(row.id)}
          className="cursor-pointer group"
        >
          <div className="font-bold text-[#1C3326] group-hover:text-[#2D4A3E] transition-colors">
            {row.name}
          </div>
          <div className="text-[10px] text-[#5A7365] font-mono">/{row.slug}</div>
        </div>
      )
    },
    {
      header: 'Frase Mega-Menú',
      accessor: 'tagline',
      render: (row) => (
        <p className="text-xs text-[#5A7365] truncate max-w-xs italic">
          "{row.tagline}"
        </p>
      )
    },
    {
      header: 'Productos',
      accessor: 'slug',
      render: (row) => {
        const count = products.filter((p) => p.category === row.slug).length;
        return (
          <span className="bg-[#EBF2EA] text-[#2D4A3E] px-2.5 py-0.5 rounded-full font-bold text-[10px] border border-[#C5D8C1]">
            {count} ítems
          </span>
        );
      }
    },
    {
      header: 'Estado',
      accessor: 'isActive',
      render: (row) => (
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
          row.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'
        }`}>
          {row.isActive ? 'Activa' : 'Inactiva'}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-[#E3ECE1] shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#5A7365]">Estructura y Navegación</span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C3326] mt-1">Categorías & Mega-Menú</h1>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="px-5 py-2.5 rounded-full bg-[#2D4A3E] text-white font-bold text-xs hover:bg-[#1C3326] transition-all flex items-center gap-2 shadow-md cursor-pointer"
        >
          <IconPlus size={16} />
          <span>Nueva Categoría</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* COLUMNA IZQUIERDA: Tabla de Categorías con DataTable */}
        <div className="lg:col-span-7 space-y-4">
          <DataTable 
            columns={columns}
            data={categories}
            searchPlaceholder="Buscar categoría..."
            itemsPerPage={5}
            actions={(row) => (
              <>
                <button
                  onClick={() => handleToggleCategory(row.id)}
                  className={`p-2 rounded-xl transition-colors cursor-pointer ${
                    row.isActive 
                      ? 'bg-[#EBF2EA] text-[#2D4A3E] hover:bg-amber-100 hover:text-amber-800' 
                      : 'bg-stone-200 text-stone-700 hover:bg-emerald-100 hover:text-emerald-800'
                  }`}
                  title={row.isActive ? 'Desactivar de la tienda' : 'Activar en la tienda'}
                >
                  {row.isActive ? <IconEye size={16} /> : <IconEyeOff size={16} />}
                </button>

                <button
                  onClick={() => handleOpenEditModal(row)}
                  className="p-2 rounded-xl bg-[#F5F0E6] text-[#1C3326] hover:bg-[#C5D8C1] transition-colors cursor-pointer"
                  title="Editar categoría"
                >
                  <IconEdit size={16} />
                </button>
              </>
            )}
          />
        </div>

        {/* COLUMNA DERECHA: Vista Previa del Mega-Menú */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-[#E3ECE1] shadow-xs space-y-4 lg:sticky lg:top-6">
            <div className="pb-3 border-b border-[#E3ECE1]">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#D4A359]">Vista Previa Navbar</span>
              <h3 className="font-serif font-bold text-lg text-[#1C3326]">
                Mega-Menú: <span className="text-[#2D4A3E] italic">{activeCatData?.name}</span>
              </h3>
              <p className="text-xs text-[#5A7365] italic mt-1">"{activeCatData?.tagline}"</p>
            </div>

            {/* Tarjetas de productos asignados */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#1C3326]">Muestra en Desplegable ({catProducts.length})</span>
                <span className="text-[#5A7365] text-[10px]">Máximo 4 en vista</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {catProducts.slice(0, 4).map((prod) => (
                  <div 
                    key={prod.id} 
                    className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-[#C5D8C1] bg-stone-100 shadow-xs"
                  >
                    <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-2.5 flex flex-col justify-end text-white text-left">
                      <span className="text-[10px] font-bold truncate leading-tight">{prod.name}</span>
                      <span className="text-[9px] text-amber-200 font-semibold">S/ {prod.price.toFixed(2)}</span>
                    </div>
                  </div>
                ))}

                {catProducts.length === 0 && (
                  <div className="col-span-2 py-8 text-center bg-[#FDFBF7] rounded-2xl border border-dashed border-[#C5D8C1] text-xs text-[#5A7365]">
                    No hay productos asignados a esta categoría todavía.
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Modal CRUD con Blur Animado */}
      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentCat.id ? 'Editar Categoría' : 'Nueva Categoría'}
        subtitle="Configura los textos y parámetros visibles en la navegación pública"
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-[#1C3326] mb-1">Nombre de la Categoría</label>
            <input 
              type="text"
              required
              value={currentCat.name}
              onChange={(e) => setCurrentCat({ ...currentCat, name: e.target.value })}
              placeholder="Ej. Fotoálbumes Tapa Dura"
              className="w-full p-2.5 rounded-xl border border-[#C5D8C1] bg-white focus:outline-none focus:ring-2 focus:ring-[#2D4A3E]"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#1C3326] mb-1">Slug (Identificador en URL)</label>
            <input 
              type="text"
              value={currentCat.slug}
              onChange={(e) => setCurrentCat({ ...currentCat, slug: e.target.value })}
              placeholder="fotoalbumes-tapa-dura"
              className="w-full p-2.5 rounded-xl border border-[#C5D8C1] bg-white focus:outline-none text-stone-600"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#1C3326] mb-1">Frase Descriptiva (Mega-Menú)</label>
            <textarea 
              value={currentCat.tagline}
              onChange={(e) => setCurrentCat({ ...currentCat, tagline: e.target.value })}
              placeholder="Álbumes artesanales con tus fotografías..."
              className="w-full p-2.5 rounded-xl border border-[#C5D8C1] bg-white focus:outline-none h-20 resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#E3ECE1]">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2.5 rounded-full border border-[#C5D8C1] text-[#5A7365] font-semibold hover:bg-stone-100 transition-colors"
            >
              Cancelar
            </button>
            
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#2D4A3E] text-white font-bold hover:bg-[#1C3326] transition-colors shadow-md"
            >
              {currentCat.id ? 'Guardar Cambios' : 'Crear Categoría'}
            </button>
          </div>
        </form>
      </CrudModal>
    </div>
  );
}