import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookRentalRequest } from '../models/book-rental-request.model';
import { apiUrl } from 'src/apiconfig';

@Injectable({
  providedIn: 'root'
})
export class BookrentalrequestService {

  private baseUrl = `${apiUrl}/api/bookrentalrequest`; // Base API URL for book rental requests

  constructor(private http: HttpClient) {}

  // Fetch all book rental requests
  getAllBookRentalRequests(): Observable<BookRentalRequest[]> {
    const headers = this.getHeaders();
    return this.http.get<BookRentalRequest[]>(`${this.baseUrl}`, { headers });
  }

  // Fetch book rental requests by user ID
  getBookRentalRequestsByUserId(userId: number): Observable<BookRentalRequest[]> {
    const headers = this.getHeaders();
    return this.http.get<BookRentalRequest[]>(`${this.baseUrl}/user/${userId}`, { headers });
  }

  // Fetch a specific book rental request by ID
  getBookRentalRequestById(rentalId: number): Observable<BookRentalRequest> {
    const headers = this.getHeaders();
    return this.http.get<BookRentalRequest>(`${this.baseUrl}/${rentalId}`, { headers });
  }

  // Create a new book rental request
  addBookRentalRequest(request: BookRentalRequest): Observable<BookRentalRequest> {
    const headers = this.getHeaders();
    return this.http.post<BookRentalRequest>(`${this.baseUrl}`, request, { headers });
  }

  // Update an existing book rental request
  updateBookRentalRequest(rentalId: number, request: BookRentalRequest): Observable<BookRentalRequest> {
    const headers = this.getHeaders();
    return this.http.put<BookRentalRequest>(`${this.baseUrl}/${rentalId}`, request, { headers });
  }

  // Delete a book rental request by ID
  deleteBookRentalRequest(rentalId: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.baseUrl}/${rentalId}`, { headers });
  }

  // Helper method to get headers with Authorization token
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });
  }
}