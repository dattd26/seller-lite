"use client";

import React, { useState, useMemo } from 'react';
import InventoryStatusBadge, { getStockStatus } from './InventoryStatusBadge';

export interface Product {
  id: string;
  name: string;
  sku: string;
  costPrice?: number;
  salePrice: number;
  stock: number;
  category?: string;
  lowStockThreshold?: number;
}

type SortField = 'name' | 'salePrice' | 'stock' | 'category';
type SortDir = 'asc' | 'desc';
type StatusFilter = 'all' | 'in-stock' | 'low-stock' | 'out-of-stock';

interface Props {
  products: Product[];
  loading: boolean;
  onAddProduct: () => void;
}

const PAGE_SIZE = 10;

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(amount);

const ProductTable: React.FC<Props> = ({ products, loading, onAddProduct }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [page, setPage] = useState(1);

  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category ?? 'Chưa phân loại'));
    return ['all', ...Array.from(cats)];
  }, [products]);

  const filtered = useMemo(() => {
    return products
      .filter(p => {
        const q = search.toLowerCase();
        const matchSearch = !q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || (p.category ?? '').toLowerCase().includes(q);
        const status = getStockStatus(p.stock, p.lowStockThreshold ?? 10);
        const matchStatus = statusFilter === 'all' || status === statusFilter;
        const matchCat = categoryFilter === 'all' || (p.category ?? 'Chưa phân loại') === categoryFilter;
        return matchSearch && matchStatus && matchCat;
      })
      .sort((a, b) => {
        const dir = sortDir === 'asc' ? 1 : -1;
        if (sortField === 'name') return a.name.localeCompare(b.name) * dir;
        if (sortField === 'salePrice') return (a.salePrice - b.salePrice) * dir;
        if (sortField === 'stock') return (a.stock - b.stock) * dir;
        if (sortField === 'category') return (a.category ?? '').localeCompare(b.category ?? '') * dir;
        return 0;
      });
  }, [products, search, statusFilter, categoryFilter, sortField, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSort = (field: SortField) => {
    if (field === sortField) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
    setPage(1);
  };

  const handleFilter = (field: 'status' | 'category', value: string) => {
    if (field === 'status') setStatusFilter(value as StatusFilter);
    else setCategoryFilter(value);
    setPage(1);
  };

  const SortIcon = ({ field }: { field: SortField }) => (
    <span className="material-symbols-outlined text-xs ml-1 opacity-40">
      {sortField === field ? (sortDir === 'asc' ? 'arrow_upward' : 'arrow_downward') : 'unfold_more'}
    </span>
  );

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_24px_-4px_rgba(25,28,30,0.06)] overflow-hidden">
      {/* Table Header Controls */}
      <div className="p-6 border-b border-gray-50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-extrabold text-[#191c1e] font-headline">Danh mục sản phẩm</h3>
            <p className="text-xs text-[#464555] mt-0.5">
              {loading ? 'Đang tải...' : `${filtered.length} sản phẩm`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              id="btn-export-csv"
              title="Xuất CSV"
              className="p-2.5 rounded-full hover:bg-gray-100 transition-colors text-[#464555]"
              onClick={() => alert('Chức năng xuất CSV đang được phát triển')}
            >
              <span className="material-symbols-outlined">download</span>
            </button>
            <button
              id="btn-add-product"
              className="bg-gradient-to-br from-[#1e00a9] to-[#3525cd] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-[#1e00a9]/20"
              onClick={onAddProduct}
            >
              <span className="material-symbols-outlined text-sm">add_circle</span>
              Thêm sản phẩm
            </button>
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap gap-3 mt-5">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#464555] text-lg">search</span>
            <input
              id="inventory-search"
              type="text"
              placeholder="Tìm tên, SKU, ngành hàng..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-4 py-2.5 bg-[#f2f4f6] rounded-full text-sm text-[#191c1e] placeholder:text-[#464555]/60 focus:outline-none focus:ring-2 focus:ring-[#1e00a9]/20"
            />
          </div>

          {/* Status Filter */}
          <select
            id="filter-status"
            value={statusFilter}
            onChange={e => handleFilter('status', e.target.value)}
            className="px-4 py-2.5 bg-[#f2f4f6] rounded-full text-sm text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#1e00a9]/20 cursor-pointer"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="in-stock">Còn hàng</option>
            <option value="low-stock">Sắp hết</option>
            <option value="out-of-stock">Hết hàng</option>
          </select>

          {/* Category Filter */}
          <select
            id="filter-category"
            value={categoryFilter}
            onChange={e => handleFilter('category', e.target.value)}
            className="px-4 py-2.5 bg-[#f2f4f6] rounded-full text-sm text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#1e00a9]/20 cursor-pointer"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat === 'all' ? 'Tất cả ngành hàng' : cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Column Headers */}
      <div className="grid grid-cols-12 gap-4 px-8 py-4 bg-[#f8f9fc] text-[#464555] text-[10px] font-black uppercase tracking-widest">
        <div className="col-span-4 cursor-pointer select-none flex items-center" onClick={() => handleSort('name')}>
          Sản phẩm <SortIcon field="name" />
        </div>
        <div className="col-span-2">SKU</div>
        <div className="col-span-2 cursor-pointer select-none flex items-center" onClick={() => handleSort('category')}>
          Ngành hàng <SortIcon field="category" />
        </div>
        <div className="col-span-2 cursor-pointer select-none flex items-center" onClick={() => handleSort('stock')}>
          Tồn kho <SortIcon field="stock" />
        </div>
        <div className="col-span-2 text-right">Trạng thái</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-50">
        {loading ? (
          // Skeleton Loader
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="grid grid-cols-12 gap-4 px-8 py-5 items-center animate-pulse">
              <div className="col-span-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-100"></div>
                <div className="space-y-2">
                  <div className="h-3 w-36 bg-gray-100 rounded"></div>
                  <div className="h-2 w-24 bg-gray-100 rounded"></div>
                </div>
              </div>
              <div className="col-span-2"><div className="h-3 w-20 bg-gray-100 rounded"></div></div>
              <div className="col-span-2"><div className="h-3 w-20 bg-gray-100 rounded"></div></div>
              <div className="col-span-2"><div className="h-3 w-12 bg-gray-100 rounded"></div></div>
              <div className="col-span-2 flex justify-end"><div className="h-6 w-20 bg-gray-100 rounded-full"></div></div>
            </div>
          ))
        ) : paginated.length === 0 ? (
          <div className="px-8 py-20 text-center">
            <span className="material-symbols-outlined text-5xl text-[#464555]/30">inventory_2</span>
            <p className="mt-4 text-[#464555] font-medium">Không tìm thấy sản phẩm nào.</p>
            <p className="text-sm text-[#464555]/60 mt-1">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.</p>
          </div>
        ) : (
          paginated.map((product) => {
            const status = getStockStatus(product.stock, product.lowStockThreshold ?? 10);
            const isLow = status === 'low-stock';
            const isOut = status === 'out-of-stock';
            return (
              <div
                key={product.id}
                className={`grid grid-cols-12 gap-4 px-8 py-5 items-center transition-all duration-200 cursor-pointer group
                  ${isOut ? 'bg-red-50/30 hover:bg-red-50/60' : isLow ? 'hover:bg-orange-50/30' : 'hover:bg-[#f8f9fc]'}
                `}
                onClick={() => alert(`Xem chi tiết: ${product.name}`)}
              >
                {/* Product Name */}
                <div className="col-span-4 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-[#f2f4f6] flex-shrink-0 overflow-hidden ${isOut ? 'grayscale opacity-60' : ''}`}>
                    <span className="material-symbols-outlined text-[#464555]/40 text-2xl">inventory_2</span>
                  </div>
                  <div>
                    <p className={`font-bold text-sm ${isOut ? 'text-[#464555]' : 'text-[#191c1e]'} group-hover:text-[#1e00a9] transition-colors`}>
                      {product.name}
                    </p>
                    <p className="text-xs text-[#464555]/60">{product.category ?? 'Chưa phân loại'}</p>
                  </div>
                </div>

                {/* SKU */}
                <div className="col-span-2">
                  <code className="text-xs font-mono bg-[#f2f4f6] px-2 py-1 rounded text-[#464555]">
                    {product.sku}
                  </code>
                </div>

                {/* Category */}
                <div className="col-span-2">
                  <span className="text-sm text-[#464555]">{product.category ?? '—'}</span>
                </div>

                {/* Stock Level */}
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold text-sm ${isOut ? 'text-[#464555]' : isLow ? 'text-red-600' : 'text-[#191c1e]'}`}>
                      {product.stock}
                    </span>
                    {isLow && !isOut && (
                      <span className="material-symbols-outlined text-red-500 text-sm">warning</span>
                    )}
                  </div>
                </div>

                {/* Status Badge */}
                <div className="col-span-2 flex justify-end">
                  <InventoryStatusBadge status={status} />
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination Footer */}
      {!loading && filtered.length > 0 && (
        <div className="px-8 py-5 bg-[#f8f9fc] border-t border-gray-50 flex justify-between items-center">
          <p className="text-xs text-[#464555] font-medium">
            Hiển thị {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} / {filtered.length} sản phẩm
          </p>
          <div className="flex items-center gap-1.5">
            <button
              id="btn-prev-page"
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-[#e7e8eb] transition-colors disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
            >
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
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-full text-sm font-bold transition-all ${
                    p === page
                      ? 'bg-[#1e00a9] text-white shadow-md shadow-[#1e00a9]/30'
                      : 'bg-white text-[#464555] hover:bg-[#e7e8eb] shadow-sm'
                  }`}
                >
                  {p}
                </button>
              );
            })}

            <button
              id="btn-next-page"
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-[#e7e8eb] transition-colors disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
            >
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
