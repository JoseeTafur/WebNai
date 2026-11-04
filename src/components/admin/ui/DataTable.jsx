import React, { useState, useMemo } from 'react';
import { IconSearch, IconChevronLeft, IconChevronRight } from './AdminIcons';

export default function DataTable({ 
  columns = [], 
  data = [], 
  searchPlaceholder = "Buscar registros...",
  itemsPerPage = 5,
  actions = null
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrado reactivo por término de búsqueda
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    return data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  // Paginación
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E3ECE1] shadow-xs overflow-hidden space-y-4">
      
      {/* Barra de Búsqueda de la Tabla */}
      <div className="p-4 border-b border-[#E3ECE1] flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#FDFBF7]">
        <div className="relative w-full sm:w-72">
          <IconSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5A7365]" />
          <input 
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reiniciar paginación al buscar
            }}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#C5D8C1] text-xs focus:outline-none focus:ring-2 focus:ring-[#2D4A3E] bg-white"
          />
        </div>

        <span className="text-xs text-[#5A7365] font-semibold">
          Mostrando {filteredData.length} resultados
        </span>
      </div>

      {/* Estructura de la Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[#E3ECE1] bg-[#F5F0E6] text-[#1C3326] font-bold">
              {columns.map((col, idx) => (
                <th key={idx} className="py-3.5 px-4 font-serif">{col.header}</th>
              ))}
              {actions && <th className="py-3.5 px-4 font-serif text-right">Acciones</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0F4EF]">
            {paginatedData.map((row, rowIndex) => (
              <tr key={row.id || rowIndex} className="hover:bg-[#FDFBF7] transition-colors">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="py-3.5 px-4 text-[#2C3531] font-medium align-middle">
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
                {actions && (
                  <td className="py-3.5 px-4 text-right align-middle">
                    <div className="flex items-center justify-end gap-1.5">
                      {actions(row)}
                    </div>
                  </td>
                )}
              </tr>
            ))}

            {paginatedData.length === 0 && (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="py-12 text-center text-[#5A7365]">
                  No se encontraron elementos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginador */}
      <div className="p-4 border-t border-[#E3ECE1] flex items-center justify-between text-xs bg-[#FDFBF7]">
        <span className="text-[#5A7365]">
          Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-xl border border-[#C5D8C1] bg-white text-[#1C3326] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#EBF2EA] transition-colors cursor-pointer"
          >
            <IconChevronLeft size={16} />
          </button>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-xl border border-[#C5D8C1] bg-white text-[#1C3326] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#EBF2EA] transition-colors cursor-pointer"
          >
            <IconChevronRight size={16} />
          </button>
        </div>
      </div>

    </div>
  );
}