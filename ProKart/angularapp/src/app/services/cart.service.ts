import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { OrderItem } from 'src/app/models/order-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: OrderItem[] = [];
  private cartItemsSubject = new BehaviorSubject<OrderItem[]>(this.cartItems);

  // Observable for components to subscribe to
  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(product: Product, quantity: number): void {
    const existingItem = this.cartItems.find(item => item.product.productId === product.productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity, price: product.price });
    }
    this.cartItemsSubject.next(this.cartItems); // Notify subscribers
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.product.productId !== productId);
    this.cartItemsSubject.next(this.cartItems); // Notify subscribers
  }

  getCartItems(): OrderItem[] {
    return this.cartItems;
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems); // Notify subscribers
  }
}
