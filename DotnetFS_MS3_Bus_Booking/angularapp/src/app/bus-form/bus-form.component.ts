// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { BusService } from '../services/bus.service';
// import { Bus } from '../models/bus.model';

// @Component({
//   selector: 'app-bus-form',
//   templateUrl: './bus-form.component.html',
//   styleUrls: ['./bus-form.component.css']
// })
// export class BusFormComponent implements OnInit {
//   newBus: Bus = { 
//     id: 0, // Changed bookingId to id
//     busNumber: '', 
//     routeSource: '', 
//     routeDestination: '', 
//     passengerName: '', 
//     bookingDate: '' 
//   };
  
//   isEditMode = false;

//   constructor(private busService: BusService, private route: ActivatedRoute, private router: Router) { }

//   ngOnInit(): void {
//     const id = this.route.snapshot.paramMap.get('id');
//     if (id) {
//       this.isEditMode = true;
//       this.busService.getBusById(+id).subscribe(bus => {
//         this.newBus = bus;
//       });
//     }
//   }

//   addOrEditBus() {
//     if (this.isEditMode && this.newBus.id) { // Changed bookingId to id
//       this.busService.updateBus(this.newBus.id, this.newBus).subscribe(() => { // Pass id and newBus
//         this.router.navigate(['/viewBuses']);
//       });
//     } else {
//       this.busService.addBus(this.newBus).subscribe(() => {
//         // this.router.navigate(['/viewBuses']);
//       });
//     }
//   }
// }


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
    id: 0, // Changed bookingId to id
    busNumber: '',
    routeSource: '',
    routeDestination: '',
    passengerName: '',
    bookingDate: '',
  };

  isEditMode = false;

  constructor(
    private busService: BusService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.busService.getBusById(+id).subscribe((bus) => {
        this.newBus = bus;
      });
    }
  }

  addOrEditBus(busForm: any) {
    if (!busForm.valid) {
      // Trigger validation messages if form is invalid
      busForm.form.markAllAsTouched();
      return;
    }

    if (this.isEditMode && this.newBus.id) {
      this.busService.updateBus(this.newBus.id, this.newBus).subscribe(() => {
        this.router.navigate(['/viewBuses']);
      });
    } else {
      this.busService.addBus(this.newBus).subscribe(() => {
        this.router.navigate(['/viewBuses']);
      });
    }
  }
}
