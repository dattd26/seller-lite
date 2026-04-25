import apiClient from '@/lib/api-client';
import { Order, OrderDetail, CreateOrderRequest } from '@/types/order';

export const orderService = {
  /**
   * Lấy danh sách đơn hàng
   */
  getOrders: async (): Promise<Order[]> => {
    return apiClient.get('/orders');
  },

  /**
   * Lấy chi tiết đơn hàng
   */
  getOrderById: async (id: string): Promise<OrderDetail> => {
    return apiClient.get(`/orders/${id}`);
  },

  /**
   * Tạo đơn hàng mới
   */
  createOrder: async (data: CreateOrderRequest): Promise<Order> => {
    return apiClient.post('/orders', data);
  },

  /**
   * Cập nhật trạng thái đơn hàng
   */
  updateStatus: async (id: string, status: number): Promise<void> => {
    return apiClient.put(`/orders/${id}/status`, { status });
  }
};
