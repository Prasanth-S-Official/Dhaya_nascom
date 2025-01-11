import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bid } from '../models/bid.model';
import { apiUrl } from 'src/apiconfig';

@Injectable({
  providedIn: 'root',
})
export class BidService {
  private apiUrl = `${apiUrl}/api/bid`;

  constructor(private http: HttpClient) {}

  getAllBids(): Observable<Bid[]> {
    const headers = this.getHeaders();
    return this.http.get<Bid[]>(this.apiUrl, { headers });
  }

  getBidById(bidId: number): Observable<Bid> {
    const headers = this.getHeaders();
    return this.http.get<Bid>(`${this.apiUrl}/${bidId}`, { headers });
  }

  getBidsByProjectId(projectId: number): Observable<Bid[]> {
    const headers = this.getHeaders();
    return this.http.get<Bid[]>(`${this.apiUrl}/project/${projectId}`, { headers });
  }

  getBidsByUserId(userId: number): Observable<Bid[]> {
    const headers = this.getHeaders();
    return this.http.get<Bid[]>(`${this.apiUrl}/user/${userId}`, { headers });
  }

  addBid(bid: Bid): Observable<Bid> {
    const headers = this.getHeaders();
    return this.http.post<Bid>(this.apiUrl, bid, { headers });
  }

  updateBid(bidId: number, bid: Bid): Observable<Bid> {
    const headers = this.getHeaders();
    return this.http.put<Bid>(`${this.apiUrl}/${bidId}`, bid, { headers });
  }

  deleteBid(bidId: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${bidId}`, { headers });
  }


  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
  }
}
