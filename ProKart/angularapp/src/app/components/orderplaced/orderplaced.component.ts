import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orderplaced',
  templateUrl: './orderplaced.component.html',
  styleUrls: ['./orderplaced.component.css']
})
export class OrderplacedComponent implements OnInit {
  orders: Order[] = [];
  stages = ['Pending', 'Accepted', 'Dispatched', 'OutForDelivery', 'Delivered'];

  constructor(private orderService: OrderService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(): void {
    this.orderService.getAllOrders().subscribe(
      (data: Order[]) => {
        console.log("getAllorders",data);
        this.orders = data;
      },
      (error) => {
        console.error('Error fetching orders:', error);
        this.snackBar.open('Failed to load orders. Please try again later.', 'Close', { duration: 3000 });
      }
    );
  }

  updateOrderStatus(order: Order): void {
    this.orderService.updateOrder(order.orderId, order).subscribe(
      (updatedOrder) => {
        this.snackBar.open('Order status updated successfully!', 'Close', { duration: 3000 });
      },
      (error) => {
        console.error('Error updating order status:', error);
        this.snackBar.open('Failed to update order status. Please try again later.', 'Close', { duration: 3000 });
      }
    );
  }
}