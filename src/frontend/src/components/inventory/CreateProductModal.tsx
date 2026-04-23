"use client";

import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const API_BASE = 'http://localhost:5139/api';

const CreateProductModal: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    costPrice: 0,
    salePrice: 0,
    stock: 0,
    lowStockThreshold: 10,
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Không thể thêm sản phẩm. Vui lòng kiểm tra lại dữ liệu.');
      }

      onSuccess();
      onClose();
      // Reset form
      setFormData({
        name: '',
        sku: '',
        category: '',
        costPrice: 0,
        salePrice: 0,
        stock: 0,
        lowStockThreshold: 10,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#191c1e]/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-xl font-extrabold text-[#191c1e] font-headline">Thêm sản phẩm mới</h3>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors text-[#464555]"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium flex items-center gap-3">
              <span className="material-symbols-outlined">error</span>
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tên sản phẩm */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-[#464555]">Tên sản phẩm *</label>
              <input 
                required
                type="text"
                placeholder="Ví dụ: Áo thun Polo Nam"
                className="w-full px-4 py-3 bg-[#f2f4f6] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1e00a9]/20 transition-all"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            {/* SKU */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-[#464555]">Mã SKU *</label>
              <input 
                required
                type="text"
                placeholder="Ví dụ: AT-001"
                className="w-full px-4 py-3 bg-[#f2f4f6] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1e00a9]/20 transition-all font-mono"
                value={formData.sku}
                onChange={e => setFormData({ ...formData, sku: e.target.value })}
              />
            </div>

            {/* Ngành hàng */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-[#464555]">Ngành hàng</label>
              <input 
                type="text"
                placeholder="Ví dụ: Thời trang"
                className="w-full px-4 py-3 bg-[#f2f4f6] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1e00a9]/20 transition-all"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
              />
            </div>

            {/* Giá nhập */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-[#464555]">Giá nhập (VNĐ)</label>
              <input 
                type="number"
                className="w-full px-4 py-3 bg-[#f2f4f6] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1e00a9]/20 transition-all"
                value={formData.costPrice}
                onChange={e => setFormData({ ...formData, costPrice: Number(e.target.value) })}
              />
            </div>

            {/* Giá bán */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-[#464555]">Giá bán (VNĐ) *</label>
              <input 
                required
                type="number"
                className="w-full px-4 py-3 bg-[#f2f4f6] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1e00a9]/20 transition-all font-bold text-[#1e00a9]"
                value={formData.salePrice}
                onChange={e => setFormData({ ...formData, salePrice: Number(e.target.value) })}
              />
            </div>

            {/* Tồn kho */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-[#464555]">Số lượng tồn kho</label>
              <input 
                type="number"
                className="w-full px-4 py-3 bg-[#f2f4f6] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1e00a9]/20 transition-all"
                value={formData.stock}
                onChange={e => setFormData({ ...formData, stock: Number(e.target.value) })}
              />
            </div>

            {/* Ngưỡng cảnh báo */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-[#464555]">Ngưỡng cảnh báo hết hàng</label>
              <input 
                type="number"
                className="w-full px-4 py-3 bg-[#f2f4f6] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1e00a9]/20 transition-all"
                value={formData.lowStockThreshold}
                onChange={e => setFormData({ ...formData, lowStockThreshold: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex items-center justify-end gap-4">
            <button 
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-full text-sm font-bold text-[#464555] hover:bg-gray-100 transition-all"
            >
              Hủy bỏ
            </button>
            <button 
              type="submit"
              disabled={loading}
              className="bg-gradient-to-br from-[#1e00a9] to-[#3525cd] text-white px-10 py-3 rounded-full text-sm font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-xl shadow-[#1e00a9]/20 disabled:opacity-50"
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin">sync</span>
              ) : (
                <span className="material-symbols-outlined">add_circle</span>
              )}
              Lưu sản phẩm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;
