import { OrderStatus } from '@/components/orders/OrderStatusBadge';

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus | string;
  totalPrice: number;
  shippingFee: number;
  customerName: string;
  customerPhone?: string;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderDetail extends Order {
  items: OrderItem[];
  shippingAddress?: string;
  note?: string;
}

export interface CreateOrderRequest {
  customerName: string;
  customerPhone: string;
  items: {
    productId: string;
    quantity: number;
  }[];
}
