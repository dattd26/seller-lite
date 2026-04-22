"use client";

import React, { useEffect, useState, useCallback } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import InventorySummaryCards from '@/components/inventory/InventorySummaryCards';
import ProductTable, { Product } from '@/components/inventory/ProductTable';
import { getStockStatus } from '@/components/inventory/InventoryStatusBadge';

const API_BASE = 'http://localhost:5139/api';

const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Áo thun Polo Nam 1', sku: 'FASH-001', category: 'Thời trang Nam', salePrice: 125000, costPrice: 52000, stock: 51, lowStockThreshold: 5 },
  { id: 'p2', name: 'Áo thun Polo Nam 2', sku: 'FASH-002', category: 'Thời trang Nữ', salePrice: 130000, costPrice: 54000, stock: 52, lowStockThreshold: 5 },
  { id: 'p3', name: 'Cáp sạc USB-C 1', sku: 'TECH-001', category: 'Phụ kiện điện tử', salePrice: 88000, costPrice: 31000, stock: 101, lowStockThreshold: 10 },
  { id: 'p4', name: 'Cáp sạc USB-C 2', sku: 'TECH-002', category: 'Phụ kiện điện tử', salePrice: 91000, costPrice: 32000, stock: 4, lowStockThreshold: 10 },
  { id: 'p5', name: 'Quần Jean Nữ', sku: 'FASH-050', category: 'Thời trang Nữ', salePrice: 250000, costPrice: 130000, stock: 0, lowStockThreshold: 5 },
  { id: 'p6', name: 'Giày Thể Thao', sku: 'FASH-060', category: 'Thời trang Nam', salePrice: 550000, costPrice: 300000, stock: 8, lowStockThreshold: 10 },
];

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);
  const [syncing, setSyncing] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/products`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setProducts(data);
    } catch {
      setProducts(MOCK_PRODUCTS);
    } finally {
      setLoading(false);
      setLastSynced(new Date());
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSync = async () => {
    setSyncing(true);
    await fetchProducts();
    setSyncing(false);
  };

  const handleAddProduct = () => {
    // Navigate to add product page (to be implemented)
    alert('Chức năng thêm sản phẩm đang được phát triển.');
  };

  // Compute summary data from products
  const lowStockAlerts = products.filter(p => getStockStatus(p.stock, p.lowStockThreshold ?? 10) !== 'in-stock').length;
  const totalInventoryValue = products.reduce((acc, p) => acc + ((p.costPrice ?? p.salePrice * 0.6) * p.stock), 0);
  const summaryData = {
    totalProducts: products.length,
    lowStockAlerts,
    totalInventoryValue,
    totalProductsChange: 12,
  };

  const formatLastSynced = () => {
    if (!lastSynced) return 'Chưa đồng bộ';
    const diff = Math.floor((Date.now() - lastSynced.getTime()) / 60000);
    if (diff < 1) return 'Vừa cập nhật';
    return `Cập nhật ${diff} phút trước`;
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fc]">
      <Sidebar activePath="/inventory" />
      <main className="flex-1 md:ml-64 flex flex-col">
        <Topbar />
        <div className="px-8 pb-16 max-w-[1600px] mx-auto w-full">

          {/* Page Header */}
          <div className="py-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-[#191c1e] font-headline">Quản lý kho hàng</h1>
              <p className="text-[#464555] mt-1">Quản lý danh mục sản phẩm và mức tồn kho theo thời gian thực.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#464555] uppercase tracking-widest">
                <span>{formatLastSynced()}</span>
                <span className={`w-2 h-2 rounded-full ${syncing ? 'bg-yellow-400 animate-ping' : 'bg-teal-500 animate-pulse'}`}></span>
              </div>
              <button
                id="btn-sync-stock"
                onClick={handleSync}
                disabled={syncing}
                className="bg-[#e7e8eb] text-[#1e00a9] px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition-all flex items-center gap-2 disabled:opacity-60"
              >
                <span className={`material-symbols-outlined text-sm ${syncing ? 'animate-spin' : ''}`}>sync</span>
                Đồng bộ kho
              </button>
            </div>
          </div>

          {/* Summary KPI Cards */}
          <InventorySummaryCards data={summaryData} loading={loading} />

          {/* Product Table */}
          <ProductTable products={products} loading={loading} onAddProduct={handleAddProduct} />
        </div>
      </main>
    </div>
  );
}
