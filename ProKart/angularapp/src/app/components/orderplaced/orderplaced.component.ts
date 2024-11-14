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
  filteredOrders: Order[] = [];
  paginatedOrders: Order[] = [];
  stages = ['Pending', 'Accepted', 'Dispatched', 'OutForDelivery', 'Delivered'];
  searchQuery = '';
  showProductModal = false;
  showProfileModal = false;
  selectedOrder: Order | null = null;
  selectedUser: any | null = null;
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 1;

  constructor(private orderService: OrderService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(): void {
    this.orderService.getAllOrders().subscribe(
      (data: Order[]) => {
        this.orders = data;
        this.filteredOrders = this.orders;
        this.totalPages = Math.ceil(this.filteredOrders.length / this.itemsPerPage);
        this.paginateOrders();
      },
      (error) => {
        console.error('Error fetching orders:', error);
        this.snackBar.open('Failed to load orders. Please try again later.', 'Close', { duration: 3000 });
      }
    );
  }

  applyFilters(): void {
    this.filteredOrders = this.orders.filter(order =>
      order.orderId.toString().includes(this.searchQuery) || 
      order.user.username.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.totalPages = Math.ceil(this.filteredOrders.length / this.itemsPerPage);
    this.currentPage = 1;
    this.paginateOrders();
  }

  sortOrders(order: string): void {
    this.filteredOrders.sort((a, b) => {
      const dateA = new Date(a.orderDate).getTime();
      const dateB = new Date(b.orderDate).getTime();
      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
    this.paginateOrders();
  }

  paginateOrders(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedOrders = this.filteredOrders.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateOrders();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateOrders();
    }
  }

  updateOrderStatus(order: Order): void {
    this.orderService.updateOrder(order.orderId, order).subscribe(
      () => this.snackBar.open('Order status updated successfully!', 'Close', { duration: 3000 }),
      (error) => {
        console.error('Error updating order status:', error);
        this.snackBar.open('Failed to update order status. Please try again later.', 'Close', { duration: 3000 });
      }
    );
  }

  openProductModal(order: Order): void {
    this.selectedOrder = order;
    this.showProductModal = true;
  }

  closeProductModal(): void {
    this.showProductModal = false;
    this.selectedOrder = null;
  }

  openProfileModal(user: any): void {
    this.selectedUser = user;
    this.showProfileModal = true;
  }

  closeProfileModal(): void {
    this.showProfileModal = false;
    this.selectedUser = null;
  }
}