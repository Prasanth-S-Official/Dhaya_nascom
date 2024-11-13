import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit {

  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    const userId = Number(localStorage.getItem('userId'));
    if (userId) {
      this.orderService.getOrdersByUserId(userId).subscribe(
        (data) => {
          console.log("Myorder", data);
          this.orders = data;
        },
        (error) => {
          console.error('Error fetching orders:', error);
        }
      );
    } else {
      console.error('User ID not found in localStorage');
    }
  }

  viewProducts(orderItems: any[]): void {
    console.log('Viewing products:', orderItems);
    // Implement logic to open product details or navigate to product page.
  }

  trackOrder(orderId: number): void {
    console.log('Tracking order:', orderId);
    // Implement logic to track order (e.g., navigate to tracking page or open a modal).
  }

  statusClass(status: string): string {
    return status === 'Shipped' ? 'status-shipped' : 'status-pending';
  }
}
