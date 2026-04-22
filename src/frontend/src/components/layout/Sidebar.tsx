"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  activePath?: string;
}

const menuItems = [
  { icon: 'dashboard',     label: 'Tổng quan',    href: '/dashboard'  },
  { icon: 'inventory_2',   label: 'Kho hàng',     href: '/inventory'  },
  { icon: 'shopping_cart', label: 'Đơn hàng',     href: '/orders'     },
  { icon: 'group',         label: 'Khách hàng',   href: '/customers'  },
  { icon: 'monitoring',    label: 'Phân tích',    href: '/analytics'  },
];

const Sidebar: React.FC<SidebarProps> = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 bg-[#f2f4f6] p-6 gap-2 fixed left-0 top-0 shadow-[0_12px_32px_-4px_rgba(25,28,30,0.06)] z-20">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1e00a9] to-[#3525cd] flex items-center justify-center text-white shadow-lg overflow-hidden">
          <span className="material-symbols-outlined text-white">storefront</span>
        </div>
        <div>
          <div className="text-lg font-extrabold text-[#1900a9] tracking-tight leading-tight font-headline">SellerLite</div>
          <div className="text-[10px] uppercase tracking-widest text-[#464555] font-bold">Dành Cho Người Bán</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-200 ${
                isActive
                  ? 'bg-white text-[#1900a9] shadow-sm font-bold'
                  : 'text-[#464555] hover:bg-white/50 hover:text-[#1900a9]'
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span className="text-[14px]">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Links */}
      <div className="mt-auto space-y-1 pt-6 border-t border-gray-200">
        <Link href="/settings" className="flex items-center gap-3 px-4 py-3 text-[#464555] hover:bg-white/50 hover:text-[#1900a9] rounded-full transition-all duration-200">
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[14px]">Cài đặt</span>
        </Link>
        <Link href="/support" className="flex items-center gap-3 px-4 py-3 text-[#464555] hover:bg-white/50 hover:text-[#1900a9] rounded-full transition-all duration-200">
          <span className="material-symbols-outlined">help</span>
          <span className="text-[14px]">Hỗ trợ</span>
        </Link>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-full transition-all duration-200">
          <span className="material-symbols-outlined">logout</span>
          <span className="text-[14px]">Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
