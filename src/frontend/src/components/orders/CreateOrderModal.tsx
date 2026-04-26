"use client";

import React, { useState, useEffect, useRef } from 'react';

import { orderService } from '@/services/order.service';
import { Product } from '@/types/product';

interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  products: Product[];
}

// hard tam
const SHIPPING_FEE = 30000;

const formatCurrency = (v: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(v);

const CreateOrderModal: React.FC<Props> = ({ isOpen, onClose, onSuccess, products }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [items, setItems] = useState<OrderItem[]>([
    { productId: '', productName: '', quantity: 1, unitPrice: 0 },
  ]);
  const [productSearch, setProductSearch] = useState<string[]>(['']);
  const [showDropdown, setShowDropdown] = useState<boolean[]>([false]);
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!isOpen) {
      setCustomerName(''); setCustomerPhone(''); setShippingAddress('');
      setItems([{ productId: '', productName: '', quantity: 1, unitPrice: 0 }]);
      setProductSearch(['']); setShowDropdown([false]); setError(null);
    }
  }, [isOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setShowDropdown(prev => prev.map((_, i) => dropdownRefs.current[i]?.contains(e.target as Node) ? prev[i] : false));
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (!isOpen) return null;

  const subtotal = items.reduce((s, it) => s + it.unitPrice * it.quantity, 0);
  const total = subtotal + SHIPPING_FEE;

  const filteredProducts = (idx: number) => {
    const q = productSearch[idx]?.toLowerCase() ?? '';
    return products.filter(p => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
  };

  const selectProduct = (idx: number, p: Product) => {
    const newItems = [...items];
    newItems[idx] = { ...newItems[idx], productId: p.id, productName: p.name, unitPrice: p.salePrice };
    setItems(newItems);
    const ns = [...productSearch]; ns[idx] = p.name; setProductSearch(ns);
    const nd = [...showDropdown]; nd[idx] = false; setShowDropdown(nd);
  };

  const addItem = () => {
    setItems([...items, { productId: '', productName: '', quantity: 1, unitPrice: 0 }]);
    setProductSearch([...productSearch, '']);
    setShowDropdown([...showDropdown, false]);
  };

  const removeItem = (idx: number) => {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== idx));
    setProductSearch(productSearch.filter((_, i) => i !== idx));
    setShowDropdown(showDropdown.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.some(it => !it.productId)) { setError('Vui lòng chọn sản phẩm cho tất cả dòng.'); return; }
    setLoading(true); setError(null);
    try {
      await orderService.createOrder({
        customerName,
        customerPhone,
        shippingFee: SHIPPING_FEE,
        items: items.map(it => ({ productId: it.productId, quantity: it.quantity, unitPrice: it.unitPrice })),
      });
      onSuccess(); 
      onClose();
    } catch (err: any) {
      setError(err.message || 'Không thể tạo đơn hàng. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#191c1e]/40 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal Card */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="px-8 pt-7 pb-5 border-b border-gray-100 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-[#191c1e] font-headline tracking-tight">Tạo đơn hàng mới</h2>
            <p className="text-sm text-[#464555] mt-1">Điền thông tin để ghi nhận giao dịch mới.</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center text-[#464555]">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium flex items-center gap-3">
              <span className="material-symbols-outlined">error</span>{error}
            </div>
          )}

          {/* Customer Info */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-8 rounded-xl bg-[#e2dfff] flex items-center justify-center">
                <span className="material-symbols-outlined text-[#1e00a9] text-lg">person</span>
              </span>
              <h3 className="font-headline font-bold text-base text-[#191c1e]">Thông tin khách hàng</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#464555]">Tên khách hàng *</label>
                <input required value={customerName} onChange={e => setCustomerName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn A"
                  className="w-full px-5 py-3 bg-[#f2f4f6] rounded-full text-sm text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#1e00a9]/20" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#464555]">Số điện thoại</label>
                <input value={customerPhone} onChange={e => setCustomerPhone(e.target.value)}
                  placeholder="0912 345 678" type="tel"
                  className="w-full px-5 py-3 bg-[#f2f4f6] rounded-full text-sm text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#1e00a9]/20" />
              </div>
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#464555]">Địa chỉ giao hàng</label>
                <textarea value={shippingAddress} onChange={e => setShippingAddress(e.target.value)}
                  placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố" rows={2}
                  className="w-full px-5 py-3 bg-[#f2f4f6] rounded-2xl text-sm text-[#191c1e] resize-none focus:outline-none focus:ring-2 focus:ring-[#1e00a9]/20" />
              </div>
            </div>
          </section>

          {/* Product Selection */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-8 rounded-xl bg-[#e2dfff] flex items-center justify-center">
                <span className="material-symbols-outlined text-[#1e00a9] text-lg">shopping_basket</span>
              </span>
              <h3 className="font-headline font-bold text-base text-[#191c1e]">Sản phẩm đặt hàng</h3>
            </div>

            <div className="space-y-4">
              {items.map((item, idx) => (
                <div key={idx} className="grid grid-cols-[1fr_auto_auto_auto] gap-3 items-end">
                  {/* Product Search */}
                  <div className="space-y-1.5">
                    {idx === 0 && <label className="text-[10px] font-black uppercase tracking-widest text-[#464555]">Sản phẩm *</label>}
                    <div className="relative" ref={el => { dropdownRefs.current[idx] = el; }}>
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#464555] text-lg">search</span>
                      <input
                        value={productSearch[idx] ?? ''}
                        onChange={e => {
                          const ns = [...productSearch]; ns[idx] = e.target.value; setProductSearch(ns);
                          const nd = [...showDropdown]; nd[idx] = true; setShowDropdown(nd);
                          // clear selection if typing
                          const ni = [...items]; ni[idx].productId = ''; setItems(ni);
                        }}
                        onFocus={() => { const nd = [...showDropdown]; nd[idx] = true; setShowDropdown(nd); }}
                        placeholder="Tìm sản phẩm..."
                        className="w-full pl-11 pr-4 py-3 bg-[#f2f4f6] rounded-full text-sm text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#1e00a9]/20"
                      />
                      {showDropdown[idx] && filteredProducts(idx).length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl shadow-xl z-50 overflow-hidden border border-gray-100 max-h-48 overflow-y-auto">
                          {filteredProducts(idx).map(p => (
                            <button key={p.id} type="button"
                              className="w-full px-4 py-3 flex items-center justify-between hover:bg-[#f2f4f6] transition-colors text-left"
                              onMouseDown={() => selectProduct(idx, p)}
                            >
                              <div>
                                <p className="text-sm font-semibold text-[#191c1e]">{p.name}</p>
                                <p className="text-xs text-[#464555]">{p.sku} · Tồn: {p.stock}</p>
                              </div>
                              <span className="text-sm font-bold text-[#1e00a9] whitespace-nowrap ml-3">
                                {new Intl.NumberFormat('vi-VN').format(p.salePrice)}₫
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="w-24 space-y-1.5">
                    {idx === 0 && <label className="text-[10px] font-black uppercase tracking-widest text-[#464555]">SL</label>}
                    <input type="number" min={1} value={item.quantity}
                      onChange={e => { const ni = [...items]; ni[idx].quantity = Math.max(1, Number(e.target.value)); setItems(ni); }}
                      className="w-full px-3 py-3 bg-[#f2f4f6] rounded-full text-sm text-center text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#1e00a9]/20" />
                  </div>

                  {/* Unit Price */}
                  <div className="w-36 space-y-1.5">
                    {idx === 0 && <label className="text-[10px] font-black uppercase tracking-widest text-[#464555]">Đơn giá (₫)</label>}
                    <input type="number" min={0} value={item.unitPrice}
                      onChange={e => { const ni = [...items]; ni[idx].unitPrice = Number(e.target.value); setItems(ni); }}
                      className="w-full px-3 py-3 bg-[#f2f4f6] rounded-full text-sm text-center text-[#1e00a9] font-bold focus:outline-none focus:ring-2 focus:ring-[#1e00a9]/20" />
                  </div>

                  {/* Remove */}
                  <div className={idx === 0 ? 'mt-6' : ''}>
                    <button type="button" onClick={() => removeItem(idx)} disabled={items.length === 1}
                      className="w-10 h-10 rounded-full hover:bg-red-50 text-[#464555] hover:text-red-600 transition-colors flex items-center justify-center disabled:opacity-30">
                      <span className="material-symbols-outlined text-lg">remove_circle</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button type="button" onClick={addItem}
              className="mt-4 flex items-center gap-2 text-sm font-bold text-[#1e00a9] hover:translate-x-1 transition-all">
              <span className="material-symbols-outlined text-lg">add</span>Thêm sản phẩm khác
            </button>
          </section>

          {/* Order Summary */}
          <section className="bg-[#f2f4f6] rounded-2xl p-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-[#464555]">
                <span className="font-medium">Tạm tính</span>
                <span className="font-semibold">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-[#464555]">
                <span className="font-medium">Phí vận chuyển</span>
                <span className="font-semibold">{formatCurrency(SHIPPING_FEE)}</span>
              </div>
              <div className="h-px bg-gray-200 my-1"></div>
              <div className="flex justify-between items-center">
                <span className="font-headline font-bold text-lg text-[#191c1e]">Tổng cộng</span>
                <span className="font-headline font-extrabold text-2xl text-[#1e00a9]">{formatCurrency(total)}</span>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 bg-[#f8f9fc] border-t border-gray-100 flex justify-end gap-3">
          <button type="button" onClick={onClose}
            className="px-7 py-3 rounded-full text-sm font-bold text-[#464555] hover:bg-gray-200 transition-all">
            Hủy bỏ
          </button>
          <button type="button" onClick={handleSubmit} disabled={loading || !customerName}
            className="bg-gradient-to-br from-[#1e00a9] to-[#3525cd] text-white px-10 py-3 rounded-full text-sm font-bold hover:opacity-90 flex items-center gap-2 shadow-xl shadow-[#1e00a9]/20 disabled:opacity-50 transition-all">
            {loading ? <span className="material-symbols-outlined animate-spin">sync</span> : <span className="material-symbols-outlined">check_circle</span>}
            Xác nhận đơn hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateOrderModal;
