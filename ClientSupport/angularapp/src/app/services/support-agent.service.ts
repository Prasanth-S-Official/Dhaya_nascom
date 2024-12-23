import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupportAgent } from '../models/support-agent.model';
import { apiUrl } from 'src/apiconfig';

@Injectable({
  providedIn: 'root',
})
export class SupportAgentService {
  private apiUrl = `${apiUrl}/api/supportAgent`;

  constructor(private http: HttpClient) {}

  getAllAgents(): Observable<SupportAgent[]> {
    return this.http.get<SupportAgent[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getAgentById(agentId: number): Observable<SupportAgent> {
    return this.http.get<SupportAgent>(`${this.apiUrl}/${agentId}`, { headers: this.getHeaders() });
  }

  addAgent(agent: SupportAgent): Observable<SupportAgent> {
    return this.http.post<SupportAgent>(this.apiUrl, agent, { headers: this.getHeaders() });
  }

  updateAgent(agentId: number, agent: SupportAgent): Observable<SupportAgent> {
    return this.http.put<SupportAgent>(`${this.apiUrl}/${agentId}`, agent, { headers: this.getHeaders() });
  }

  deleteAgent(agentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${agentId}`, { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
  }
}
