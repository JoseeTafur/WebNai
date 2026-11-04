import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  ShieldCheck, 
  ShieldAlert, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  CheckCircle2, 
  Lock 
} from 'lucide-react';

export default function UsersView() {
  // Lista inicial de usuarios administradores
  const [users, setUsers] = useState([
    {
      id: 'usr-1',
      name: 'Jose Mario Tafur',
      email: 'admin@nailu.pe',
      role: 'SuperAdmin',
      isActive: true,
      lastAccess: '2026-11-03 19:45',
    },
    {
      id: 'usr-2',
      name: 'Editora Nailu',
      email: 'editor@nailu.pe',
      role: 'Editor',
      isActive: true,
      lastAccess: '2026-11-02 11:20',
    },
  ]);

  const [toastMessage, setToastMessage] = useState({ text: '', type: 'success' });

  // Formulario nuevo usuario
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Editor',
  });

  // Contar cuántos SuperAdmin existen activos
  const superAdminCount = users.filter((u) => u.role === 'SuperAdmin').length;
  const MAX_SUPER_ADMINS = 3;

  const showToast = (text, type = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage({ text: '', type: 'success' }), 4000);
  };

  // Alternar estado activo / desactivado
  const handleToggleStatus = (userId) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextState = !u.isActive;
          showToast(
            nextState ? `Acceso activado para ${u.email}` : `Acceso deshabilitado para ${u.email}`,
            nextState ? 'success' : 'error'
          );
          return { ...u, isActive: nextState };
        }
        return u;
      })
    );
  };

  // Crear usuario con restricción de límite de 3 SuperAdmins
  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.password) return;

    // Validación estricta del límite de 3 SuperAdmins
    if (newUser.role === 'SuperAdmin' && superAdminCount >= MAX_SUPER_ADMINS) {
      showToast(`Límite alcanzado: Máximo ${MAX_SUPER_ADMINS} SuperAdministradores permitidos.`, 'error');
      return;
    }

    const created = {
      id: `usr-${Date.now()}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      isActive: true,
      lastAccess: 'Sin accesos aún',
    };

    setUsers([...users, created]);
    showToast(`Usuario ${created.email} creado con rol ${created.role}`);
    setNewUser({
      name: '',
      email: '',
      password: '',
      role: 'Editor',
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-[#E3ECE1] shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#5A7365]">Seguridad & Control de Accesos</span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C3326] mt-1">Gestión de Usuarios</h1>
        </div>

        {/* Contador de SuperAdmins */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#EBF2EA] border border-[#C5D8C1] text-[#2D4A3E] text-xs font-semibold">
          <ShieldCheck size={18} className="text-[#2D4A3E]" />
          <span>SuperAdmins: {superAdminCount} / {MAX_SUPER_ADMINS}</span>
        </div>
      </div>

      {toastMessage.text && (
        <div className={`p-4 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-fade-in ${
          toastMessage.type === 'error'
            ? 'bg-rose-100 border border-rose-300 text-rose-800'
            : 'bg-emerald-100 border border-emerald-300 text-emerald-800'
        }`}>
          {toastMessage.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* COLUMNA IZQUIERDA: Formulario Crear Usuario */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#E3ECE1] shadow-xs space-y-4 lg:sticky lg:top-6">
          <h3 className="font-serif font-bold text-base text-[#1C3326] flex items-center gap-2">
            <UserPlus size={16} className="text-[#2D4A3E]" /> Crear Nuevo Usuario
          </h3>

          <form onSubmit={handleCreateUser} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-semibold text-[#1C3326] mb-1">Nombre Completo</label>
              <input 
                type="text"
                required
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                placeholder="Ej. María Jose Garcia"
                className="w-full p-2.5 rounded-xl border border-[#C5D8C1] bg-[#FDFBF7] focus:outline-none focus:ring-2 focus:ring-[#2D4A3E]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#1C3326] mb-1">Correo Electrónico</label>
              <input 
                type="email"
                required
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="usuario@nailu.pe"
                className="w-full p-2.5 rounded-xl border border-[#C5D8C1] bg-[#FDFBF7] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#1C3326] mb-1">Contraseña</label>
              <input 
                type="password"
                required
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                placeholder="••••••••"
                className="w-full p-2.5 rounded-xl border border-[#C5D8C1] bg-[#FDFBF7] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#1C3326] mb-1">Rol de Usuario</label>
              <select 
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[#C5D8C1] bg-[#FDFBF7] focus:outline-none font-medium"
              >
                <option value="Editor">Editor (Catálogo y Contenidos)</option>
                <option value="SuperAdmin" disabled={superAdminCount >= MAX_SUPER_ADMINS}>
                  SuperAdmin {superAdminCount >= MAX_SUPER_ADMINS ? '(Límite Alcanzado)' : ''}
                </option>
              </select>
              {superAdminCount >= MAX_SUPER_ADMINS && newUser.role === 'SuperAdmin' && (
                <p className="text-[10px] text-rose-600 mt-1">
                  Se ha alcanzado el límite máximo de {MAX_SUPER_ADMINS} SuperAdministradores.
                </p>
              )}
            </div>

            <button 
              type="submit"
              className="w-full py-3 rounded-full bg-[#2D4A3E] text-white font-bold hover:bg-[#1C3326] transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
            >
              <UserPlus size={15} />
              <span>Crear Cuenta</span>
            </button>
          </form>
        </div>

        {/* COLUMNA DERECHA: Listado de Usuarios */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="font-serif font-bold text-base text-[#1C3326] flex items-center gap-2">
            <Users size={16} className="text-[#2D4A3E]" /> Usuarios Registrados ({users.length})
          </h3>

          <div className="space-y-3">
            {users.map((u) => {
              const isSuper = u.role === 'SuperAdmin';
              const isActive = u.isActive;

              return (
                <div 
                  key={u.id}
                  className={`bg-white p-5 rounded-3xl border transition-all flex items-center justify-between gap-4 ${
                    isActive ? 'border-[#E3ECE1] shadow-xs' : 'border-dashed border-stone-300 opacity-60 bg-stone-50'
                  }`}
                >
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-xs text-[#1C3326] truncate">{u.name}</h4>
                      <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                        isSuper ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-blue-100 text-blue-900 border border-blue-300'
                      }`}>
                        {u.role}
                      </span>
                    </div>

                    <p className="text-xs text-[#5A7365] font-mono truncate">{u.email}</p>
                    <p className="text-[10px] text-stone-400">Último acceso: {u.lastAccess}</p>
                  </div>

                  {/* Acciones */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleStatus(u.id)}
                      className={`p-2.5 rounded-2xl transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
                        isActive 
                          ? 'bg-[#EBF2EA] text-[#2D4A3E] hover:bg-rose-100 hover:text-rose-800' 
                          : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      }`}
                      title={isActive ? 'Desactivar cuenta' : 'Activar cuenta'}
                    >
                      {isActive ? <Eye size={15} /> : <EyeOff size={15} />}
                      <span>{isActive ? 'Activo' : 'Desactivado'}</span>
                    </button>
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