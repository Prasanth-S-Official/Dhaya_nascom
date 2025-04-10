import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WifiSchemeRequest } from '../models/wifi-scheme-request.model';
import { apiUrl } from 'src/apiconfig';

@Injectable({
  providedIn: 'root',
})
export class WifiSchemeRequestService {
  private apiUrl = apiUrl;

  constructor(private http: HttpClient) {}

  getAllWiFiSchemeRequests(): Observable<WifiSchemeRequest[]> {
    const headers = this.getHeaders();
    return this.http.get<WifiSchemeRequest[]>(`${this.apiUrl}/api/wifiSchemeRequest`, { headers });
  }

  getWiFiSchemeRequestsByUserId(userId: number): Observable<WifiSchemeRequest[]> {
    const headers = this.getHeaders();
    return this.http.get<WifiSchemeRequest[]>(`${this.apiUrl}/api/wifiSchemeRequest/user/${userId}`, { headers });
  }

  addWiFiSchemeRequest(wifiSchemeRequest: WifiSchemeRequest): Observable<WifiSchemeRequest> {
    const headers = this.getHeaders();
    return this.http.post<WifiSchemeRequest>(`${this.apiUrl}/api/wifiSchemeRequest`, wifiSchemeRequest, { headers });
  }

  updateWiFiSchemeRequest(wifiSchemeRequestId: number, request: WifiSchemeRequest): Observable<WifiSchemeRequest> {
    const headers = this.getHeaders();
    return this.http.put<WifiSchemeRequest>(`${this.apiUrl}/api/wifiSchemeRequest/${wifiSchemeRequestId}`, request, { headers });
  }

  deleteWiFiSchemeRequest(wifiSchemeRequestId: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/api/wifiSchemeRequest/${wifiSchemeRequestId}`, { headers });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
  }
}
