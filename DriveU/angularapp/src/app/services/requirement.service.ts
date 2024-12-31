import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Requirement } from '../models/requirement.model';
import { apiUrl } from 'src/apiconfig';

@Injectable({
  providedIn: 'root',
})
export class RequirementService {
  private apiUrl = `${apiUrl}/api/requirement`;

  constructor(private http: HttpClient) {}

  getAllRequirements(): Observable<Requirement[]> {
    return this.http.get<Requirement[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getRequirementById(requirementId: number): Observable<Requirement> {
    return this.http.get<Requirement>(`${this.apiUrl}/${requirementId}`, { headers: this.getHeaders() });
  }

  addRequirement(requirement: Requirement): Observable<Requirement> {
    return this.http.post<Requirement>(this.apiUrl, requirement, { headers: this.getHeaders() });
  }

  updateRequirement(requirementId: number, requirement: Requirement): Observable<Requirement> {
    return this.http.put<Requirement>(`${this.apiUrl}/${requirementId}`, requirement, { headers: this.getHeaders() });
  }

  getRequirementsByTrainerId(trainerId: number): Observable<Requirement[]> {
    return this.http.get<Requirement[]>(`${this.apiUrl}/trainer/${trainerId}`, { headers: this.getHeaders() });
  }
  
  deleteRequirement(requirementId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${requirementId}`, { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
  }
}
