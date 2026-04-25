"use client";

import React, { useState, useEffect } from 'react';
import OrderStatusBadge from './OrderStatusBadge';

import { orderService } from '@/services/order.service';
import { OrderDetail } from '@/types/order';

interface Props {
  orderId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const formatCurrency = (v: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(v);

const formatDate = (iso: string) => {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleString('vi-VN', { 
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
};

const OrderDetailModal: React.FC<Props> = ({ orderId, isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && orderId) {
      const fetchOrderDetail = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await orderService.getOrderById(orderId);
          setOrder(data);
        } catch (err: any) {
          setError(err.message || 'Không thể tải chi tiết đơn hàng.');
        } finally {
          setLoading(false);
        }
      };
      fetchOrderDetail();
    } else {
      setOrder(null);
    }
  }, [isOpen, orderId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#191c1e]/40 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="px-8 pt-7 pb-5 border-b border-gray-100 flex items-start justify-between bg-white sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-extrabold text-[#191c1e] font-headline tracking-tight">
                Chi tiết đơn hàng {order?.orderNumber}
              </h2>
              {order && <OrderStatusBadge status={order.status} />}
            </div>
            <p className="text-sm text-[#464555] mt-1">Thông tin chi tiết về giao dịch và trạng thái vận chuyển.</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center text-[#464555]">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <span className="material-symbols-outlined animate-spin text-4xl text-[#1e00a9]">sync</span>
              <p className="text-sm text-[#464555] font-medium">Đang tải dữ liệu...</p>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium flex items-center gap-3">
              <span className="material-symbols-outlined">error</span>{error}
            </div>
          ) : order && (
            <>
              {/* Order Info & Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <section className="space-y-4">
                  <div className="flex items-center gap-2 text-[#464555]">
                    <span className="material-symbols-outlined text-lg">calendar_today</span>
                    <span className="text-xs font-black uppercase tracking-widest">Thời gian đặt</span>
                  </div>
                  <p className="text-sm font-bold text-[#191c1e] pl-7">{formatDate(order.createdAt)}</p>

                  <div className="flex items-center gap-2 text-[#464555] pt-2">
                    <span className="material-symbols-outlined text-lg">person</span>
                    <span className="text-xs font-black uppercase tracking-widest">Khách hàng</span>
                  </div>
                  <div className="pl-7 space-y-1">
                    <p className="text-sm font-bold text-[#191c1e]">{order.customerName}</p>
                    {order.customerPhone && <p className="text-sm text-[#464555]">{order.customerPhone}</p>}
                  </div>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center gap-2 text-[#464555]">
                    <span className="material-symbols-outlined text-lg">local_shipping</span>
                    <span className="text-xs font-black uppercase tracking-widest">Địa chỉ giao hàng</span>
                  </div>
                  <p className="text-sm text-[#191c1e] pl-7 leading-relaxed font-medium">
                    {order.shippingAddress || '—'}
                  </p>
                </section>
              </div>

              {/* Order Items Table */}
              <section className="pt-4">
                <div className="flex items-center gap-2 text-[#464555] mb-4">
                  <span className="material-symbols-outlined text-lg">shopping_basket</span>
                  <span className="text-xs font-black uppercase tracking-widest">Danh sách sản phẩm</span>
                </div>
                <div className="bg-[#f2f4f6] rounded-2xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] font-black uppercase tracking-widest text-[#464555] border-b border-gray-200/50">
                        <th className="px-5 py-3">Sản phẩm</th>
                        <th className="px-5 py-3 text-center">SL</th>
                        <th className="px-5 py-3 text-right">Đơn giá</th>
                        <th className="px-5 py-3 text-right">Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200/30">
                      {order.items.map((item, idx) => (
                        <tr key={idx} className="text-sm">
                          <td className="px-5 py-4">
                            <p className="font-bold text-[#191c1e]">{item.productName}</p>
                            <p className="text-[10px] font-mono text-[#464555] mt-0.5">{item.sku}</p>
                          </td>
                          <td className="px-5 py-4 text-center font-bold text-[#464555]">{item.quantity}</td>
                          <td className="px-5 py-4 text-right text-[#464555]">{formatCurrency(item.unitPrice)}</td>
                          <td className="px-5 py-4 text-right font-bold text-[#191c1e]">
                            {formatCurrency(item.unitPrice * item.quantity)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Order Summary */}
              <section className="bg-[#f8f9fc] rounded-2xl p-6 border border-[#f2f4f6]">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-[#464555]">
                    <span className="font-medium">Tạm tính</span>
                    <span className="font-semibold">{formatCurrency(order.totalPrice - order.shippingFee)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#464555]">
                    <span className="font-medium">Phí vận chuyển</span>
                    <span className="font-semibold">{formatCurrency(order.shippingFee)}</span>
                  </div>
                  <div className="h-px bg-gray-200/50 my-1"></div>
                  <div className="flex justify-between items-center">
                    <span className="font-headline font-bold text-lg text-[#191c1e]">Tổng giá trị đơn hàng</span>
                    <span className="font-headline font-extrabold text-2xl text-[#1e00a9]">{formatCurrency(order.totalPrice)}</span>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-5 bg-[#f8f9fc] border-t border-gray-100 flex justify-end gap-3 sticky bottom-0">
          <button onClick={onClose}
            className="bg-[#e7e8eb] text-[#1e00a9] px-10 py-3 rounded-full text-sm font-bold hover:bg-gray-200 transition-all shadow-sm">
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
