"use client";

import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import MetricCard from '@/components/dashboard/MetricCard';
import RecentOrders from '@/components/dashboard/RecentOrders';
import InventoryAlerts from '@/components/dashboard/InventoryAlerts';

interface DashboardSummary {
  totalRevenue: number;
  totalOrders: number;
  lowStockItems: number;
  expectedProfit: number;
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  totalPrice: number;
  customerName: string;
  createdAt: string;
}

interface Product {
  id: string;
  name: string;
  sku: string;
  salePrice: number;
  stock: number;
}

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const API_BASE = 'http://localhost:5139/api';

        // Fetch Summary
        let summaryData: DashboardSummary;
        try {
          const res = await fetch(`${API_BASE}/dashboard/summary`);
          if (res.ok) {
            summaryData = await res.json();
          } else throw new Error();
        } catch {
          summaryData = {
            totalRevenue: 1500000,
            totalOrders: 12,
            lowStockItems: 3,
            expectedProfit: 300000
          };
        }
        setSummary(summaryData);

        // Fetch Orders
        let ordersData: Order[];
        try {
          const res = await fetch(`${API_BASE}/orders`);
          if (res.ok) {
            ordersData = await res.json();
          } else throw new Error();
        } catch {
          ordersData = [
            { id: "1", orderNumber: "ORD-2024-001", status: "Pending", totalPrice: 250000, customerName: "Trần Thị B", createdAt: "" },
            { id: "2", orderNumber: "ORD-2024-002", status: "Shipping", totalPrice: 1250000, customerName: "Lê Văn C", createdAt: "" },
            { id: "3", orderNumber: "ORD-2024-003", status: "Confirmed", totalPrice: 85000, customerName: "Phạm Thị D", createdAt: "" }
          ];
        }
        setOrders(ordersData);

        // Fetch Products for Low Stock
        let productsData: Product[];
        try {
          const res = await fetch(`${API_BASE}/products`);
          if (res.ok) {
            productsData = await res.json();
          } else throw new Error();
        } catch {
          productsData = [
            { id: "p1", name: "Áo thun nam basic", sku: "AT-001", salePrice: 150000, stock: 2 },
            { id: "p2", name: "Quần jean nữ ống rộng", sku: "QJ-002", salePrice: 250000, stock: 5 },
            { id: "p3", name: "Giày thể thao Sneaker", sku: "GT-003", salePrice: 550000, stock: 1 }
          ];
        }
        setLowStockProducts(productsData.filter(p => p.stock <= 5));

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#f8f9fc]">
      <Sidebar />
      <main className="flex-1 md:ml-64 flex flex-col">
        <Topbar />
        <div className="p-8 space-y-8 max-w-[1600px] mx-auto w-full">
          {/* Header */}
          <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-[#1900a9] tracking-tight">Tổng quan hoạt động</h1>
              <p className="text-[#464555] font-medium mt-1">Theo dõi tình hình kinh doanh và xu hướng bán hàng của bạn.</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-[#e7e8eb] text-[#1e00a9] px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition-all flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">download</span>
                Xuất dữ liệu
              </button>
              <button className="bg-gradient-to-br from-[#1e00a9] to-[#3525cd] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 shadow-lg shadow-[#1e00a9]/20 transition-all flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">add</span>
                Thêm sản phẩm
              </button>
            </div>
          </section>

          {/* Metrics */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard 
              label="Tổng doanh thu" 
              value={summary ? formatCurrency(summary.totalRevenue) : '...'} 
              icon="payments" 
              trend="+12%" 
            />
            <MetricCard 
              label="Tổng đơn hàng" 
              value={summary ? `${summary.totalOrders} đơn` : '...'} 
              icon="shopping_bag" 
              subValue={`Hôm nay: ${summary?.totalOrders || 0}`} 
            />
            <MetricCard 
              label="Lợi nhuận dự kiến" 
              value={summary ? formatCurrency(summary.expectedProfit) : '...'} 
              icon="stars" 
              highlighted 
            />
            <MetricCard 
              label="Sản phẩm sắp hết hàng" 
              value={summary ? `${summary.lowStockItems} SP` : '...'} 
              icon="inventory_2" 
            />
          </section>

          {/* Charts & Alerts */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-[0_12px_32px_-4px_rgba(25,28,30,0.06)] p-8 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl font-extrabold text-[#191c1e]">Phân tích lợi nhuận</h2>
                  <p className="text-[#464555] text-sm">Phân bổ Doanh thu và Lợi nhuận</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#1e00a9]"></span>
                    <span className="text-xs font-bold text-[#464555]">Doanh thu</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#00696e]"></span>
                    <span className="text-xs font-bold text-[#464555]">Lợi nhuận</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 min-h-[300px] relative mt-4">
                <div className="absolute inset-0 bg-gray-50 rounded-xl overflow-hidden">
                  <img 
                    alt="Biểu đồ phân tích" 
                    className="w-full h-full object-cover mix-blend-multiply opacity-80" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLL7FquP9shTglYrnI_yJOVdhsAVYVA9d85oZfKpNDSfpZA9Tos40ydvH69afF6TgAJ8GX1svktrlkgw5ccsFuf92FvEwi6vs5fsNVG84VyD3i0jRpOLlKNmNHWNJrW5XmNubZJMRG7tz6A75sP9JJDY-2Eddm4DCcp3nxQHD71M46ymetfS9GdFeieePlRGWgyBUca1bdmN9aV_yaYy4Iljhg_NspZF_zLw5zYPh8-Xmk69iALO2D73N6OcD90rgp3dWw39Y6A3w" 
                  />
                </div>
                <div className="absolute bottom-4 left-0 right-0 flex justify-between px-6 text-[10px] font-bold text-[#464555]/40">
                  <span>01 THG 8</span><span>07 THG 8</span><span>14 THG 8</span><span>21 THG 8</span><span>30 THG 8</span>
                </div>
              </div>
            </div>
            <InventoryAlerts products={lowStockProducts} loading={loading} />
          </section>

          {/* Orders Table */}
          <RecentOrders orders={orders} loading={loading} />
        </div>
      </main>
    </div>
  );
}
