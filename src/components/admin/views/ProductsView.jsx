import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Eye, 
  EyeOff, 
  Edit3, 
  Trash2, 
  Sparkles, 
  PackageCheck, 
  AlertCircle 
} from 'lucide-react';

export default function ProductsView({ products = [], onUpdateProducts }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'active', 'inactive'

  // Estado para el formulario de nuevo/edición
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: null,
    name: '',
    category: 'cuadros-led',
    price: '',
    oldPrice: '',
    badge: 'Nuevo',
    description: '',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=400',
    isActive: true
  });

  // Toggle para activar/desactivar (Soft Delete)
  const handleToggleStatus = (id) => {
    const updated = products.map((p) => 
      p.id === id ? { ...p, isActive: p.isActive === false ? true : false } : p
    );
    onUpdateProducts(updated);
  };

  // Guardar nuevo o editar existente
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentProduct.name || !currentProduct.price) return;

    if (currentProduct.id) {
      // Editar
      const updated = products.map((p) =>
        p.id === currentProduct.id
          ? {
              ...currentProduct,
              price: parseFloat(currentProduct.price),
              oldPrice: currentProduct.oldPrice ? parseFloat(currentProduct.oldPrice) : null,
            }
          : p
      );
      onUpdateProducts(updated);
    } else {
      // Crear
      const newProd = {
        ...currentProduct,
        id: Date.now(),
        price: parseFloat(currentProduct.price),
        oldPrice: currentProduct.oldPrice ? parseFloat(currentProduct.oldPrice) : null,
        rating: 5.0,
        reviewsCount: 1,
        isActive: true
      };
      onUpdateProducts([newProd, ...products]);
    }

    resetForm();
  };

  const startEdit = (product) => {
    setCurrentProduct({ ...product, oldPrice: product.oldPrice || '' });
    setIsEditing(true);
  };

  const resetForm = () => {
    setCurrentProduct({
      id: null,
      name: '',
      category: 'cuadros-led',
      price: '',
      oldPrice: '',
      badge: 'Nuevo',
      description: '',
      image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=400',
      isActive: true
    });
    setIsEditing(false);
  };

  // Filtrado de la lista
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = filterCategory === 'all' || p.category === filterCategory;
    const isProdActive = p.isActive !== false;
    const matchesStatus = 
      filterStatus === 'all' || 
      (filterStatus === 'active' && isProdActive) || 
      (filterStatus === 'inactive' && !isProdActive);

    return matchesSearch && matchesCat && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Cabecera del Módulo */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-[#E3ECE1] shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#5A7365]">Catálogo e Inventario</span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C3326] mt-1">Gestión de Productos</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#5A7365] bg-[#EBF2EA] px-3 py-1.5 rounded-full font-semibold border border-[#C5D8C1]">
            Total: {products.length} productos
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Formulario (Crear / Editar) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#E3ECE1] shadow-sm space-y-4 lg:sticky lg:top-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#E3ECE1]">
            <h3 className="font-serif font-bold text-base text-[#1C3326] flex items-center gap-2">
              <Sparkles size={16} className="text-[#D4A359]" />
              {isEditing ? 'Editar Producto' : 'Crear Nuevo Producto'}
            </h3>
            {isEditing && (
              <button onClick={resetForm} className="text-xs text-[#5A7365] hover:underline">
                Cancelar
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-semibold text-[#1C3326] mb-1">Nombre del producto</label>
              <input 
                type="text"
                required
                value={currentProduct.name}
                onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                placeholder="Ej. Cuadro LED Pareja 'Noche Estrellada'"
                className="w-full p-2.5 rounded-xl border border-[#C5D8C1] bg-[#FDFBF7] focus:outline-none focus:ring-2 focus:ring-[#2D4A3E]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#1C3326] mb-1">Categoría</label>
                <select 
                  value={currentProduct.category}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#C5D8C1] bg-[#FDFBF7] focus:outline-none"
                >
                  <option value="cuadros-led">Cuadros LED</option>
                  <option value="imantados">Imantados</option>
                  <option value="packs">Packs de Regalo</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#1C3326] mb-1">Badge / Etiqueta</label>
                <select 
                  value={currentProduct.badge}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, badge: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#C5D8C1] bg-[#FDFBF7] focus:outline-none"
                >
                  <option value="Nuevo">Nuevo</option>
                  <option value="Más Vendido">Más Vendido</option>
                  <option value="Popular">Popular</option>
                  <option value="Oferta">Oferta</option>
                  <option value="Especial">Especial</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#1C3326] mb-1">Precio Actual (S/)</label>
                <input 
                  type="number"
                  step="0.10"
                  required
                  value={currentProduct.price}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
                  placeholder="89.00"
                  className="w-full p-2.5 rounded-xl border border-[#C5D8C1] bg-[#FDFBF7] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1C3326] mb-1">Precio Antes (Tachado)</label>
                <input 
                  type="number"
                  step="0.10"
                  value={currentProduct.oldPrice}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, oldPrice: e.target.value })}
                  placeholder="110.00"
                  className="w-full p-2.5 rounded-xl border border-[#C5D8C1] bg-[#FDFBF7] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#1C3326] mb-1">URL de Imagen</label>
              <input 
                type="text"
                value={currentProduct.image}
                onChange={(e) => setCurrentProduct({ ...currentProduct, image: e.target.value })}
                placeholder="https://..."
                className="w-full p-2.5 rounded-xl border border-[#C5D8C1] bg-[#FDFBF7] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#1C3326] mb-1">Descripción</label>
              <textarea 
                value={currentProduct.description}
                onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                placeholder="Detalle artesanal grabado sobre pino..."
                className="w-full p-2.5 rounded-xl border border-[#C5D8C1] bg-[#FDFBF7] focus:outline-none h-20 resize-none"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-3 rounded-full bg-[#2D4A3E] text-white font-bold hover:bg-[#1C3326] transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              {isEditing ? <Edit3 size={15} /> : <Plus size={15} />}
              <span>{isEditing ? 'Actualizar Producto' : 'Guardar Producto'}</span>
            </button>
          </form>
        </div>

        {/* Tabla / Listado Administrable */}
        <div className="lg:col-span-7 space-y-4">
          {/* Barra de Búsqueda y Filtros */}
          <div className="bg-white p-4 rounded-2xl border border-[#E3ECE1] shadow-xs flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5A7365]" />
              <input 
                type="text"
                placeholder="Buscar por nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#C5D8C1] text-xs focus:outline-none bg-[#FDFBF7]"
              />
            </div>

            <div className="flex gap-2">
              <select 
                value={filterCategory} 
                onChange={(e) => setFilterCategory(e.target.value)}
                className="p-2 rounded-xl border border-[#C5D8C1] text-xs bg-[#FDFBF7]"
              >
                <option value="all">Todas las Categorías</option>
                <option value="cuadros-led">Cuadros LED</option>
                <option value="imantados">Imantados</option>
                <option value="packs">Packs</option>
              </select>

              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
                className="p-2 rounded-xl border border-[#C5D8C1] text-xs bg-[#FDFBF7]"
              >
                <option value="all">Todos los Estados</option>
                <option value="active">Activos</option>
                <option value="inactive">Inactivos (Desactivados)</option>
              </select>
            </div>
          </div>

          {/* Items */}
          <div className="space-y-3">
            {filteredProducts.map((p) => {
              const isActive = p.isActive !== false;
              return (
                <div 
                  key={p.id}
                  className={`bg-white p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                    isActive ? 'border-[#E3ECE1] shadow-xs' : 'border-dashed border-stone-300 opacity-60 bg-stone-50'
                  }`}
                >
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="w-14 h-14 rounded-xl object-cover flex-shrink-0 border border-[#E3ECE1]" 
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-xs text-[#1C3326] truncate">{p.name}</h4>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        isActive ? 'bg-[#EBF2EA] text-[#2D4A3E]' : 'bg-stone-200 text-stone-600'
                      }`}>
                        {isActive ? 'Activo' : 'Desactivado'}
                      </span>
                    </div>

                    <p className="text-[11px] text-[#5A7365] capitalize mt-0.5">
                      {p.category} • <span className="font-semibold text-[#D4A359]">{p.badge}</span>
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-bold text-xs text-[#2D4A3E]">S/ {p.price.toFixed(2)}</span>
                      {p.oldPrice && (
                        <span className="text-[10px] text-stone-400 line-through">S/ {p.oldPrice.toFixed(2)}</span>
                      )}
                    </div>
                  </div>

                  {/* Acciones Rápidas */}
                  <div className="flex items-center gap-2">
                    {/* Botón Soft Delete (Activar/Desactivar) */}
                    <button
                      onClick={() => handleToggleStatus(p.id)}
                      className={`p-2 rounded-xl transition-colors cursor-pointer ${
                        isActive 
                          ? 'bg-[#EBF2EA] text-[#2D4A3E] hover:bg-amber-100 hover:text-amber-800' 
                          : 'bg-stone-200 text-stone-700 hover:bg-emerald-100 hover:text-emerald-800'
                      }`}
                      title={isActive ? 'Desactivar del catálogo' : 'Reactivar en el catálogo'}
                    >
                      {isActive ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>

                    {/* Editar */}
                    <button
                      onClick={() => startEdit(p)}
                      className="p-2 rounded-xl bg-[#F5F0E6] text-[#1C3326] hover:bg-[#C5D8C1] transition-colors cursor-pointer"
                      title="Editar datos"
                    >
                      <Edit3 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}

            {filteredProducts.length === 0 && (
              <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-[#C5D8C1] text-xs text-[#5A7365]">
                No se encontraron productos con los filtros seleccionados.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}