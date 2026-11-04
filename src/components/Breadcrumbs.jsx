import React from 'react';

export default function Breadcrumbs({ items = [], onNavigate }) {
  return (
    <nav className="flex items-center gap-2 text-xs text-[#5A7365] py-3 flex-wrap">
      <button 
        onClick={() => onNavigate('home')} 
        className="hover:text-[#1C3326] transition-colors cursor-pointer font-medium"
      >
        Inicio
      </button>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <span className="text-stone-400">›</span>
          {item.action ? (
            <button 
              onClick={item.action} 
              className="hover:text-[#1C3326] transition-colors cursor-pointer capitalize font-medium"
            >
              {item.label}
            </button>
          ) : (
            <span className="font-bold text-[#1C3326] truncate max-w-[200px] sm:max-w-xs capitalize">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}