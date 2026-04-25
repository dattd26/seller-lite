export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  salePrice: number;
  costPrice?: number;
  stock: number;
  lowStockThreshold?: number;
}

export interface CreateProductRequest {
  name: string;
  sku: string;
  category: string;
  salePrice: number;
  costPrice: number;
  stock: number;
  lowStockThreshold: number;
}
