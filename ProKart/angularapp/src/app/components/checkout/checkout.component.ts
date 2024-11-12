import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { OrderItem } from 'src/app/models/order-item.model';

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

  constructor(private cartService: CartService, private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  placeOrder(): void {
    const order = {
      orderDate: new Date().toISOString().split('T')[0],
      orderStatus: 'Pending',
      shippingAddress: this.shippingAddress,
      billingAddress: this.billingAddress,
      totalAmount: this.totalAmount,
      user: { userId: parseInt(localStorage.getItem('userId') || '0') },
      orderItems: this.cartItems.map(item => ({
        quantity: item.quantity,
        product: { productId: item.product.productId }
      }))
    };

    this.orderService.placeOrder(order).subscribe(
      (response) => {
        alert('Order placed successfully!');
        this.cartService.clearCart();
        this.router.navigate(['/user/orders']);
      },
      (error) => {
        alert('Error placing order. Please try again.');
      }
    );
  }
}
