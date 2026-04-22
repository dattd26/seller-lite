"use client";

import React from 'react';

interface DailyTrend {
  date: string;
  revenue: number;
  profit: number;
}

interface CategorySale {
  category: string;
  revenue: number;
  count: number;
}

interface BusinessAnalysisProps {
  dailyTrends: DailyTrend[];
  categoryBreakdown: CategorySale[];
}

const BusinessAnalysis: React.FC<BusinessAnalysisProps> = ({ dailyTrends, categoryBreakdown }) => {
  const maxRevenue = Math.max(...dailyTrends.map(t => t.revenue), 1);
  const chartHeight = 200;
  const chartWidth = 600;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(amount);
  };

  // Generate SVG Path for Revenue
  const points = dailyTrends.map((t, i) => {
    const x = (i / (dailyTrends.length - 1)) * chartWidth;
    const y = chartHeight - (t.revenue / maxRevenue) * chartHeight;
    return `${x},${y}`;
  }).join(' ');

  // Generate SVG Path for Profit
  const profitPoints = dailyTrends.map((t, i) => {
    const x = (i / (dailyTrends.length - 1)) * chartWidth;
    const y = chartHeight - (t.profit / maxRevenue) * chartHeight;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="lg:col-span-2 bg-white rounded-2xl shadow-[0_12px_32px_-4px_rgba(25,28,30,0.06)] p-8 flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-extrabold text-[#191c1e]">Phân tích kinh doanh</h2>
          <p className="text-[#464555] text-sm">Xu hướng doanh thu và lợi nhuận 7 ngày qua</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#1e00a9]"></span>
            <span className="text-xs font-bold text-[#464555]">Doanh thu</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#00dce5]"></span>
            <span className="text-xs font-bold text-[#464555]">Lợi nhuận</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Trend Chart */}
        <div className="md:col-span-2 space-y-4">
          <div className="relative h-[220px] w-full">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full overflow-visible">
              {/* Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
                <line 
                  key={i}
                  x1="0" y1={chartHeight * p} x2={chartWidth} y2={chartHeight * p} 
                  stroke="#f2f4f6" strokeWidth="1" 
                />
              ))}
              
              {/* Revenue Area */}
              <path
                d={`M 0,${chartHeight} L ${points} L ${chartWidth},${chartHeight} Z`}
                fill="url(#gradient-rev)"
                opacity="0.1"
              />
              <defs>
                <linearGradient id="gradient-rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1e00a9" />
                  <stop offset="100%" stopColor="#1e00a9" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Revenue Line */}
              <polyline
                fill="none"
                stroke="#1e00a9"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
              />

              {/* Profit Line */}
              <polyline
                fill="none"
                stroke="#00dce5"
                strokeWidth="2"
                strokeDasharray="4 4"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={profitPoints}
              />

              {/* Data Points and Labels */}
              {dailyTrends.map((t, i) => {
                const x = (i / (dailyTrends.length - 1)) * chartWidth;
                const y = chartHeight - (t.revenue / maxRevenue) * chartHeight;
                
                const shortVal = t.revenue >= 1000 ? `${Math.round(t.revenue / 1000)}k` : t.revenue.toString();

                return (
                  <g key={i} className="group cursor-pointer">
                    <rect 
                      x={x - 15} y={y - 25} width="30" height="14" 
                      rx="4" fill="white" className="opacity-0 group-hover:opacity-100 transition-opacity"
                      filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
                    />
                    
                    {/* Revenue Value Label */}
                    <text
                      x={x}
                      y={y - 12}
                      textAnchor="middle"
                      className="text-[9px] font-black fill-[#1e00a9] opacity-80"
                    >
                      {shortVal}
                    </text>
                    
                    {/* Point Circle */}
                    <circle
                      cx={x}
                      cy={y}
                      r="4"
                      fill="white"
                      stroke="#1e00a9"
                      strokeWidth="2.5"
                      className="transition-all duration-300 group-hover:r-6"
                    />
                  </g>
                );
              })}
            </svg>
            
            {/* X Axis Labels */}
            <div className="flex justify-between mt-4 text-[10px] font-bold text-[#464555]/60 uppercase tracking-wider">
              {dailyTrends.map((t, i) => (
                <span key={i}>{t.date}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-[#191c1e] uppercase tracking-widest opacity-60">Theo ngành hàng</h3>
          <div className="space-y-4">
            {categoryBreakdown.map((cat, i) => {
              const totalCatRev = categoryBreakdown.reduce((acc, c) => acc + c.revenue, 0);
              const percentage = (cat.revenue / totalCatRev) * 100;
              
              return (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-[#191c1e]">{cat.category}</span>
                    <span className="text-[#464555]">{formatCurrency(cat.revenue)}</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#f2f4f6] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#1e00a9] rounded-full transition-all duration-1000" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-[10px] text-[#464555]/60 font-medium">{cat.count} đơn hàng đã hoàn thành</p>
                </div>
              );
            })}
          </div>
          
          <div className="pt-4 mt-4 border-t border-gray-100">
             <div className="flex items-center gap-2 p-3 bg-[#1e00a9]/5 rounded-xl">
                <span className="material-symbols-outlined text-[#1e00a9] text-lg">insights</span>
                <p className="text-xs font-medium text-[#1e00a9]">
                  Ngành hàng <strong>{categoryBreakdown[0]?.category}</strong> đang có doanh thu cao nhất.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessAnalysis;
