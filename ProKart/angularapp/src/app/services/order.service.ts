import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/apiconfig';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${apiUrl}/api/orders`;

  constructor(private http: HttpClient) {}

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
  }

  placeOrder(order: Order): Observable<any> {
    console.log("orderdatapassed",order);
    return this.http.post<any>(this.apiUrl, order, { headers: this.getHeaders() });
  }

  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${orderId}`, { headers: this.getHeaders() });
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  updateOrder(orderId: number, order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${orderId}`, order, { headers: this.getHeaders() });
  }

  deleteOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${orderId}`, { headers: this.getHeaders() });
  }
}
