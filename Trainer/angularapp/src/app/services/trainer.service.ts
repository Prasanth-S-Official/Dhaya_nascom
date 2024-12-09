import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trainer } from '../models/trainer.model';
import { apiUrl } from 'src/apiconfig';

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  private apiUrl = `${apiUrl}/api/trainer`;

  constructor(private http: HttpClient) {}

  getAllTrainers(): Observable<Trainer[]> {
    return this.http.get<Trainer[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getTrainerById(trainerId: number): Observable<Trainer> {
    return this.http.get<Trainer>(`${this.apiUrl}/${trainerId}`, { headers: this.getHeaders() });
  }

  addTrainer(trainer: Trainer): Observable<Trainer> {
    return this.http.post<Trainer>(this.apiUrl, trainer, { headers: this.getHeaders() });
  }

  updateTrainer(trainerId: number, trainer: Trainer): Observable<Trainer> {
    return this.http.put<Trainer>(`${this.apiUrl}/${trainerId}`, trainer, { headers: this.getHeaders() });
  }

  deleteTrainer(trainerId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${trainerId}`, { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
  }
}
