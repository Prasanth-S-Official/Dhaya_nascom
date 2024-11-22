import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { apiUrl } from 'src/apiconfig';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = apiUrl;

  constructor(private http: HttpClient) {}

  // Book Endpoints
  getAllBooks(): Observable<Book[]> {
    const headers = this.getHeaders();
    return this.http.get<Book[]>(`${this.apiUrl}/api/books`, { headers });
  }

  getBookById(bookId: number): Observable<Book> {
    const headers = this.getHeaders();
    return this.http.get<Book>(`${this.apiUrl}/api/books/${bookId}`, { headers });
  }

  addBook(book: Book): Observable<Book> {
    console.log("AddBook",book);
    const headers = this.getHeaders();
    return this.http.post<Book>(`${this.apiUrl}/api/books`, book, { headers });
  }

  updateBook(bookId: number, book: Book): Observable<Book> {
    const headers = this.getHeaders();
    return this.http.put<Book>(`${this.apiUrl}/api/books/${bookId}`, book, { headers });
  }

  deleteBook(bookId: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/api/books/${bookId}`, { headers });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
  }
}
