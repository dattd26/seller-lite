import React from 'react';

export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

export function getStockStatus(stock: number, threshold: number = 10): StockStatus {
  if (stock === 0) return 'out-of-stock';
  if (stock <= threshold) return 'low-stock';
  return 'in-stock';
}

const config: Record<StockStatus, { label: string; bg: string; text: string; dot: string }> = {
  'in-stock':     { label: 'Còn hàng',    bg: 'bg-teal-50',  text: 'text-teal-700',  dot: 'bg-teal-500'  },
  'low-stock':    { label: 'Sắp hết',     bg: 'bg-red-50',   text: 'text-red-600',   dot: 'bg-red-500'   },
  'out-of-stock': { label: 'Hết hàng',    bg: 'bg-gray-100', text: 'text-gray-500',  dot: 'bg-gray-400'  },
};

interface Props {
  status: StockStatus;
}

const InventoryStatusBadge: React.FC<Props> = ({ status }) => {
  const { label, bg, text, dot } = config[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${bg} ${text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`}></span>
      {label}
    </span>
  );
};

export default InventoryStatusBadge;
