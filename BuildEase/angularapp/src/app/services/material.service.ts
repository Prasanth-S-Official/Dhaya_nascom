import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Material } from '../models/material.model';
import { apiUrl } from 'src/apiconfig';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  private apiUrl = apiUrl;

  constructor(private http: HttpClient) {}

  getAllMaterials(): Observable<Material[]> {
    const headers = this.getHeaders();
    return this.http.get<Material[]>(`${this.apiUrl}/api/material`, { headers });
  }

  getMaterialById(materialId: number): Observable<Material> {
    const headers = this.getHeaders();
    return this.http.get<Material>(`${this.apiUrl}/api/material/${materialId}`, { headers });
  }

  addMaterial(material: Material): Observable<Material> {
    const headers = this.getHeaders();
    return this.http.post<Material>(`${this.apiUrl}/api/material`, material, { headers });
  }

  updateMaterial(materialId: number, material: Material): Observable<Material> {
    const headers = this.getHeaders();
    return this.http.put<Material>(`${this.apiUrl}/api/material/${materialId}`, material, { headers });
  }

  deleteMaterial(materialId: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/api/material/${materialId}`, { headers });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
  }
}
