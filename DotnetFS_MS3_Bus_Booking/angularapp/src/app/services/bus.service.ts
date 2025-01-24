// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Bus } from '../models/bus.model'; // Import Bus model

// @Injectable({
//   providedIn: 'root'
// })
// export class BusService {
//   private apiUrl = 'https://8080-fcccbfbbbfdefdeac319895175ffdbabfetwo.premiumproject.examly.io'; // Replace this with your API endpoint

//   constructor(private http: HttpClient) { }

//   addBus(bus: Bus): Observable<Bus> {
//     return this.http.post<Bus>(`${this.apiUrl}/api/Bus`, bus);
//   }

//   getBuses(): Observable<Bus[]> {
//     return this.http.get<Bus[]>(`${this.apiUrl}/api/Bus`);
//   }

//   getBusById(bookingId: number): Observable<Bus> {
//     const url = `${this.apiUrl}/api/Bus/${bookingId}`;
//     return this.http.get<Bus>(url);
//   }

//   updateBus(bookingId: number, bus: Bus): Observable<Bus> { 
//     const url = `${this.apiUrl}/api/Bus/${bookingId}`;
//     return this.http.put<Bus>(url, bus); 
//   }

//   deleteBus(bookingId: number): Observable<void> {
//     const url = `${this.apiUrl}/api/Bus/${bookingId}`;
//     return this.http.delete<void>(url);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bus } from '../models/bus.model'; // Ensure this points to your Bus model

@Injectable({
  providedIn: 'root'
})
export class BusService {
  private apiUrl = 'https://ide-abfdabeabcbaed319332313dbaefebdaefbfone.premiumproject.examly.io/proxy/8080'; // JSON Server endpoint

  constructor(private http: HttpClient) { }

  // Add new bus
  addBus(bus: Bus): Observable<Bus> {
    return this.http.post<Bus>(`${this.apiUrl}/buses`, bus);
  }

  // Get all buses
  getBuses(): Observable<Bus[]> {
    return this.http.get<Bus[]>(`${this.apiUrl}/buses`);
  }

  // Get bus by ID
  getBusById(id: number): Observable<Bus> {
    const url = `${this.apiUrl}/buses/${id}`;
    return this.http.get<Bus>(url);
  }

  // Update bus by ID
  updateBus(id: number, bus: Bus): Observable<Bus> {
    const url = `${this.apiUrl}/buses/${id}`;
    return this.http.put<Bus>(url, bus);
  }

  // Delete bus by ID
  deleteBus(id: number): Observable<void> {
    const url = `${this.apiUrl}/buses/${id}`;
    return this.http.delete<void>(url);
  }
}
