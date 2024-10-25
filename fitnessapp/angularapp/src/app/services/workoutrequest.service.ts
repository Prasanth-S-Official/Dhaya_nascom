import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/apiconfig';
import { WorkoutRequest } from '../models/workoutrequest.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutrequestService {

  public apiUrl = apiUrl;
  constructor(private http: HttpClient) { }

  // Add a new workout request
  addWorkoutRequest(data: WorkoutRequest): Observable<WorkoutRequest> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.post<WorkoutRequest>(`${this.apiUrl}/workoutRequests/addWorkoutRequest`, data, { headers });
  }

  // Get applied workouts for a specific user
  getAppliedWorkouts(userId: string): Observable<WorkoutRequest[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<WorkoutRequest[]>(`${this.apiUrl}/workoutRequests/user/${userId}`, { headers });
  }

  // Delete a workout application by request ID
  deleteWorkoutApplication(requestedId: string): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.delete<void>(`${this.apiUrl}/workoutRequests/deleteWorkoutRequest/${requestedId}`, { headers });
  }

  // Get all workout requests
  getAllWorkoutRequests(): Observable<WorkoutRequest[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<WorkoutRequest[]>(`${this.apiUrl}/workoutRequests/getAllWorkoutRequests`, { headers });
  }

  // Update the status of a workout request
  updateWorkoutStatus(id: string, workoutApplication: WorkoutRequest): Observable<WorkoutRequest> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.put<WorkoutRequest>(`${this.apiUrl}/workoutRequests/updateWorkoutRequest/${id}`, workoutApplication, { headers });
  }
}
