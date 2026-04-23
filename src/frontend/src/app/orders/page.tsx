"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import OrderStatusBadge, { OrderStatus } from '@/components/orders/OrderStatusBadge';
import OrderActionMenu from '@/components/orders/OrderActionMenu';
import CreateOrderModal from '@/components/orders/CreateOrderModal';

const API_BASE = 'http://localhost:5139/api';
const PAGE_SIZE = 8;

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  totalPrice: number;
  customerName: string;
  customerPhone?: string;
  createdAt: string;
}

interface Product {
  id: string;
  name: string;
  sku: string;
  salePrice: number;
  stock: number;
}

const MOCK_ORDERS: Order[] = [
  { id: '1', orderNumber: 'ORD-2024-001', status: 'Pending',   totalPrice: 250000,  customerName: 'Trần Thị Bích',    createdAt: new Date().toISOString() },
  { id: '2', orderNumber: 'ORD-2024-002', status: 'Shipping',  totalPrice: 1250000, customerName: 'Lê Văn Cường',     createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: '3', orderNumber: 'ORD-2024-003', status: 'Completed', totalPrice: 850000,  customerName: 'Phạm Thị Diệu',    createdAt: new Date(Date.now() - 7200000).toISOString() },
  { id: '4', orderNumber: 'ORD-2024-004', status: 'Cancelled', totalPrice: 125000,  customerName: 'Nguyễn Hoàng Anh', createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: '5', orderNumber: 'ORD-2024-005', status: 'Confirmed', totalPrice: 3200000, customerName: 'Võ Thị Hoa',       createdAt: new Date(Date.now() - 172800000).toISOString() },
  { id: '6', orderNumber: 'ORD-2024-006', status: 'Shipping',  totalPrice: 780000,  customerName: 'Đặng Minh Tuấn',   createdAt: new Date(Date.now() - 259200000).toISOString() },
];

const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Áo thun Polo Nam', sku: 'FASH-001', salePrice: 125000, stock: 51 },
  { id: 'p2', name: 'Quần Jean Nữ', sku: 'FASH-050', salePrice: 250000, stock: 10 },
  { id: 'p3', name: 'Cáp sạc USB-C', sku: 'TECH-001', salePrice: 88000, stock: 101 },
  { id: 'p4', name: 'Giày Thể Thao', sku: 'FASH-060', salePrice: 550000, stock: 8 },
];

type TabFilter = 'all' | OrderStatus;
type SortField = 'date' | 'amount';

const TABS: { key: TabFilter; label: string }[] = [
  { key: 'all', label: 'Tất cả' },
  { key: 'Pending', label: 'Chờ xử lý' },
  { key: 'Confirmed', label: 'Đã xác nhận' },
  { key: 'Shipping', label: 'Đang giao' },
  { key: 'Completed', label: 'Hoàn thành' },
  { key: 'Cancelled', label: 'Đã hủy' },
];

const formatCurrency = (v: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(v);

const formatDate = (iso: string) => {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }) +
    ' • ' + d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
};

const getInitials = (name: string) =>
  name.split(' ').map(p => p[0]).slice(-2).join('').toUpperCase();

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabFilter>('all');
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/orders`);
      if (!res.ok) throw new Error();
      setOrders(await res.json());
    } catch {
      setOrders(MOCK_ORDERS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
    fetch(`${API_BASE}/products`).then(r => r.json()).then(setProducts).catch(() => setProducts(MOCK_PRODUCTS));
  }, [fetchOrders]);

  const handleUpdateStatus = async (id: string, status: OrderStatus) => {
    try {
      const statusMap: Record<OrderStatus, number> = { Pending: 0, Confirmed: 1, Shipping: 2, Completed: 3, Cancelled: 4, Returning: 5, Returned: 6 };
      const res = await fetch(`${API_BASE}/orders/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: statusMap[status] }),
      });
      if (!res.ok) throw new Error();
    } catch {
      // Optimistic update for demo
    }
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const handleView = (order: Order) => {
    alert(`Chi tiết đơn hàng ${order.orderNumber}\nKhách: ${order.customerName}\nGiá trị: ${formatCurrency(order.totalPrice)}`);
  };

  // Summary stats
  const totalRevenue = orders.filter(o => o.status === 'Completed').reduce((s, o) => s + o.totalPrice, 0);
  const activeShipments = orders.filter(o => o.status === 'Shipping').length;
  const pendingCount = orders.filter(o => o.status === 'Pending').length;

  // Filter + Sort
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return orders
      .filter(o => (activeTab === 'all' || o.status === activeTab) &&
        (!q || o.orderNumber.toLowerCase().includes(q) || o.customerName.toLowerCase().includes(q)))
      .sort((a, b) => {
        const dir = sortDir === 'asc' ? 1 : -1;
        if (sortField === 'date') return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * dir;
        return (a.totalPrice - b.totalPrice) * dir;
      });
  }, [orders, activeTab, search, sortField, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const tabCount = (key: TabFilter) => key === 'all' ? orders.length : orders.filter(o => o.status === key).length;

  return (
    <div className="flex min-h-screen bg-[#f8f9fc]">
      <Sidebar />
      <main className="flex-1 md:ml-64 flex flex-col">
        <Topbar />

        <div className="px-8 pb-16 max-w-[1600px] mx-auto w-full">
          {/* Page Header + KPI */}
          <div className="py-8 flex flex-col md:flex-row gap-8 items-end justify-between mb-2">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-[#191c1e] font-headline">Quản lý đơn hàng</h1>
              <p className="text-[#464555] mt-1">Quản lý toàn bộ vòng đời đơn hàng của cửa hàng.</p>
            </div>

            {/* KPI Cards */}
            <div className="flex gap-4 shrink-0">
              <div className="bg-white px-6 py-5 rounded-2xl shadow-[0_8px_24px_-4px_rgba(25,28,30,0.06)] min-w-[180px]">
                <p className="text-xs text-[#464555] font-medium">Doanh thu (Hoàn thành)</p>
                <p className="text-2xl font-extrabold text-teal-600 font-headline mt-1">{formatCurrency(totalRevenue)}</p>
                <div className="flex items-center gap-1 text-[10px] font-bold text-teal-600 bg-teal-50 w-fit px-2 py-0.5 rounded-full mt-2">
                  <span className="material-symbols-outlined text-xs">trending_up</span> +12%
                </div>
              </div>
              <div className="bg-white px-6 py-5 rounded-2xl shadow-[0_8px_24px_-4px_rgba(25,28,30,0.06)] min-w-[160px]">
                <p className="text-xs text-[#464555] font-medium">Đang giao hàng</p>
                <p className="text-2xl font-extrabold text-[#1e00a9] font-headline mt-1">{activeShipments}</p>
                <div className="flex items-center gap-1 text-[10px] font-bold text-[#1e00a9] bg-[#e2dfff] w-fit px-2 py-0.5 rounded-full mt-2">
                  <span className="material-symbols-outlined text-xs">local_shipping</span> đơn
                </div>
              </div>
              <div className="bg-white px-6 py-5 rounded-2xl shadow-[0_8px_24px_-4px_rgba(25,28,30,0.06)] min-w-[160px]">
                <p className="text-xs text-[#464555] font-medium">Chờ xử lý</p>
                <p className={`text-2xl font-extrabold font-headline mt-1 ${pendingCount > 0 ? 'text-amber-600' : 'text-[#191c1e]'}`}>{pendingCount}</p>
                <div className={`flex items-center gap-1 text-[10px] font-bold w-fit px-2 py-0.5 rounded-full mt-2 ${pendingCount > 0 ? 'text-amber-700 bg-amber-50' : 'text-[#464555] bg-[#f2f4f6]'}`}>
                  <span className="material-symbols-outlined text-xs">pending</span> đơn
                </div>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#464555] text-lg">search</span>
                <input
                  id="orders-search"
                  value={search}
                  onChange={e => { setSearch(e.target.value); setPage(1); }}
                  placeholder="Tìm mã đơn, tên khách hàng..."
                  className="pl-11 pr-5 py-2.5 bg-white rounded-full text-sm text-[#191c1e] shadow-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1e00a9]/20 w-80"
                />
              </div>

              {/* Sort */}
              <select
                value={`${sortField}-${sortDir}`}
                onChange={e => {
                  const [f, d] = e.target.value.split('-');
                  setSortField(f as SortField); setSortDir(d as 'asc' | 'desc'); setPage(1);
                }}
                className="px-4 py-2.5 bg-white rounded-full text-sm text-[#191c1e] shadow-sm border border-gray-100 focus:outline-none cursor-pointer"
              >
                <option value="date-desc">Mới nhất trước</option>
                <option value="date-asc">Cũ nhất trước</option>
                <option value="amount-desc">Giá trị: Cao → Thấp</option>
                <option value="amount-asc">Giá trị: Thấp → Cao</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <button
                id="btn-export-orders"
                onClick={() => alert('Chức năng xuất CSV đang phát triển.')}
                className="px-5 py-2.5 rounded-full text-sm font-bold text-[#1e00a9] bg-[#e2dfff] hover:bg-[#c3c0ff] transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">file_download</span>
                Xuất dữ liệu
              </button>
              <button
                id="btn-create-order"
                onClick={() => setShowModal(true)}
                className="bg-gradient-to-br from-[#1e00a9] to-[#3525cd] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-[#1e00a9]/20"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                Tạo đơn hàng
              </button>
            </div>
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-6 mb-5 overflow-x-auto pb-1 border-b border-gray-100">
            {TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => { setActiveTab(tab.key); setPage(1); }}
                className={`relative pb-3 text-sm font-bold whitespace-nowrap transition-colors flex items-center gap-2 ${
                  activeTab === tab.key ? 'text-[#1e00a9]' : 'text-[#464555] hover:text-[#191c1e]'
                }`}
              >
                {tab.label}
                {tabCount(tab.key) > 0 && (
                  <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${activeTab === tab.key ? 'bg-[#1e00a9] text-white' : 'bg-[#e7e8eb] text-[#464555]'}`}>
                    {tabCount(tab.key)}
                  </span>
                )}
                {activeTab === tab.key && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1e00a9] rounded-full"></span>
                )}
              </button>
            ))}
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-2xl shadow-[0_8px_24px_-4px_rgba(25,28,30,0.06)] overflow-hidden">
            {/* Column Headers */}
            <div className="grid grid-cols-[1.2fr_2fr_1.6fr_1.3fr_1.4fr_0.5fr] px-8 py-4 bg-[#f8f9fc] text-[10px] font-black uppercase tracking-widest text-[#464555]">
              <div>Mã đơn hàng</div>
              <div>Khách hàng</div>
              <div>Thời gian đặt</div>
              <div>Giá trị</div>
              <div>Trạng thái</div>
              <div className="text-right">Hành động</div>
            </div>

            {/* Body */}
            <div className="divide-y divide-gray-50">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="grid grid-cols-[1.2fr_2fr_1.6fr_1.3fr_1.4fr_0.5fr] px-8 py-5 items-center animate-pulse">
                    <div className="h-3 w-24 bg-gray-100 rounded"></div>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gray-100"></div>
                      <div className="space-y-1.5">
                        <div className="h-3 w-28 bg-gray-100 rounded"></div>
                        <div className="h-2 w-20 bg-gray-100 rounded"></div>
                      </div>
                    </div>
                    <div className="h-3 w-32 bg-gray-100 rounded"></div>
                    <div className="h-3 w-20 bg-gray-100 rounded"></div>
                    <div className="h-5 w-24 bg-gray-100 rounded-full"></div>
                    <div></div>
                  </div>
                ))
              ) : paginated.length === 0 ? (
                <div className="px-8 py-20 text-center">
                  <span className="material-symbols-outlined text-5xl text-[#464555]/30">shopping_cart</span>
                  <p className="mt-4 text-[#464555] font-medium">Không có đơn hàng nào.</p>
                  <p className="text-sm text-[#464555]/60 mt-1">Thử thay đổi bộ lọc hoặc tạo đơn mới.</p>
                </div>
              ) : (
                paginated.map(order => (
                  <div
                    key={order.id}
                    className="grid grid-cols-[1.2fr_2fr_1.6fr_1.3fr_1.4fr_0.5fr] px-8 py-5 items-center hover:bg-[#f8f9fc] transition-colors duration-150 cursor-pointer group"
                    onClick={() => handleView(order)}
                  >
                    {/* Order ID */}
                    <div className="font-bold text-sm text-[#1e00a9] group-hover:underline">{order.orderNumber}</div>

                    {/* Customer */}
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#e2dfff] flex items-center justify-center text-[11px] font-black text-[#1e00a9] flex-shrink-0">
                        {getInitials(order.customerName)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#191c1e]">{order.customerName}</p>
                        {order.customerPhone && <p className="text-[10px] text-[#464555]">{order.customerPhone}</p>}
                      </div>
                    </div>

                    {/* Date */}
                    <div className="text-sm text-[#464555]">{formatDate(order.createdAt)}</div>

                    {/* Amount */}
                    <div className="text-sm font-bold text-[#191c1e]">{formatCurrency(order.totalPrice)}</div>

                    {/* Status */}
                    <div><OrderStatusBadge status={order.status} /></div>

                    {/* Actions */}
                    <div className="flex justify-end" onClick={e => e.stopPropagation()}>
                      <OrderActionMenu
                        order={order}
                        onUpdateStatus={handleUpdateStatus}
                        onView={handleView}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination Footer */}
            {!loading && filtered.length > 0 && (
              <div className="px-8 py-5 bg-[#f8f9fc] border-t border-gray-50 flex justify-between items-center">
                <p className="text-xs text-[#464555] font-medium">
                  Hiển thị {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} / {filtered.length} đơn hàng
                </p>
                <div className="flex items-center gap-1.5">
                  <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-[#e7e8eb] shadow-sm disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                  </button>
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const p = i + 1;
                    const show = p === 1 || p === totalPages || Math.abs(p - page) <= 1;
                    if (!show) {
                      if (p === 2 || p === totalPages - 1) return <span key={p} className="text-[#464555]/40 text-xs px-1">…</span>;
                      return null;
                    }
                    return (
                      <button key={p} onClick={() => setPage(p)}
                        className={`w-8 h-8 rounded-full text-sm font-bold transition-all ${p === page ? 'bg-[#1e00a9] text-white shadow-md shadow-[#1e00a9]/30' : 'bg-white text-[#464555] hover:bg-[#e7e8eb] shadow-sm'}`}>
                        {p}
                      </button>
                    );
                  })}
                  <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-[#e7e8eb] shadow-sm disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Create Order Modal */}
      <CreateOrderModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={fetchOrders}
        products={products}
      />
    </div>
  );
}
