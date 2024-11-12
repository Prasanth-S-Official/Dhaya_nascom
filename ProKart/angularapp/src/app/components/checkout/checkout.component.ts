import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { OrderItem } from 'src/app/models/order-item.model';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: OrderItem[] = [];
  totalAmount: number = 0;
  shippingAddress: string = '';
  billingAddress: string = '';
  showSuccessModal: boolean = false; // Flag for success modal

  constructor(private cartService: CartService, private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  placeOrder(): void {
    const orderPayload: Partial<Order> = {
      orderDate: new Date().toISOString().split('T')[0],
      orderStatus: 'Pending',
      shippingAddress: this.shippingAddress,
      billingAddress: this.billingAddress,
      totalAmount: this.totalAmount,
      user: { userId: parseInt(localStorage.getItem('userId') || '0') } as any,
      orderItems: this.cartItems.map(item => ({
        quantity: item.quantity,
        price: item.price,
        product: { productId: item.product.productId } as any
      }))
    };
  
    this.orderService.placeOrder(orderPayload as Order).subscribe(
      (response) => {
        this.cartService.clearCart();
        this.showSuccessModal = true; // Show the success modal
      },
      (error) => {
        alert('Error placing order. Please try again.');
      }
    );
  }

  continueShopping(): void {
    this.showSuccessModal = false;
    this.router.navigate(['/user/products']);
  }
}
