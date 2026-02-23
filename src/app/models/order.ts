import {CartModel} from './cart-model';

export type Order = {
  id: string;
  userId: string;
  total: number;
  items: CartModel[];
  paymentStatus: 'success' | 'failure';
}
