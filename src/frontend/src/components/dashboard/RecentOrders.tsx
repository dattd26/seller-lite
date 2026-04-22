"use client";

import Link from 'next/link';
import React from 'react';

interface Order {
  orderNumber: string;
  customerName: string;
  status: string;
  totalPrice: number;
}

interface RecentOrdersProps {
  orders: Order[];
  loading: boolean;
}

const RecentOrders: React.FC<RecentOrdersProps> = ({ orders, loading }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const renderStatus = (status: string) => {
    let bg = 'bg-[#eceef0]';
    let text = 'text-[#464555]';
    let label = status;

    switch (status) {
      case 'Pending':
      case '0':
        label = 'Chờ xử lý';
        break;
      case 'Confirmed':
      case '1':
        bg = 'bg-[#02f4fe]/20';
        text = 'text-[#006c71]';
        label = 'Đã xác nhận';
        break;
      case 'Shipping':
      case '2':
        bg = 'bg-[#1e00a9]/10';
        text = 'text-[#1e00a9]';
        label = 'Đang giao';
        break;
      case 'Completed':
      case '3':
        bg = 'bg-green-100';
        text = 'text-green-700';
        label = 'Hoàn thành';
        break;
      case 'Cancelled':
      case '4':
        bg = 'bg-red-100';
        text = 'text-red-700';
        label = 'Đã hủy';
        break;
    }

    return <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${bg} ${text}`}>{label}</span>;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <section className="bg-white rounded-2xl shadow-[0_12px_32px_-4px_rgba(25,28,30,0.06)] overflow-hidden">
      <div className="p-8 flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-[#191c1e]">Đơn hàng gần đây</h2>
        <div className="flex items-center gap-2 px-4 py-2 bg-[#f2f4f6] rounded-full">
          <span className="material-symbols-outlined text-sm text-[#464555]">filter_list</span>
          <span className="text-xs font-bold text-[#464555]">Tất cả kênh</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f2f4f6]/50 text-[#464555] text-[11px] font-extrabold uppercase tracking-widest">
              <th className="px-8 py-4">Mã ĐH</th>
              <th className="px-8 py-4">Khách hàng</th>
              <th className="px-8 py-4">Trạng thái</th>
              <th className="px-8 py-4">Tổng tiền</th>
              <th className="px-8 py-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={5} className="px-8 py-10 text-center text-[#464555]">Đang tải đơn hàng...</td></tr>
            ) : orders.length === 0 ? (
              <tr><td colSpan={5} className="px-8 py-10 text-center text-[#464555]">Không có đơn hàng nào.</td></tr>
            ) : orders.map((order, idx) => (
              <tr key={idx} className="hover:bg-[#f2f4f6]/20 transition-colors group">
                <td className="px-8 py-5 text-sm font-bold text-[#1e00a9]">{order.orderNumber}</td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#e7e8eb] flex items-center justify-center text-[10px] font-bold">{getInitials(order.customerName)}</div>
                    <span className="text-sm font-medium text-[#191c1e]">{order.customerName}</span>
                  </div>
                </td>
                <td className="px-8 py-5">{renderStatus(order.status)}</td>
                <td className="px-8 py-5 text-sm font-bold">{formatCurrency(order.totalPrice)}</td>
                <td className="px-8 py-5 text-right">
                  <div className="flex justify-end gap-2">
                    {/* View Details - Always visible as secondary action */}
                    <button 
                      title="Xem chi tiết"
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[#464555] hover:bg-gray-100 transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">visibility</span>
                    </button>

                    {/* Contextual Primary Actions */}
                    {order.status === 'Pending' && (
                      <>
                        <button 
                          title="Xác nhận đơn hàng"
                          className="w-8 h-8 rounded-full bg-[#1e00a9]/10 text-[#1e00a9] flex items-center justify-center hover:bg-[#1e00a9] hover:text-white transition-all"
                        >
                          <span className="material-symbols-outlined text-lg">check</span>
                        </button>
                        <button 
                          title="Hủy đơn hàng"
                          className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"
                        >
                          <span className="material-symbols-outlined text-lg">close</span>
                        </button>
                      </>
                    )}

                    {order.status === 'Confirmed' && (
                      <>
                        <button 
                          title="Bắt đầu giao hàng"
                          className="w-8 h-8 rounded-full bg-[#00696e]/10 text-[#00696e] flex items-center justify-center hover:bg-[#00696e] hover:text-white transition-all"
                        >
                          <span className="material-symbols-outlined text-lg">local_shipping</span>
                        </button>
                        <button 
                          title="Hủy đơn hàng"
                          className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"
                        >
                          <span className="material-symbols-outlined text-lg">close</span>
                        </button>
                      </>
                    )}

                    {order.status === 'Shipping' && (
                      <button 
                        title="Đã giao hàng thành công"
                        className="w-8 h-8 rounded-full bg-[#191c1e]/10 text-[#191c1e] flex items-center justify-center hover:bg-[#191c1e] hover:text-white transition-all"
                      >
                        <span className="material-symbols-outlined text-lg">task_alt</span>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-6 border-t border-gray-50 text-center">
        <Link href="/orders" className="text-sm font-bold text-[#1e00a9] hover:underline">Xem tất cả giao dịch</Link>
      </div>
    </section>
  );
};

export default RecentOrders;
