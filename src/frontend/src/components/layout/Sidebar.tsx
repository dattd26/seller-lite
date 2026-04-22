"use client";

import React from 'react';

const Sidebar = () => {
  const menuItems = [
    { icon: 'dashboard', label: 'Tổng quan', active: true },
    { icon: 'shopping_cart', label: 'Đơn hàng' },
    { icon: 'inventory_2', label: 'Sản phẩm' },
    { icon: 'layers', label: 'Tồn kho' },
    { icon: 'monitoring', label: 'Phân tích' },
    { icon: 'settings', label: 'Cài đặt' },
  ];

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 bg-[#f2f4f6] p-6 gap-2 fixed left-0 top-0 shadow-[0_12px_32px_-4px_rgba(25,28,30,0.06)] z-20">
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1e00a9] to-[#3525cd] flex items-center justify-center text-white shadow-lg overflow-hidden">
          <img alt="SellerLite Logo" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAL3oEKqV2cwbGil_EDIvqH4JJuZWItdeZc5-1br-yu7uMA3CFswhmjb31SkdaeTaOm3mzqAkNtPgN2qkI51QwaYn-qNFhEi9f9tMJWVeXdeV0y57r4ltTyWKT4wdapYKY0o-4RXiKClsHgmIKxSJaVKKdEriDJN1-QFeAPUl3_6P6EOGKLFxEboRKezCrjObXQ9CxDVNAImtnn7UfmEPGYBNzl5E5M62YXHDlnnaK6LMQHugf4Q8G5e-yz3skWt1M3-nftJYjkVqo" />
        </div>
        <div>
          <div className="text-lg font-extrabold text-[#1900a9] tracking-tight leading-tight font-serif">SellerLite</div>
          <div className="text-[10px] uppercase tracking-widest text-[#464555] font-bold">Dành Cho Người Bán</div>
        </div>
      </div>
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <a
            key={item.label}
            className={`flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-200 ${
              item.active
                ? 'bg-white text-[#1900a9] shadow-sm font-bold'
                : 'text-[#464555] hover:bg-white/50 hover:text-[#1900a9]'
            }`}
            href="#"
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="text-[14px]">{item.label}</span>
          </a>
        ))}
      </nav>
      <div className="mt-auto space-y-2 pt-6 border-t border-gray-200">
        <a className="flex items-center gap-3 px-4 py-3 text-[#464555] hover:bg-white/50 hover:text-[#1900a9] rounded-full transition-all duration-200" href="#">
          <span className="material-symbols-outlined">help</span>
          <span className="text-[14px]">Hỗ trợ</span>
        </a>
        <a className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-full transition-all duration-200" href="#">
          <span className="material-symbols-outlined">logout</span>
          <span className="text-[14px]">Đăng xuất</span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
