import React from 'react';
import { 
  Package, 
  FolderTree, 
  Tag, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut,
  Sparkles
} from 'lucide-react';

export default function AdminSidebar({ activeTab, setActiveTab, onLogout }) {
  const menuItems = [
    { id: 'products', label: 'Productos & Stock', icon: Package },
    { id: 'categories', label: 'Categorías & Menú', icon: FolderTree },
    { id: 'promos', label: 'Campañas & Promos', icon: Tag },
    { id: 'orders', label: 'Ventas & Pedidos', icon: ShoppingBag },
    { id: 'users', label: 'Usuarios (Max 3)', icon: Users },
    { id: 'settings', label: 'Ajustes Tienda / WA', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#1C3326] text-[#E8F0E6] flex flex-col justify-between p-4 min-h-screen border-r border-[#2D4A3E]">
      <div>
        {/* Logo / Branding Admin */}
        <div className="flex items-center gap-2 px-3 py-4 border-b border-[#2D4A3E] mb-6">
          <div className="w-8 h-8 rounded-xl bg-[#2D4A3E] flex items-center justify-center text-[#D4A359]">
            <Sparkles size={18} />
          </div>
          <div>
            <h2 className="font-serif font-bold text-lg text-white leading-none">Nailu</h2>
            <span className="text-[10px] text-[#C5D8C1] tracking-wider uppercase font-semibold">Panel de Control</span>
          </div>
        </div>

        {/* Links de Navegación */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#2D4A3E] text-white shadow-sm font-semibold border-l-4 border-[#D4A359]'
                    : 'text-[#C5D8C1] hover:bg-[#233F30] hover:text-white'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-[#D4A359]' : 'text-[#8FB38D]'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Botón Salir */}
      <div className="pt-4 border-t border-[#2D4A3E]">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-300 hover:bg-rose-950/40 hover:text-rose-200 transition-colors cursor-pointer"
        >
          <LogOut size={16} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}