import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck, X } from 'lucide-react';

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'admin@nailu.pe' && password === 'nailu2026') {
      setError('');
      onLoginSuccess();
      onClose();
    } else {
      setError('Credenciales incorrectas. Pruebe: admin@nailu.pe / nailu2026');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1C3326]/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#F5F0E6] rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl border border-[#C5D8C1]">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#5A7365] hover:bg-[#EBF2EA] transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF2EA] text-[#2D4A3E] text-xs font-semibold border border-[#C5D8C1]">
            <ShieldCheck size={14} className="text-[#2D4A3E]" />
            <span>ACCESO ADMINISTRADOR</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#1C3326]">Panel Control Nailu</h3>
          <p className="text-xs text-[#5A7365]">Inicia sesión para acceder al backend de la tienda</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-100 border border-rose-300 text-rose-800 text-xs text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-[#1C3326] mb-1">Correo Electrónico</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5A7365]" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@nailu.pe"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#C5D8C1] bg-white text-xs focus:ring-2 focus:ring-[#2D4A3E] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#1C3326] mb-1">Contraseña</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5A7365]" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#C5D8C1] bg-white text-xs focus:ring-2 focus:ring-[#2D4A3E] focus:outline-none"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-3 rounded-full bg-[#2D4A3E] text-white font-semibold hover:bg-[#1C3326] transition-colors shadow-md flex items-center justify-center gap-2 mt-2 cursor-pointer"
          >
            <span>Ingresar al Panel</span>
            <ArrowRight size={14} />
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-[#E3ECE1] text-center text-[10px] text-[#5A7365]">
          Demo: <code className="bg-white px-1.5 py-0.5 rounded border border-[#C5D8C1]">admin@nailu.pe</code> / <code className="bg-white px-1.5 py-0.5 rounded border border-[#C5D8C1]">nailu2026</code>
        </div>

      </div>
    </div>
  );
}