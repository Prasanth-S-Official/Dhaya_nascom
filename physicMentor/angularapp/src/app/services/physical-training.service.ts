import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/apiconfig';
import { PhysicalTraining } from '../models/physical-training.model';
import { PhysicalTrainingRequest } from '../models/physical-training-request.model';

@Injectable({
  providedIn: 'root'
})
export class PhysicalTrainingService {
  private apiUrl = apiUrl;

  constructor(private http: HttpClient) { }

  // PhysicalTraining Endpoints
  getAllPhysicalTrainings(): Observable<PhysicalTraining[]> {
    const headers = this.getHeaders();
    return this.http.get<PhysicalTraining[]>(`${this.apiUrl}/api/physicalTraining`, { headers });
  }

  getPhysicalTrainingById(trainingId: string): Observable<PhysicalTraining> {
    const headers = this.getHeaders();
    return this.http.get<PhysicalTraining>(`${this.apiUrl}/api/physicalTraining/${trainingId}`, { headers });
  }

  addPhysicalTraining(training: PhysicalTraining): Observable<PhysicalTraining> {
    const headers = this.getHeaders();
    return this.http.post<PhysicalTraining>(`${this.apiUrl}/api/physicalTraining`, training, { headers });
  }

  updatePhysicalTraining(trainingId: string, training: PhysicalTraining): Observable<PhysicalTraining> {
    const headers = this.getHeaders();
    return this.http.put<PhysicalTraining>(`${this.apiUrl}/api/physicalTraining/${trainingId}`, training, { headers });
  }

  deletePhysicalTraining(trainingId: string): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/api/physicalTraining/${trainingId}`, { headers });
  }

  // PhysicalTrainingRequest Endpoints
  getAllPhysicalTrainingRequests(): Observable<PhysicalTrainingRequest[]> {
    const headers = this.getHeaders();
    return this.http.get<PhysicalTrainingRequest[]>(`${this.apiUrl}/api/physical-training-request`, { headers });
  }

  getPhysicalTrainingRequestsByUserId(userId: string): Observable<PhysicalTrainingRequest[]> {
    const headers = this.getHeaders();
    return this.http.get<PhysicalTrainingRequest[]>(`${this.apiUrl}/api/physical-training-request/user/${userId}`, { headers });
  }

  addPhysicalTrainingRequest(request: PhysicalTrainingRequest): Observable<PhysicalTrainingRequest> {
    const headers = this.getHeaders();
    return this.http.post<PhysicalTrainingRequest>(`${this.apiUrl}/api/physical-training-request`, request, { headers });
  }

  updatePhysicalTrainingRequest(requestId: string, request: PhysicalTrainingRequest): Observable<PhysicalTrainingRequest> {
    const headers = this.getHeaders();
    return this.http.put<PhysicalTrainingRequest>(`${this.apiUrl}/api/physical-training-request/${requestId}`, request, { headers });
  }

  deletePhysicalTrainingRequest(requestId: string): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/api/physical-training-request/${requestId}`, { headers });
  }

  // Helper to create headers with token
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
  }
}
