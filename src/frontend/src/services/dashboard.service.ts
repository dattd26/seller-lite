import apiClient from '@/lib/api-client';

export interface DashboardSummary {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  lowStockItems: number;
  revenueChange: number;
  ordersChange: number;
}

export const dashboardService = {
  /**
   * Lấy dữ liệu tổng hợp cho dashboard
   */
  getSummary: async (): Promise<DashboardSummary> => {
    return apiClient.get('/dashboard/summary');
  }
};
