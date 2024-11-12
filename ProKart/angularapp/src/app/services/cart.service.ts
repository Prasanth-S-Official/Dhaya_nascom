import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { OrderItem } from 'src/app/models/order-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: OrderItem[] = [];

  addToCart(product: Product, quantity: number): void {
    const existingItem = this.cartItems.find(item => item.product.productId === product.productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity, price: product.price });
    }
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.product.productId !== productId);
  }

  getCartItems(): OrderItem[] {
    return this.cartItems;
  }

  clearCart(): void {
    this.cartItems = [];
  }
}
