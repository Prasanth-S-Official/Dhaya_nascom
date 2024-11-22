import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WiFiSchemeRequest } from '../models/wifi-scheme-request.model';
import { apiUrl } from 'src/apiconfig';

@Injectable({
  providedIn: 'root',
})
export class WiFiSchemeRequestService {
  private apiUrl = apiUrl;

  constructor(private http: HttpClient) {}

  getAllWiFiSchemeRequests(): Observable<WiFiSchemeRequest[]> {
    const headers = this.getHeaders();
    return this.http.get<WiFiSchemeRequest[]>(`${this.apiUrl}/api/wifiSchemeRequest`, { headers });
  }

  getWiFiSchemeRequestsByUserId(userId: string): Observable<WiFiSchemeRequest[]> {
    const headers = this.getHeaders();
    return this.http.get<WiFiSchemeRequest[]>(`${this.apiUrl}/api/wifiSchemeRequest/user/${userId}`, { headers });
  }

  addWiFiSchemeRequest(request: WiFiSchemeRequest): Observable<WiFiSchemeRequest> {
    const headers = this.getHeaders();
    return this.http.post<WiFiSchemeRequest>(`${this.apiUrl}/api/wifiSchemeRequest`, request, { headers });
  }

  updateWiFiSchemeRequest(requestId: string, request: WiFiSchemeRequest): Observable<WiFiSchemeRequest> {
    const headers = this.getHeaders();
    return this.http.put<WiFiSchemeRequest>(`${this.apiUrl}/api/wifiSchemeRequest/${requestId}`, request, { headers });
  }

  deleteWiFiSchemeRequest(requestId: string): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/api/wifiSchemeRequest/${requestId}`, { headers });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
  }
}
