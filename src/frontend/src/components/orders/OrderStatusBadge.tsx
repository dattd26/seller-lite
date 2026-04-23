import React from 'react';

export type OrderStatus = 'Pending' | 'Confirmed' | 'Shipping' | 'Completed' | 'Cancelled' | 'Returning' | 'Returned';

interface StatusConfig {
  label: string;
  bg: string;
  text: string;
  dot: string;
  ring: string;
  animate?: boolean;
}

const STATUS_CONFIG: Record<OrderStatus, StatusConfig> = {
  Pending:   { label: 'Chờ xử lý',  bg: 'bg-amber-50',   text: 'text-amber-700',   dot: 'bg-amber-500',   ring: 'ring-amber-200' },
  Confirmed: { label: 'Đã xác nhận',bg: 'bg-blue-50',    text: 'text-blue-700',    dot: 'bg-blue-500',    ring: 'ring-blue-200' },
  Shipping:  { label: 'Đang giao',  bg: 'bg-[#e2dfff]',  text: 'text-[#1e00a9]',  dot: 'bg-[#1e00a9]',  ring: 'ring-[#c3c0ff]', animate: true },
  Completed: { label: 'Hoàn thành', bg: 'bg-emerald-50',  text: 'text-emerald-700', dot: 'bg-emerald-500', ring: 'ring-emerald-200' },
  Cancelled: { label: 'Đã hủy',    bg: 'bg-red-50',     text: 'text-red-600',     dot: 'bg-red-500',     ring: 'ring-red-200' },
  Returning: { label: 'Trả hàng',   bg: 'bg-orange-50',  text: 'text-orange-600',  dot: 'bg-orange-500',  ring: 'ring-orange-200' },
  Returned:  { label: 'Đã trả hàng',bg: 'bg-teal-50',    text: 'text-teal-600',    dot: 'bg-teal-500',    ring: 'ring-teal-200' },
};

const OrderStatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const cfg = STATUS_CONFIG[status as OrderStatus] ?? STATUS_CONFIG.Pending;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ring-1 ${cfg.bg} ${cfg.text} ${cfg.ring}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${cfg.animate ? 'animate-pulse' : ''}`}></span>
      {cfg.label}
    </span>
  );
};

export default OrderStatusBadge;
export { STATUS_CONFIG };
