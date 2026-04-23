"use client";

import React, { useState, useEffect, useRef } from 'react';
import OrderStatusBadge, { OrderStatus } from '@/components/orders/OrderStatusBadge';

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  totalPrice: number;
  customerName: string;
  customerPhone?: string;
  createdAt: string;
}

interface ActionMenuProps {
  order: Order;
  onUpdateStatus: (id: string, status: OrderStatus) => void;
  onView: (order: Order) => void;
}

// Available transitions per status (business logic)
const ALLOWED_TRANSITIONS: Record<string, OrderStatus[]> = {
  Pending:   ['Confirmed', 'Cancelled'],
  Confirmed: ['Shipping', 'Cancelled'],
  Shipping:  ['Completed', 'Returning'],
  Completed: ['Returning'],
  Cancelled: [],
  Returning: ['Returned'],
  Returned:  [],
};

const STATUS_ACTION_LABELS: Record<OrderStatus, string> = {
  Pending:   'Chờ xử lý',
  Confirmed: 'Đã xác nhận',
  Shipping:  'Đang giao',
  Completed: 'Hoàn thành',
  Cancelled: 'Đã hủy',
  Returning: 'Đang trả hàng',
  Returned:  'Đã trả hàng',
};

const STATUS_ACTION_ICONS: Record<OrderStatus, string> = {
  Confirmed: 'check',
  Shipping:  'local_shipping',
  Completed: 'task_alt',
  Cancelled: 'cancel',
  Pending:   'undo',
  Returning: 'refresh',
  Returned:  'check',
};

const OrderActionMenu: React.FC<ActionMenuProps> = ({ order, onUpdateStatus, onView }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const allowed = ALLOWED_TRANSITIONS[order.status] ?? [];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={e => { e.stopPropagation(); setOpen(o => !o); }}
        className="p-2 rounded-full hover:bg-[#f2f4f6] transition-colors text-[#464555]"
      >
        <span className="material-symbols-outlined">more_vert</span>
      </button>

      {open && (
        <div className="absolute right-0 top-10 z-50 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden min-w-[200px] py-1">
          {/* View Detail - always available */}
          <button onClick={() => { onView(order); setOpen(false); }}
            className="w-full px-4 py-3 flex items-center gap-3 text-sm text-[#191c1e] hover:bg-[#f2f4f6] transition-colors text-left">
            <span className="material-symbols-outlined text-[#464555] text-lg">visibility</span>
            Xem chi tiết
          </button>

          {allowed.length > 0 && <div className="h-px bg-gray-100 my-1"></div>}

          {/* Contextual Actions */}
          {allowed.map(nextStatus => {
            const isDanger = nextStatus === 'Cancelled';
            return (
              <button key={nextStatus}
                onClick={() => { onUpdateStatus(order.id, nextStatus); setOpen(false); }}
                className={`w-full px-4 py-3 flex items-center gap-3 text-sm hover:bg-[#f2f4f6] transition-colors text-left ${isDanger ? 'text-red-600' : 'text-[#191c1e]'}`}>
                <span className={`material-symbols-outlined text-lg ${isDanger ? 'text-red-500' : 'text-[#1e00a9]'}`}>
                  {STATUS_ACTION_ICONS[nextStatus]}
                </span>
                {STATUS_ACTION_LABELS[nextStatus]}
              </button>
            );
          })}

          {/* Print Invoice */}
          {(order.status === 'Completed' || order.status === 'Shipping') && (
            <>
              <div className="h-px bg-gray-100 my-1"></div>
              <button onClick={() => { alert('Tính năng in hóa đơn đang phát triển.'); setOpen(false); }}
                className="w-full px-4 py-3 flex items-center gap-3 text-sm text-[#464555] hover:bg-[#f2f4f6] transition-colors text-left">
                <span className="material-symbols-outlined text-lg">print</span>In hóa đơn
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderActionMenu;
