import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Driver } from '../models/driver.model';
import { apiUrl } from 'src/apiconfig';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  private apiUrl = `${apiUrl}/api/driver`;

  constructor(private http: HttpClient) {}

  getAllDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getDriverById(driverId: number): Observable<Driver> {
    return this.http.get<Driver>(`${this.apiUrl}/${driverId}`, { headers: this.getHeaders() });
  }

  addDriver(driver: Driver): Observable<Driver> {
    return this.http.post<Driver>(this.apiUrl, driver, { headers: this.getHeaders() });
  }

  updateDriver(driverId: number, driver: Driver): Observable<Driver> {
    return this.http.put<Driver>(`${this.apiUrl}/${driverId}`, driver, { headers: this.getHeaders() });
  }

  deleteDriver(driverId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${driverId}`, { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
  }
}
