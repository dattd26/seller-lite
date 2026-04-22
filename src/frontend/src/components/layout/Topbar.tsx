"use client";

import React from 'react';

const Topbar = () => {
  return (
    <header className="flex justify-between items-center w-full px-8 py-4 bg-[#f8f9fc] sticky top-0 z-10">
      <div className="flex items-center gap-6">
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#464555] text-lg opacity-60">search</span>
          <input 
            className="bg-[#eceef0] border-none rounded-full pl-12 pr-6 py-2.5 w-64 md:w-96 text-sm focus:ring-2 focus:ring-[#1e00a9]/20 placeholder:text-[#464555]/60 transition-all outline-none" 
            placeholder="Tìm kiếm đơn hàng, sản phẩm..." 
            type="text" 
          />
        </div>
      </div>
      <div className="flex items-center gap-5">
        <button className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#f2f4f6] transition-colors group">
          <span className="material-symbols-outlined text-[#464555] group-active:scale-95 transition-transform">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full ring-2 ring-[#f8f9fc]"></span>
        </button>
        <div className="h-8 w-[1px] bg-gray-200"></div>
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-[#191c1e] leading-none">Nguyễn Văn A</p>
            <p className="text-[10px] text-[#464555] font-medium uppercase tracking-wider mt-1">Chủ cửa hàng</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#e7e8eb] overflow-hidden border-2 border-white shadow-sm group-active:scale-95 transition-transform">
            <img 
              alt="Merchant Profile" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJgDTILK_6b0B52PeumoRwIdyzJJeQFrJJVjo_-htPkUgUhFK9BlMwmZ4IlZypURVQga9daw1siWh9z9PbGVgyOuWhQMIFigjxfzLO1xjG0w3uH0LaraRJ38oOlcyvI0fE60BvCLTDm0GjoK7qZRhENvM8_hfeteZ4blepV9IN7S5gfrKlodQzU6FI6fK_z9E4JqFoFqKnMPMHiUEo3zZtqI47rfN4iawJIzDG_XG0DHwdB9G32diBOvw5Vd_kfA8g53XTz6RVcY8" 
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
