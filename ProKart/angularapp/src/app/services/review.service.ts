import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/apiconfig';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = `${apiUrl}/api/reviews`;

  constructor(private http: HttpClient) {}

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
  }

  addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(this.apiUrl, review, { headers: this.getHeaders() });
  }

  getReviewById(reviewId: number): Observable<Review> {
    return this.http.get<Review>(`${this.apiUrl}/${reviewId}`, { headers: this.getHeaders() });
  }

  getAllReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getReviewsByUserId(userId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/user/${userId}`, { headers: this.getHeaders() });
  }

  getReviewsByProductId(productId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/product/${productId}`, { headers: this.getHeaders() });
  }

  updateReview(reviewId: number, review: Review): Observable<Review> {
    return this.http.put<Review>(`${this.apiUrl}/${reviewId}`, review, { headers: this.getHeaders() });
  }

  deleteReview(reviewId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${reviewId}`, { headers: this.getHeaders() });
  }
}
