import { OrderItem } from './order-item.model';
import { User } from './user.model';

export interface Order {
  orderDate: string;
  orderStatus: string;
  shippingAddress: string;
  billingAddress: string;
  totalAmount: number;
  user: User;
  orderItems: OrderItem[];
}
