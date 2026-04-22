"use client";

import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import MetricCard from '@/components/dashboard/MetricCard';
import RecentOrders from '@/components/dashboard/RecentOrders';
import InventoryAlerts from '@/components/dashboard/InventoryAlerts';
import BusinessAnalysis from '@/components/dashboard/BusinessAnalysis';
import Link from 'next/link';

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

interface ProductSale {
  name: string;
  quantity: number;
}

interface DashboardSummary {
  totalRevenue: number;
  totalOrders: number;
  lowStockItems: number;
  expectedProfit: number;
  dailyTrends: DailyTrend[];
  categoryBreakdown: CategorySale[];
  topProducts: ProductSale[];
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
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(amount);
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
            expectedProfit: 300000,
            dailyTrends: [
              { date: '16/04', revenue: 120000, profit: 30000 },
              { date: '17/04', revenue: 150000, profit: 35000 },
              { date: '18/04', revenue: 200000, profit: 50000 },
              { date: '19/04', revenue: 180000, profit: 45000 },
              { date: '20/04', revenue: 250000, profit: 60000 },
              { date: '21/04', revenue: 300000, profit: 75000 },
              { date: '22/04', revenue: 300000, profit: 75000 },
            ],
            categoryBreakdown: [
              { category: 'Thời trang', revenue: 800000, count: 6 },
              { category: 'Điện tử', revenue: 450000, count: 2 },
              { category: 'Gia dụng', revenue: 250000, count: 4 },
            ],
            topProducts: [
              { name: 'Áo thun basic', quantity: 15 },
              { name: 'Quần Jean ống rộng', quantity: 10 },
              { name: 'Tai nghe Bluetooth', quantity: 8 },
            ]
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
        let productsLowStock: Product[];
        try {
          const res = await fetch(`${API_BASE}/products/low-stock`);
          if (res.ok) {
            productsLowStock = await res.json();
          } else throw new Error();
        } catch {
          console.log("Error fetching low stock products");
          productsLowStock = [
            { id: "p1", name: "Áo thun nam basic", sku: "AT-001", salePrice: 150000, stock: 2 },
            { id: "p2", name: "Quần jean nữ ống rộng", sku: "QJ-002", salePrice: 250000, stock: 5 },
            { id: "p3", name: "Giày thể thao Sneaker", sku: "GT-003", salePrice: 550000, stock: 1 }
          ];
        }
        setLowStockProducts(productsLowStock);

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
              <h1 className="text-3xl font-extrabold text-[#1900a9] tracking-tight font-headline">Tổng quan hoạt động</h1>
              <p className="text-[#464555] font-medium mt-1">Theo dõi tình hình kinh doanh và xu hướng bán hàng của bạn.</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-[#e7e8eb] text-[#1e00a9] px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition-all flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">download</span>
                Xuất dữ liệu
              </button>
              <Link href="/products/create" style={{ cursor: "pointer" }} className="bg-gradient-to-br from-[#1e00a9] to-[#3525cd] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 shadow-lg shadow-[#1e00a9]/20 transition-all flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">add</span>
                Thêm sản phẩm
              </Link>
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

          {/* Business Analysis & Alerts */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <BusinessAnalysis 
              dailyTrends={summary?.dailyTrends || []} 
              categoryBreakdown={summary?.categoryBreakdown || []} 
            />
            <InventoryAlerts products={lowStockProducts} loading={loading} />
          </section>

          {/* Recent Orders Table */}
          <RecentOrders orders={orders} loading={loading} />
        </div>
      </main>
    </div>
  );
}
