import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import ProductsView from './views/ProductsView';
import CategoriesView from './views/CategoriesView';
import PromosView from './views/PromosView';
import OrdersView from './views/OrdersView';
import UsersView from './views/UsersView';
import SettingsView from './views/SettingsView';

export default function AdminLayout({ products, onUpdateProducts, onLogout, storeConfig, onUpdateConfig }) {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div className="flex min-h-screen bg-[#F5F0E6]">
      {/* Sidebar Fijo */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />

      {/* Área Principal de Trabajo */}
      <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-h-screen">
        {activeTab === 'products' && (
          <ProductsView products={products} onUpdateProducts={onUpdateProducts} />
        )}
        {activeTab === 'categories' && (
          <CategoriesView />
        )}
        {activeTab === 'promos' && (
          <PromosView products={products} onUpdateProducts={onUpdateProducts} />
        )}
        {activeTab === 'orders' && (
          <OrdersView />
        )}
        {activeTab === 'users' && (
          <UsersView />
        )}
        {activeTab === 'settings' && (
          <SettingsView config={storeConfig} onUpdateConfig={onUpdateConfig} />
        )}
      </main>
    </div>
  );
}