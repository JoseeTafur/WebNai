import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  MessageCircle, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Package, 
  AlertCircle 
} from 'lucide-react';

export default function OrdersView() {
  // Lista inicial de pedidos de prueba
  const [orders, setOrders] = useState([
    {
      id: 'ORD-2026-001',
      date: '2026-11-03 14:30',
      clientName: 'Jose Mario Tafur',
      phone: '51933381303',
      address: 'Av. Balta 123, Chiclayo, Lambayeque',
      productName: 'Cuadro LED Pareja Noche',
      customPhrase: 'Siempre Juntos - 14/02/2025',
      totalPrice: 89.00,
      paymentMethod: 'Yape',
      status: 'En Producción', // 'Pendiente' | 'En Producción' | 'Enviado' | 'Entregado'
    },
    {
      id: 'ORD-2026-002',
      date: '2026-11-03 16:15',
      clientName: 'Lucía Fernández Ramos',
      phone: '51987654321',
      address: 'Calle Los Pinos 456, Miraflores, Lima',
      productName: 'Pack 12 Fotos Imantadas Premium',
      customPhrase: 'Recuerdos de Verano',
      totalPrice: 39.00,
      paymentMethod: 'Plin',
      status: 'Pendiente',
    },
    {
      id: 'ORD-2026-003',
      date: '2026-11-02 10:00',
      clientName: 'Carlos Eduardo Mendoza',
      phone: '51912345678',
      address: 'Jr. Unión 789, Trujillo, La Libertad',
      productName: 'Caja Regalo Aniversario Luxe',
      customPhrase: '5 Años de Amor',
      totalPrice: 129.00,
      paymentMethod: 'Transferencia BCP',
      status: 'Enviado',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Estado global para controlar el desenmascaramiento de datos protegidos por ID de pedido
  const [revealedOrders, setRevealedOrders] = useState({});

  // Función para alternar la visibilidad de datos sensibles (Ley 29733)
  const toggleRevealData = (orderId) => {
    setRevealedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  // Función para enmascarar texto sensible
  const maskText = (text, visibleChars = 3) => {
    if (!text) return '';
    if (text.length <= visibleChars) return text;
    return text.substring(0, visibleChars) + '••••••••';
  };

  const maskPhone = (phone) => {
    if (!phone || phone.length < 9) return '•••••••••';
    return `${phone.substring(0, 4)} *** *${phone.substring(phone.length - 2)}`;
  };

  // Cambiar estado de un pedido
  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
  };

  // Filtrado
  const filteredOrders = orders.filter((ord) => {
    const matchesSearch = 
      ord.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.productName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || ord.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-[#E3ECE1] shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#5A7365]">Ventas & Despachos</span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C3326] mt-1">Bandeja de Pedidos</h1>
        </div>

        {/* Banner Informativo de Protección de Datos */}
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#EBF2EA] border border-[#C5D8C1] text-[#2D4A3E] text-xs font-semibold">
          <ShieldCheck size={18} className="text-[#2D4A3E]" />
          <span>Protección de Datos (Ley N° 29733) Activa</span>
        </div>
      </div>

      {/* Barra de Filtros y Búsqueda */}
      <div className="bg-white p-4 rounded-2xl border border-[#E3ECE1] shadow-xs flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5A7365]" />
          <input 
            type="text"
            placeholder="Buscar por ID, cliente o producto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#C5D8C1] text-xs focus:outline-none bg-[#FDFBF7]"
          />
        </div>

        <select 
          value={filterStatus} 
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 rounded-xl border border-[#C5D8C1] text-xs bg-[#FDFBF7] font-medium"
        >
          <option value="all">Todos los Estados</option>
          <option value="Pendiente">Pendiente</option>
          <option value="En Producción">En Producción</option>
          <option value="Enviado">Enviado</option>
          <option value="Entregado">Entregado</option>
        </select>
      </div>

      {/* Listado de Pedidos */}
      <div className="space-y-4">
        {filteredOrders.map((ord) => {
          const isRevealed = revealedOrders[ord.id];

          return (
            <div 
              key={ord.id}
              className="bg-white p-6 rounded-3xl border border-[#E3ECE1] shadow-xs space-y-4 transition-all hover:shadow-md"
            >
              {/* Encabezado del Pedido */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#F0F4EF] gap-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold bg-[#F5F0E6] px-3 py-1 rounded-full text-[#1C3326] border border-[#C5D8C1]">
                    {ord.id}
                  </span>
                  <span className="text-xs text-[#5A7365] flex items-center gap-1">
                    <Clock size={13} /> {ord.date}
                  </span>
                </div>

                {/* Selector de Estado */}
                <div className="flex items-center gap-2">
                  <label className="text-[11px] font-bold text-[#5A7365]">Estado:</label>
                  <select 
                    value={ord.status}
                    onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-full border cursor-pointer ${
                      ord.status === 'Pendiente' ? 'bg-amber-50 text-amber-800 border-amber-300' :
                      ord.status === 'En Producción' ? 'bg-blue-50 text-blue-800 border-blue-300' :
                      ord.status === 'Enviado' ? 'bg-purple-50 text-purple-800 border-purple-300' :
                      'bg-emerald-50 text-emerald-800 border-emerald-300'
                    }`}
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En Producción">En Producción</option>
                    <option value="Enviado">Enviado</option>
                    <option value="Entregado">Entregado</option>
                  </select>
                </div>
              </div>

              {/* Detalle del Pedido y Datos del Cliente */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
                
                {/* Datos del Cliente Protegidos */}
                <div className="lg:col-span-5 bg-[#FDFBF7] p-4 rounded-2xl border border-[#E3ECE1] space-y-2 relative">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E3ECE1]">
                    <span className="font-semibold text-[#1C3326] flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-[#2D4A3E]" /> Datos del Cliente
                    </span>
                    
                    {/* Botón para desenmascarar datos */}
                    <button 
                      onClick={() => toggleRevealData(ord.id)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                        isRevealed 
                          ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                          : 'bg-[#2D4A3E] text-white'
                      }`}
                    >
                      {isRevealed ? <EyeOff size={12} /> : <Eye size={12} />}
                      <span>{isRevealed ? 'Ocultar Datos' : 'Ver Datos'}</span>
                    </button>
                  </div>

                  <p className="text-[#5A7365]">
                    <strong className="text-[#1C3326]">Nombre:</strong> {isRevealed ? ord.clientName : maskText(ord.clientName)}
                  </p>
                  <p className="text-[#5A7365]">
                    <strong className="text-[#1C3326]">Teléfono:</strong> {isRevealed ? ord.phone : maskPhone(ord.phone)}
                  </p>
                  <p className="text-[#5A7365]">
                    <strong className="text-[#1C3326]">Dirección:</strong> {isRevealed ? ord.address : maskText(ord.address, 10)}
                  </p>
                </div>

                {/* Detalle del Producto Personalizado */}
                <div className="lg:col-span-7 space-y-2 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-[#1C3326]">{ord.productName}</h4>
                    <p className="text-[#5A7365]">
                      <strong className="text-[#1C3326]">Frase Grabada:</strong> <span className="italic font-serif text-[#2D4A3E]">"{ord.customPhrase}"</span>
                    </p>
                    <p className="text-[#5A7365]">
                      <strong className="text-[#1C3326]">Método de Pago:</strong> {ord.paymentMethod}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#F0F4EF]">
                    <span className="font-serif font-bold text-base text-[#2D4A3E]">Total: S/ {ord.totalPrice.toFixed(2)}</span>

                    {/* Botón Acción Directa a WhatsApp */}
                    <a
                      href={`https://wa.me/${ord.phone}?text=${encodeURIComponent(`¡Hola ${ord.clientName}! Te escribimos de Nailu respecto a tu pedido ${ord.id} (${ord.productName}).`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-full bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <MessageCircle size={14} />
                      <span>Coordinar por WhatsApp</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          );
        })}

        {filteredOrders.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-[#C5D8C1] text-xs text-[#5A7365]">
            No hay pedidos registrados que coincidan con la búsqueda.
          </div>
        )}
      </div>
    </div>
  );
}