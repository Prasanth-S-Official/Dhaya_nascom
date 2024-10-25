// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { apiUrl } from 'src/apiconfig';
// import { Workout } from '../models/workout.model';
// import { WorkoutRequest } from '../models/workoutrequest.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class WorkoutService {
//   public apiUrl = apiUrl; // Update with your API URL

//   constructor(private http: HttpClient) { }

//   getAllWorkouts(): Observable<Workout[]> {
//     const headers = new HttpHeaders({
//       'Authorization': 'Bearer ' + localStorage.getItem('token')
//     });
//     return this.http.get<Workout[]>(`${this.apiUrl}/workout`, { headers });
//   }

//   deleteWorkout(workoutId: string): Observable<void> {
//     const headers = new HttpHeaders({
//       'Authorization': 'Bearer ' + localStorage.getItem('token')
//     });
//     return this.http.delete<void>(`${this.apiUrl}/workout/${workoutId}`, { headers });
//   }

//   getWorkoutById(id: string): Observable<Workout> {
//     const headers = new HttpHeaders({
//       'Authorization': 'Bearer ' + localStorage.getItem('token')
//     });
//     return this.http.get<Workout>(`${this.apiUrl}/workout/${id}`, { headers });
//   }

//   addWorkout(requestObject: Workout): Observable<Workout> {
//     console.log(requestObject);
//     const headers = new HttpHeaders({
//       'Authorization': 'Bearer ' + localStorage.getItem('token')
//     });
//     return this.http.post<Workout>(`${this.apiUrl}/workout`, requestObject, { headers });
//   }

//   updateWorkout(id: string, requestObject: Workout): Observable<Workout> {
//     const headers = new HttpHeaders({
//       'Authorization': 'Bearer ' + localStorage.getItem('token')
//     });
//     return this.http.put<Workout>(`${this.apiUrl}/workout/${id}`, requestObject, { headers });
//   }

//   getAppliedWorkouts(userId: string): Observable<WorkoutRequest[]> {
//     const headers = new HttpHeaders({
//       'Authorization': 'Bearer ' + localStorage.getItem('token')
//     });
//     return this.http.get<WorkoutRequest[]>(`${this.apiUrl}/workoutrequests/user/${userId}`, { headers });
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/apiconfig';
import { Workout } from '../models/workout.model';
import { WorkoutRequest } from '../models/workoutrequest.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  public apiUrl = apiUrl; // Update with your API URL

  constructor(private http: HttpClient) { }

  getAllWorkouts(): Observable<Workout[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<Workout[]>(`${this.apiUrl}/workouts/getAllWorkouts`, { headers }); // Updated to /workouts/getAllWorkouts
  }

  deleteWorkout(workoutId: string): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.delete<void>(`${this.apiUrl}/workouts/deleteWorkout/${workoutId}`, { headers }); // Updated to /workouts/deleteWorkout/:id
  }

  getWorkoutById(id: string): Observable<Workout> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<Workout>(`${this.apiUrl}/workouts/getWorkoutById/${id}`, { headers }); // Updated to /workouts/getWorkoutById/:id
  }

  addWorkout(requestObject: Workout): Observable<Workout> {
    console.log(requestObject);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.post<Workout>(`${this.apiUrl}/workouts/addWorkout`, requestObject, { headers }); // Updated to /workouts/addWorkout
  }

  updateWorkout(id: string, requestObject: Workout): Observable<Workout> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.put<Workout>(`${this.apiUrl}/workouts/updateWorkout/${id}`, requestObject, { headers }); // Updated to /workouts/updateWorkout/:id
  }

  getAppliedWorkouts(userId: string): Observable<WorkoutRequest[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<WorkoutRequest[]>(`${this.apiUrl}/workoutRequests/user/${userId}`, { headers }); // Using the new endpoint
  }
  
}
