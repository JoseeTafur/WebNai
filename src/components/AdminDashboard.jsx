import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Save, X, LogOut, Package, Tag, DollarSign } from 'lucide-react';

export default function AdminDashboard({ products, onUpdateProducts, onLogout }) {
  const [editingId, setEditingId] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'cuadros-led',
    price: '',
    oldPrice: '',
    badge: 'Nuevo',
    description: '',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=400'
  });

  // Agregar nuevo producto
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    const item = {
      id: Date.now(),
      name: newProduct.name,
      category: newProduct.category,
      price: parseFloat(newProduct.price),
      oldPrice: newProduct.oldPrice ? parseFloat(newProduct.oldPrice) : null,
      badge: newProduct.badge,
      description: newProduct.description || 'Detalle personalizado hecho a mano.',
      rating: 5.0,
      reviewsCount: 1,
      image: newProduct.image
    };

    onUpdateProducts([item, ...products]);
    setNewProduct({
      name: '',
      category: 'cuadros-led',
      price: '',
      oldPrice: '',
      badge: 'Nuevo',
      description: '',
      image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=400'
    });
  };

  // Eliminar producto
  const handleDelete = (id) => {
    onUpdateProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E3ECE1] shadow-xl p-6 sm:p-8 my-8 max-w-7xl mx-auto">
      
      {/* Cabecera del Panel */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-6 border-b border-[#E3ECE1] gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF2EA] text-[#2D4A3E] text-xs font-semibold">
            <Package size={14} />
            <span>GESTIÓN DE TIENDA</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#1C3326] mt-1">Panel Administrador Nailu</h2>
        </div>

        <button 
          onClick={onLogout}
          className="px-4 py-2 rounded-full border border-rose-200 bg-rose-50 text-rose-700 text-xs font-semibold hover:bg-rose-100 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <LogOut size={14} />
          <span>Cerrar Sesión</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Formulario: Crear Producto */}
        <div className="lg:col-span-4 bg-[#F5F0E6] p-5 rounded-2xl border border-[#C5D8C1] space-y-4">
          <h3 className="font-serif font-bold text-sm text-[#1C3326] flex items-center gap-1.5">
            <Plus size={16} className="text-[#2D4A3E]" /> Nuevo Producto
          </h3>

          <form onSubmit={handleAddProduct} className="space-y-3 text-xs">
            <div>
              <label className="block font-medium text-[#1C3326] mb-1">Nombre</label>
              <input 
                type="text" 
                required
                value={newProduct.name}
                onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                placeholder="Ej. Cuadro LED Pareja Noche"
                className="w-full p-2 rounded-xl border border-[#C5D8C1] bg-white focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-medium text-[#1C3326] mb-1">Categoría</label>
                <select 
                  value={newProduct.category}
                  onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                  className="w-full p-2 rounded-xl border border-[#C5D8C1] bg-white focus:outline-none"
                >
                  <option value="cuadros-led">Cuadros LED</option>
                  <option value="imantados">Imantados</option>
                  <option value="packs">Packs de Regalo</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-[#1C3326] mb-1">Etiqueta</label>
                <select 
                  value={newProduct.badge}
                  onChange={e => setNewProduct({...newProduct, badge: e.target.value})}
                  className="w-full p-2 rounded-xl border border-[#C5D8C1] bg-white focus:outline-none"
                >
                  <option value="Nuevo">Nuevo</option>
                  <option value="Más Vendido">Más Vendido</option>
                  <option value="Popular">Popular</option>
                  <option value="Oferta">Oferta</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-medium text-[#1C3326] mb-1">Precio (S/)</label>
                <input 
                  type="number" 
                  step="0.10"
                  required
                  value={newProduct.price}
                  onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                  placeholder="89.00"
                  className="w-full p-2 rounded-xl border border-[#C5D8C1] bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-[#1C3326] mb-1">Precio Antes (Opcional)</label>
                <input 
                  type="number" 
                  step="0.10"
                  value={newProduct.oldPrice}
                  onChange={e => setNewProduct({...newProduct, oldPrice: e.target.value})}
                  placeholder="110.00"
                  className="w-full p-2 rounded-xl border border-[#C5D8C1] bg-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-[#1C3326] mb-1">Descripción corta</label>
              <textarea 
                value={newProduct.description}
                onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                placeholder="Acrílico grabado sobre pino natural..."
                className="w-full p-2 rounded-xl border border-[#C5D8C1] bg-white focus:outline-none h-16 resize-none"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-2.5 rounded-full bg-[#2D4A3E] text-white font-bold hover:bg-[#1C3326] transition-colors cursor-pointer"
            >
              Publicar Producto
            </button>
          </form>
        </div>

        {/* Tabla: Productos Existentes */}
        <div className="lg:col-span-8 overflow-x-auto">
          <h3 className="font-serif font-bold text-sm text-[#1C3326] mb-3">
            Productos Activos en Catálogo ({products.length})
          </h3>

          <div className="space-y-2">
            {products.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center justify-between p-3 rounded-xl border border-[#E3ECE1] bg-[#FDFBF7] text-xs gap-3"
              >
                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />

                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#1C3326] truncate">{item.name}</p>
                  <p className="text-[10px] text-[#5A7365] capitalize">{item.category} • <span className="text-[#2D4A3E] font-semibold">{item.badge}</span></p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-[#2D4A3E]">S/ {item.price.toFixed(2)}</p>
                  {item.oldPrice && (
                    <p className="text-[10px] text-[#8A9B90] line-through">S/ {item.oldPrice.toFixed(2)}</p>
                  )}
                </div>

                <button 
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Eliminar"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}