import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';
import { apiUrl } from 'src/apiconfig';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = `${apiUrl}/api/project`;

  constructor(private http: HttpClient) {}

  // Fetch all projects
  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // Fetch project by ID
  getProjectById(projectId: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${projectId}`, { headers: this.getHeaders() });
  }

  // Add a new project
  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project, { headers: this.getHeaders() });
  }

  // Update an existing project
  updateProject(projectId: number, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${projectId}`, project, { headers: this.getHeaders() });
  }

  // Delete a project by ID
  deleteProject(projectId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${projectId}`, { headers: this.getHeaders() });
  }

  // Utility function to include the Bearer token in headers
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'), // Fetch token from localStorage
    });
  }
}
