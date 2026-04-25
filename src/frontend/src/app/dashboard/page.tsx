"use client";

import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import MetricCard from '@/components/dashboard/MetricCard';
import RecentOrders from '@/components/dashboard/RecentOrders';
import InventoryAlerts from '@/components/dashboard/InventoryAlerts';
import BusinessAnalysis from '@/components/dashboard/BusinessAnalysis';
import Link from 'next/link';

import { dashboardService, DashboardSummary } from '@/services/dashboard.service';
import { orderService } from '@/services/order.service';
import { productService } from '@/services/product.service';
import { Order } from '@/types/order';
import { Product } from '@/types/product';

// Giữ các interface đặc thù cho Dashboard Analysis nếu chưa có trong service
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

// Mở rộng DashboardSummary từ service với các field cho UI analysis
interface DashboardAnalysis extends DashboardSummary {
  expectedProfit: number;
  dailyTrends: DailyTrend[];
  categoryBreakdown: CategorySale[];
  topProducts: ProductSale[];
}

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardAnalysis | null>(null);
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

        // Fetch Summary
        try {
          const data = await dashboardService.getSummary();
          setSummary({
            ...data,
            lowStockItems: data.lowStockItems,
            expectedProfit: data.totalRevenue * 0.2, 
            dailyTrends: [],
            categoryBreakdown: [],
            topProducts: []
          });
        } catch (error) {
          console.error('Failed to fetch dashboard summary:', error);
        }

        // Fetch Orders
        try {
          const data = await orderService.getOrders();
          setOrders(data.slice(0, 5));
        } catch (error) {
          console.error('Failed to fetch orders for dashboard:', error);
        }

        // Fetch Products for Low Stock
        try {
          const data = await productService.getLowStockProducts();
          setLowStockProducts(data);
        } catch (error) {
          console.error('Failed to fetch low stock products:', error);
        }

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
