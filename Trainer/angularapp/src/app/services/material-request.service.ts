import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MaterialRequest } from '../models/material-request.model';
import { apiUrl } from 'src/apiconfig';

@Injectable({
  providedIn: 'root'
})
export class MaterialRequestService {

  private apiUrl = apiUrl;

  constructor(private http: HttpClient) {}

  getAllMaterialRequests(): Observable<MaterialRequest[]> {
    const headers = this.getHeaders();
    return this.http.get<MaterialRequest[]>(`${this.apiUrl}/api/materialRequest`, { headers });
  }

  getMaterialRequestsByUserId(userId: number): Observable<MaterialRequest[]> {
    const headers = this.getHeaders();
    return this.http.get<MaterialRequest[]>(`${this.apiUrl}/api/materialRequest/user/${userId}`, { headers });
  }

  addMaterialRequest(request: MaterialRequest): Observable<MaterialRequest> {
    const headers = this.getHeaders();
    return this.http.post<MaterialRequest>(`${this.apiUrl}/api/materialRequest`, request, { headers });
  }

  updateMaterialRequest(requestId: number, request: MaterialRequest): Observable<MaterialRequest> {
    const headers = this.getHeaders();
    return this.http.put<MaterialRequest>(`${this.apiUrl}/api/materialRequest/${requestId}`, request, { headers });
  }

  deleteMaterialRequest(requestId: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/api/materialRequest/${requestId}`, { headers });
  }

  getAdminInsights(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/api/materialRequest/admin/insights`, { headers });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
  }
}