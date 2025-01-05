// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { DriverRequestService } from 'src/app/services/driver-request.service';

// @Component({
//   selector: 'app-customerviewrequested',
//   templateUrl: './customerviewrequested.component.html',
//   styleUrls: ['./customerviewrequested.component.css'],
// })
// export class CustomerviewrequestedComponent implements OnInit {
//   showDeletePopup = false;
//   showDetailsModal = false;
//   requestToDelete: any = null;
//   selectedRequest: any = null;
//   appliedRequests: any[] = [];
//   filteredRequests: any[] = [];
//   searchValue = '';

//   constructor(private driverRequestService: DriverRequestService, private router: Router) {}

//   ngOnInit(): void {
//     this.fetchData();
//   }

//   fetchData(): void {
//     const userId = Number(localStorage.getItem('userId'));
//     this.driverRequestService.getDriverRequestsByUserId(userId).subscribe(
//       (response: any) => {
//         console.log('User Requested Drivers:', response);
//         this.appliedRequests = response;
//         this.filteredRequests = response;
//       },
//       (error) => {
//         console.error('Error fetching data:', error);
//       }
//     );
//   }

//   filterRequests(): void {
//     const searchLower = this.searchValue.toLowerCase();
//     this.filteredRequests = this.appliedRequests.filter(request =>
//       request.driver.driverName.toLowerCase().includes(searchLower)
//     );
//   }

//   handleDeleteClick(request: any): void {
//     this.requestToDelete = request;
//     this.showDeletePopup = true;
//   }

//   handleConfirmDelete(): void {
//     this.driverRequestService.deleteDriverRequest(this.requestToDelete.driverRequestId).subscribe(
//       () => {
//         // Remove the deleted request from the arrays
//         this.appliedRequests = this.appliedRequests.filter(
//           (req) => req.driverRequestId !== this.requestToDelete.driverRequestId
//         );
//         this.filteredRequests = [...this.appliedRequests]; // Update the filtered list

//         this.closeDeletePopup(); // Close the popup
//       },
//       (error) => {
//         console.error('Error deleting request:', error);
//       }
//     );
//   }

//   closeDeletePopup(): void {
//     this.requestToDelete = null;
//     this.showDeletePopup = false;
//   }

//   showRequestDetails(request: any): void {
//     this.selectedRequest = request;
//     this.showDetailsModal = true;
//   }

//   closeDetailsModal(): void {
//     this.selectedRequest = null;
//     this.showDetailsModal = false;
//   }

//   navigateToEdit(id: number): void {
//     this.router.navigate(['/customer/edit/request', id]);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DriverRequestService } from 'src/app/services/driver-request.service';

@Component({
  selector: 'app-customerviewrequested',
  templateUrl: './customerviewrequested.component.html',
  styleUrls: ['./customerviewrequested.component.css'],
})
export class CustomerviewrequestedComponent implements OnInit {
  showDeletePopup = false;
  showDetailsModal = false;
  requestToDelete: any = null;
  selectedRequest: any = null;
  appliedRequests: any[] = [];
  filteredRequests: any[] = [];
  searchValue = '';

  constructor(private driverRequestService: DriverRequestService, private router: Router) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    const userId = Number(localStorage.getItem('userId'));
    this.driverRequestService.getDriverRequestsByUserId(userId).subscribe(
      (response: any) => {
        this.appliedRequests = response;
        this.filteredRequests = response;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  filterRequests(): void {
    const searchLower = this.searchValue.toLowerCase();
    this.filteredRequests = this.appliedRequests.filter(request =>
      request.driver.driverName.toLowerCase().includes(searchLower)
    );
  }

  handleDeleteClick(request: any): void {
    this.requestToDelete = request;
    this.showDeletePopup = true;
  }

  handleConfirmDelete(): void {
    this.driverRequestService.deleteDriverRequest(this.requestToDelete.driverRequestId).subscribe(
      () => {
        this.appliedRequests = this.appliedRequests.filter(
          (req) => req.driverRequestId !== this.requestToDelete.driverRequestId
        );
        this.filteredRequests = [...this.appliedRequests];
        this.closeDeletePopup();
      },
      (error) => console.error('Error deleting request:', error)
    );
  }

  closeDeletePopup(): void {
    this.requestToDelete = null;
    this.showDeletePopup = false;
  }

  showRequestDetails(request: any): void {
    this.selectedRequest = request;
    this.showDetailsModal = true;
  }

  closeDetailsModal(): void {
    this.selectedRequest = null;
    this.showDetailsModal = false;
  }

  navigateToEdit(id: number): void {
    this.router.navigate(['/customer/edit/request', id]);
  }

  handleTripEnd(request: any): void {
    const actualDropTime = new Date(); // Get current time
    const timeSlot = new Date();
    timeSlot.setHours(request.timeSlot[0], request.timeSlot[1], 0);
  
    // Format actualDropTime as ISO time (HH:mm:ss)
    const formattedActualDropTime = actualDropTime.toTimeString().slice(0, 8);
  
    // Calculate duration in hours
    const durationInHours = Math.abs(
      (actualDropTime.getTime() - timeSlot.getTime()) / (1000 * 60 * 60)
    );
  
    // Calculate payment
    const payment = Number(durationInHours.toFixed(2)) * request.driver.hourlyRate;
  
    // Update request object
    const updatedRequest = {
      ...request,
      actualDropTime: formattedActualDropTime, // Correctly formatted time
      actualDuration: `${durationInHours.toFixed(2)} hours`,
      paymentAmount: payment,
      status: 'Completed',
    };
    console.log("Check",updatedRequest);
  
    this.driverRequestService.updateDriverRequest(request.driverRequestId, updatedRequest).subscribe(
      () => {
        // alert('Trip Ended Successfully!');
        this.fetchData();
      },
      (error) => console.error('Error ending trip:', error)
    );
  }
  
}
