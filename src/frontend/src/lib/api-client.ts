import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ApiResponse } from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5139/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor 
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Tự động bóc tách ApiResponse từ Backend
apiClient.interceptors.response.use(
  (response) => {
    const apiResponse = response.data as ApiResponse<any>;

    // Nếu Backend trả về success: true, trả về data bên trong
    if (apiResponse.success) {
      return apiResponse.data;
    }

    // Nếu success: false, ném lỗi với message từ backend
    return Promise.reject({
      message: apiResponse.message || 'Đã có lỗi xảy ra',
      errors: apiResponse.errors,
      status: response.status,
    });
  },
  (error: AxiosError) => {
    const data = error.response?.data as ApiResponse<any>;
    
    const errorObj = {
      message: data?.message || error.message || 'Lỗi kết nối máy chủ',
      errors: data?.errors || null,
      status: error.response?.status,
    };

    console.error('[API Error]:', errorObj);

    return Promise.reject(errorObj);
  }
);

export default apiClient;
