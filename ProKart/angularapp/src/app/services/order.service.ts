import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderUrl = '/api/orders';

  constructor(private http: HttpClient) {}

  placeOrder(order: Order): Observable<any> {
    return this.http.post<any>(this.orderUrl, order);
  }
}
