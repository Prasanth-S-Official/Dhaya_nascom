
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusService } from '../services/bus.service';
import { Bus } from '../models/bus.model';

@Component({
  selector: 'app-bus-form',
  templateUrl: './bus-form.component.html',
  styleUrls: ['./bus-form.component.css']
})
export class BusFormComponent implements OnInit {
  newBus: Bus = { 
    bookingId: 0, 
    busNumber: '', 
    routeSource: '', 
    routeDestination: '', 
    passengerName: '', 
    bookingDate: '' 
  };
  
  isEditMode = false;

  constructor(private busService: BusService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.busService.getBusById(+id).subscribe(bus => {
        this.newBus = bus;
      });
    }
  }

  addOrEditBus() {
    if (this.isEditMode && this.newBus.bookingId) { // Check if edit mode is enabled and bookingId exists
      this.busService.updateBus(this.newBus.bookingId, this.newBus).subscribe(() => { // Pass bookingId and newBus
        this.router.navigate(['/viewBuses']);
      });
    } else {
      this.busService.addBus(this.newBus).subscribe(() => {
        this.router.navigate(['/viewBuses']);
      });
    }
  }

}
