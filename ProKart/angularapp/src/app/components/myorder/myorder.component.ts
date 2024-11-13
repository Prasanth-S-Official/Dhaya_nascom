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
  stages = ['Pending', 'Accepted', 'Dispatched', 'OutForDelivery', 'Delivered'];
  selectedOrderForTracking: Order | null = null;
  selectedOrderForItems: Order | null = null;

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

  getCurrentStageIndex(status: string): number {
    return this.stages.indexOf(status);
  }

  showTrackOrder(order: Order): void {
    this.selectedOrderForTracking = order;
  }

  closeTrackOrder(): void {
    this.selectedOrderForTracking = null;
  }

  showOrderItems(order: Order): void {
    this.selectedOrderForItems = order;
  }

  closeOrderItems(): void {
    this.selectedOrderForItems = null;
  }
}
