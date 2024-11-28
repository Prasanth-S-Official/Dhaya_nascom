import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WifiScheme } from '../models/wifi-scheme.model';
import { apiUrl } from 'src/apiconfig';

@Injectable({
  providedIn: 'root',
})
export class WifiSchemeService {
  private apiUrl = apiUrl;

  constructor(private http: HttpClient) {}

  getAllWiFiSchemes(): Observable<WifiScheme[]> {
    const headers = this.getHeaders();
    return this.http.get<WifiScheme[]>(`${this.apiUrl}/api/wifiScheme`, { headers });
  }

  getWiFiSchemeById(wifiSchemeId: number): Observable<WifiScheme> {
    const headers = this.getHeaders();
    return this.http.get<WifiScheme>(`${this.apiUrl}/api/wifiScheme/${wifiSchemeId}`, { headers });
  }

  addWiFiScheme(wifiScheme: WifiScheme): Observable<WifiScheme> {
    const headers = this.getHeaders();
    return this.http.post<WifiScheme>(`${this.apiUrl}/api/wifiScheme`, wifiScheme, { headers });
  }

  updateWiFiScheme(wifiSchemeId: number, wifiScheme: WifiScheme): Observable<WifiScheme> {
    const headers = this.getHeaders();
    return this.http.put<WifiScheme>(`${this.apiUrl}/api/wifiScheme/${wifiSchemeId}`, wifiScheme, { headers });
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
