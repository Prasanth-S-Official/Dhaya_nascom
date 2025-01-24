import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bus } from '../models/bus.model'; // Adjusted model name
import { BusService } from '../services/bus.service'; // Adjusted service name

@Component({
  selector: 'app-delete-confirm', // Adjusted component selector
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent implements OnInit {
  bookingId: number;
  bus: Bus = {} as Bus; // Initialize bus property with an empty object

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private busService: BusService // Adjusted service name
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bookingId = +params['id']; // Adjust parameter name
      this.busService.getBusById(this.bookingId).subscribe(
        (bus: Bus) => { // Adjust type casting
          this.bus = bus;
        },
        error => {
          console.error('Error fetching bus:', error);
        }
      );
    });
  }

  confirmDelete(bookingId: number): void { // Adjust method signature
    this.busService.deleteBus(bookingId).subscribe(
      () => {
        console.log('Bus deleted successfully.');
        this.router.navigate(['/viewBuses']); // Adjust the route
      },
      (error) => {
        console.error('Error deleting bus:', error);
      }
    );
  }

  cancelDelete(): void {
    this.router.navigate(['/viewBuses']); // Adjust the route
  }
}
