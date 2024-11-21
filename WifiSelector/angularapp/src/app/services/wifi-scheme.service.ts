import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WiFiScheme } from '../models/wifi-scheme.model';
import { apiUrl } from 'src/apiconfig';

@Injectable({
  providedIn: 'root',
})
export class WifiSchemeService {
  private apiUrl = apiUrl;

  constructor(private http: HttpClient) {}

  getAllWiFiSchemes(): Observable<WiFiScheme[]> {
    const headers = this.getHeaders();
    return this.http.get<WiFiScheme[]>(`${this.apiUrl}/api/wifiScheme`, { headers });
  }

  getWiFiSchemeById(wifiSchemeId: number): Observable<WiFiScheme> {
    const headers = this.getHeaders();
    return this.http.get<WiFiScheme>(`${this.apiUrl}/api/wifiScheme/${wifiSchemeId}`, { headers });
  }

  addWiFiScheme(wifiScheme: WiFiScheme): Observable<WiFiScheme> {
    const headers = this.getHeaders();
    return this.http.post<WiFiScheme>(`${this.apiUrl}/api/wifiScheme`, wifiScheme, { headers });
  }

  updateWiFiScheme(wifiSchemeId: number, wifiScheme: WiFiScheme): Observable<WiFiScheme> {
    const headers = this.getHeaders();
    return this.http.put<WiFiScheme>(`${this.apiUrl}/api/wifiScheme/${wifiSchemeId}`, wifiScheme, { headers });
  }

  deleteWiFiScheme(wifiSchemeId: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/api/wifiScheme/${wifiSchemeId}`, { headers });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
  }
}
