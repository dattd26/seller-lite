"use client";

import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: string;
  trend?: string;
  highlighted?: boolean;
  subValue?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, icon, trend, highlighted, subValue }) => {
  if (highlighted) {
    return (
      <div className="bg-gradient-to-br from-[#1e00a9] to-[#3525cd] p-6 rounded-2xl shadow-xl shadow-[#1e00a9]/10 transition-transform hover:-translate-y-1 relative overflow-hidden">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
        <div className="flex justify-between items-start mb-4 relative z-10">
          <div className="p-2.5 bg-white/20 rounded-2xl text-white">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
          </div>
          <span className="bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">Chỉ số chính</span>
        </div>
        <p className="text-white/70 text-sm font-medium relative z-10">{label}</p>
        <h3 className="text-2xl font-extrabold text-white mt-1 relative z-10">{value}</h3>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-[0_12px_32px_-4px_rgba(25,28,30,0.06)] border border-white/50 transition-transform hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2.5 rounded-2xl ${label === 'Sản phẩm sắp hết hàng' ? 'bg-red-50 text-red-600' : 'bg-[#1e00a9]/5 text-[#1e00a9]'}`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        {trend && (
          <span className="text-[#00696e] text-xs font-bold bg-[#02f4fe]/20 px-2.5 py-1 rounded-full flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">trending_up</span>
            {trend}
          </span>
        )}
        {subValue && (
          <div className="text-[10px] text-[#464555] font-bold text-right">
            <p>{subValue}</p>
          </div>
        )}
      </div>
      <p className="text-[#464555] text-sm font-medium">{label}</p>
      <h3 className="text-2xl font-extrabold text-[#191c1e] mt-1">{value}</h3>
    </div>
  );
};

export default MetricCard;
