import React, { useState } from 'react';
import DataTable from '../ui/DataTable';
import CrudModal from '../ui/CrudModal';
import { 
  IconPlus, 
  IconEdit, 
  IconEye, 
  IconEyeOff, 
  IconSearch 
} from '../ui/AdminIcons';

export default function ProductsView({ products = [], onUpdateProducts }) {
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Estado del Modal CRUD
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  // Toggle Activar / Desactivar (Soft Delete)
  const handleToggleStatus = (id) => {
    const updated = products.map((p) => 
      p.id === id ? { ...p, isActive: p.isActive === false ? true : false } : p
    );
    onUpdateProducts(updated);
  };

  // Abrir Modal para Crear
  const handleOpenCreateModal = () => {
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
    setIsModalOpen(true);
  };

  // Abrir Modal para Editar
  const handleOpenEditModal = (product) => {
    setCurrentProduct({
      ...product,
      oldPrice: product.oldPrice || ''
    });
    setIsModalOpen(true);
  };

  // Guardar Cambios desde el Modal
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentProduct.name || !currentProduct.price) return;

    if (currentProduct.id) {
      // Editar existente
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
      // Crear nuevo
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

    setIsModalOpen(false);
  };

  // Filtrado de la lista previo a pasarlo al DataTable
  const filteredProducts = products.filter((p) => {
    const matchesCat = filterCategory === 'all' || p.category === filterCategory;
    const isProdActive = p.isActive !== false;
    const matchesStatus = 
      filterStatus === 'all' || 
      (filterStatus === 'active' && isProdActive) || 
      (filterStatus === 'inactive' && !isProdActive);

    return matchesCat && matchesStatus;
  });

  // Definición de Columnas para el DataTable Reutilizable
  const columns = [
    {
      header: 'Producto',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <img 
            src={row.image} 
            alt={row.name} 
            className="w-10 h-10 rounded-xl object-cover border border-[#E3ECE1]" 
          />
          <div>
            <div className="font-bold text-[#1C3326]">{row.name}</div>
            <div className="text-[10px] text-[#5A7365] truncate max-w-xs">{row.description}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Categoría',
      accessor: 'category',
      render: (row) => (
        <span className="capitalize font-semibold text-[#2D4A3E]">
          {row.category}
        </span>
      )
    },
    {
      header: 'Badge',
      accessor: 'badge',
      render: (row) => (
        <span className="bg-[#EBF2EA] text-[#2D4A3E] px-2.5 py-0.5 rounded-full font-bold text-[10px] border border-[#C5D8C1]">
          {row.badge}
        </span>
      )
    },
    {
      header: 'Precio',
      accessor: 'price',
      render: (row) => (
        <div>
          <div className="font-bold text-[#2D4A3E]">S/ {row.price.toFixed(2)}</div>
          {row.oldPrice && (
            <div className="text-[10px] text-stone-400 line-through">S/ {row.oldPrice.toFixed(2)}</div>
          )}
        </div>
      )
    },
    {
      header: 'Estado',
      accessor: 'isActive',
      render: (row) => {
        const isActive = row.isActive !== false;
        return (
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
            isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'
          }`}>
            {isActive ? 'Activo' : 'Inactivo'}
          </span>
        );
      }
    }
  ];

  return (
    <div className="space-y-6">
      {/* Cabecera del Módulo */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-[#E3ECE1] shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#5A7365]">Catálogo e Inventario</span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C3326] mt-1">Gestión de Productos</h1>
        </div>
        
        <button
          onClick={handleOpenCreateModal}
          className="px-5 py-2.5 rounded-full bg-[#2D4A3E] text-white font-bold text-xs hover:bg-[#1C3326] transition-all flex items-center gap-2 shadow-md cursor-pointer"
        >
          <IconPlus size={16} />
          <span>Nuevo Producto</span>
        </button>
      </div>

      {/* Barra de Filtros de Categoría y Estado */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-2xl border border-[#E3ECE1]">
        <span className="text-xs font-bold text-[#1C3326]">Filtros Rápidos:</span>

        <select 
          value={filterCategory} 
          onChange={(e) => setFilterCategory(e.target.value)}
          className="p-2 rounded-xl border border-[#C5D8C1] text-xs bg-[#FDFBF7] font-medium"
        >
          <option value="all">Todas las Categorías</option>
          <option value="cuadros-led">Cuadros LED</option>
          <option value="imantados">Imantados</option>
          <option value="packs">Packs de Regalo</option>
        </select>

        <select 
          value={filterStatus} 
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 rounded-xl border border-[#C5D8C1] text-xs bg-[#FDFBF7] font-medium"
        >
          <option value="all">Todos los Estados</option>
          <option value="active">Activos</option>
          <option value="inactive">Inactivos (Desactivados)</option>
        </select>
      </div>

      {/* Tabla de Datos Reutilizable */}
      <DataTable 
        columns={columns}
        data={filteredProducts}
        searchPlaceholder="Buscar por nombre o descripción..."
        itemsPerPage={6}
        actions={(row) => {
          const isActive = row.isActive !== false;
          return (
            <>
              <button
                onClick={() => handleToggleStatus(row.id)}
                className={`p-2 rounded-xl transition-colors cursor-pointer ${
                  isActive 
                    ? 'bg-[#EBF2EA] text-[#2D4A3E] hover:bg-amber-100 hover:text-amber-800' 
                    : 'bg-stone-200 text-stone-700 hover:bg-emerald-100 hover:text-emerald-800'
                }`}
                title={isActive ? 'Desactivar producto' : 'Activar producto'}
              >
                {isActive ? <IconEye size={16} /> : <IconEyeOff size={16} />}
              </button>

              <button
                onClick={() => handleOpenEditModal(row)}
                className="p-2 rounded-xl bg-[#F5F0E6] text-[#1C3326] hover:bg-[#C5D8C1] transition-colors cursor-pointer"
                title="Editar producto"
              >
                <IconEdit size={16} />
              </button>
            </>
          );
        }}
      />

      {/* Modal CRUD Reutilizable */}
      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentProduct.id ? 'Editar Producto' : 'Crear Nuevo Producto'}
        subtitle="Ingresa la información detallada para sincronizar con el catálogo"
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-[#1C3326] mb-1">Nombre del producto</label>
            <input 
              type="text"
              required
              value={currentProduct.name}
              onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
              placeholder="Ej. Cuadro LED Pareja 'Noche Estrellada'"
              className="w-full p-2.5 rounded-xl border border-[#C5D8C1] bg-white focus:outline-none focus:ring-2 focus:ring-[#2D4A3E]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#1C3326] mb-1">Categoría</label>
              <select 
                value={currentProduct.category}
                onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[#C5D8C1] bg-white focus:outline-none"
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
                className="w-full p-2.5 rounded-xl border border-[#C5D8C1] bg-white focus:outline-none"
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
                className="w-full p-2.5 rounded-xl border border-[#C5D8C1] bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#1C3326] mb-1">Precio Antes (Opcional)</label>
              <input 
                type="number"
                step="0.10"
                value={currentProduct.oldPrice}
                onChange={(e) => setCurrentProduct({ ...currentProduct, oldPrice: e.target.value })}
                placeholder="110.00"
                className="w-full p-2.5 rounded-xl border border-[#C5D8C1] bg-white focus:outline-none"
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
              className="w-full p-2.5 rounded-xl border border-[#C5D8C1] bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#1C3326] mb-1">Descripción corta</label>
            <textarea 
              value={currentProduct.description}
              onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
              placeholder="Detalle artesanal grabado sobre pino..."
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
              {currentProduct.id ? 'Guardar Cambios' : 'Crear Producto'}
            </button>
          </div>
        </form>
      </CrudModal>
    </div>
  );
}