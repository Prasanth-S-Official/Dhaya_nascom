import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/apiconfig';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${apiUrl}/api/products`;

  constructor(private http: HttpClient) { }

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${productId}`, { headers: this.getHeaders() });
  }

  addProduct(product: Product): Observable<Product> {
    console.log("Product to be added",product);
    return this.http.post<Product>(this.apiUrl, product, { headers: this.getHeaders() });
  }

  updateProduct(productId: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${productId}`, product, { headers: this.getHeaders() });
  }

  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${productId}`, { headers: this.getHeaders() });
  }
}
