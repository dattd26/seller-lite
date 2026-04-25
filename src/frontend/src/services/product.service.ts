import apiClient from '@/lib/api-client';
import { Product, CreateProductRequest } from '@/types/product';

export const productService = {
  /**
   * Lấy danh sách sản phẩm
   */
  getProducts: async (): Promise<Product[]> => {
    return apiClient.get('/products');
  },

  /**
   * Lấy danh sách sản phẩm tồn kho thấp
   */
  getLowStockProducts: async (): Promise<Product[]> => {
    return apiClient.get('/products/low-stock');
  },

  /**
   * Tạo sản phẩm mới
   */
  createProduct: async (data: CreateProductRequest): Promise<Product> => {
    return apiClient.post('/products', data);
  },

  /**
   * Cập nhật thông tin sản phẩm
   */
  updateProduct: async (id: string, data: Partial<CreateProductRequest>): Promise<Product> => {
    return apiClient.put(`/products/${id}`, data);
  },

  /**
   * Xóa sản phẩm
   */
  deleteProduct: async (id: string): Promise<void> => {
    return apiClient.delete(`/products/${id}`);
  }
};
