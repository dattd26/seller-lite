import React from 'react';

interface SummaryData {
  totalProducts: number;
  lowStockAlerts: number;
  totalInventoryValue: number;
  totalProductsChange?: number; // % change
}

interface Props {
  data: SummaryData | null;
  loading: boolean;
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(amount);

const InventorySummaryCards: React.FC<Props> = ({ data, loading }) => {
  const cards = [
    {
      id: 'total-products',
      icon: 'category',
      iconBg: 'bg-[#e2dfff]',
      iconColor: 'text-[#1e00a9]',
      label: 'Tổng sản phẩm',
      value: loading ? '...' : (data?.totalProducts ?? 0).toLocaleString('vi-VN'),
      badge: data?.totalProductsChange ? `+${data.totalProductsChange}% so với tháng trước` : null,
      badgeColor: 'text-teal-600',
      border: '',
    },
    {
      id: 'low-stock-alerts',
      icon: 'error',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      label: 'Cảnh báo sắp hết',
      value: loading ? '...' : (data?.lowStockAlerts ?? 0).toString(),
      badge: data?.lowStockAlerts ? 'Cần xử lý ngay' : null,
      badgeColor: 'text-red-600',
      valueColor: 'text-red-600',
      border: 'border-t-4 border-red-200',
    },
    {
      id: 'inventory-value',
      icon: 'payments',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600',
      label: 'Tổng giá trị tồn kho',
      value: loading ? '...' : formatCurrency(data?.totalInventoryValue ?? 0),
      badge: null,
      badgeColor: '',
      border: '',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {cards.map((card) => (
        <div
          key={card.id}
          id={card.id}
          className={`bg-white rounded-2xl p-8 shadow-[0_8px_24px_-4px_rgba(25,28,30,0.06)] hover:shadow-[0_12px_32px_-4px_rgba(25,28,30,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${card.border}`}
        >
          <div className="flex justify-between items-start">
            <span className={`material-symbols-outlined ${card.iconColor} ${card.iconBg} p-3 rounded-2xl text-2xl`}>
              {card.icon}
            </span>
            {card.badge && (
              <span className={`text-[10px] font-bold uppercase tracking-widest ${card.badgeColor}`}>
                {card.badge}
              </span>
            )}
          </div>
          <div className="mt-6">
            <p className="text-[#464555] text-sm font-medium">{card.label}</p>
            <p className={`text-4xl font-black font-headline mt-1 tracking-tight ${card.valueColor ?? 'text-[#191c1e]'}`}>
              {card.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InventorySummaryCards;
