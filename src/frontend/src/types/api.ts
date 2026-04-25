/**
 * Cấu trúc Response chuẩn từ Backend
 */
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any;
}

/**
 * Kiểu dữ liệu cho các lỗi validation
 */
export interface ValidationErrors {
  [key: string]: string[];
}
