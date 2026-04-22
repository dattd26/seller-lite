"use client";

import React from 'react';

interface Product {
  name: string;
  stock: number;
}

interface InventoryAlertsProps {
  products: Product[];
  loading: boolean;
}

const InventoryAlerts: React.FC<InventoryAlertsProps> = ({ products, loading }) => {
  return (
    <div className="bg-white rounded-2xl shadow-[0_12px_32px_-4px_rgba(25,28,30,0.06)] p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-extrabold text-[#191c1e]">Cảnh báo hết hàng</h2>
        <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
      </div>
      <div className="space-y-6">
        {loading ? (
          <div className="text-center py-4 text-[#464555]">Đang tải...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-4 text-[#464555]">Tồn kho ổn định.</div>
        ) : products.map((product, idx) => (
          <div key={idx} className="flex items-center justify-between p-1">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#f2f4f6] overflow-hidden flex items-center justify-center text-[#464555]">
                <span className="material-symbols-outlined">inventory</span>
              </div>
              <div>
                <p className="text-sm font-bold text-[#191c1e] line-clamp-1">{product.name}</p>
                <p className="text-[11px] text-red-600 font-extrabold">Còn {product.stock} sản phẩm</p>
              </div>
            </div>
            <button className="bg-[#1e00a9]/5 text-[#1e00a9] text-xs font-bold px-4 py-2 rounded-full hover:bg-[#1e00a9] hover:text-white transition-all shrink-0">Nhập thêm</button>
          </div>
        ))}
      </div>
      <button className="w-full mt-8 py-3 text-sm font-bold text-[#464555] hover:text-[#1e00a9] transition-colors border-t border-gray-50 pt-6">Xem tất cả tồn kho</button>
    </div>
  );
};

export default InventoryAlerts;
