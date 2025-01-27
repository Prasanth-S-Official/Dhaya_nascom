import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DriverRequest } from '../models/driver-request.model';
import { apiUrl } from 'src/apiconfig';

@Injectable({
  providedIn: 'root',
})
export class DriverRequestService {
  private apiUrl = `${apiUrl}/api/driverRequest`;

  constructor(private http: HttpClient) {}

  getAllDriverRequests(): Observable<DriverRequest[]> {
    return this.http.get<DriverRequest[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getDriverRequestById(driverRequestId: number): Observable<DriverRequest> {
    return this.http.get<DriverRequest>(`${this.apiUrl}/${driverRequestId}`, { headers: this.getHeaders() });
  }

  getDriverRequestsByUserId(userId: number): Observable<DriverRequest[]> {
    return this.http.get<DriverRequest[]>(`${this.apiUrl}/user/${userId}`, { headers: this.getHeaders() });
  }

  getDriverRequestsByDriverId(driverId: number): Observable<DriverRequest[]> {
    return this.http.get<DriverRequest[]>(`${this.apiUrl}/driver/${driverId}`, { headers: this.getHeaders() });
  }

  addDriverRequest(driverRequest: DriverRequest): Observable<DriverRequest> {
    return this.http.post<DriverRequest>(this.apiUrl, driverRequest, { headers: this.getHeaders() });
  }

  updateDriverRequest(driverRequestId: number, driverRequest: DriverRequest): Observable<DriverRequest> {
    return this.http.put<DriverRequest>(`${this.apiUrl}/${driverRequestId}`, driverRequest, { headers: this.getHeaders() });
  }

  deleteDriverRequest(driverRequestId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${driverRequestId}`, { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
  }
}
