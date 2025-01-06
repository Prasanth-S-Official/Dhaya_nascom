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
  showPayAmountModal = false;
  isLoading = false;
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
        console.log(response);
        
        this.appliedRequests = response;
        this.filteredRequests = response;
      },
      (error) => console.error('Error fetching data:', error)
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

  // handleTripEnd(request: any): void {
  //   const actualDropTime = new Date();
  //   const timeSlot = new Date();
  //   timeSlot.setHours(request.timeSlot[0], request.timeSlot[1], 0);

  //   const formattedActualDropTime = actualDropTime.toTimeString().slice(0, 8);

  //   const durationInHours = Math.abs(
  //     (actualDropTime.getTime() - timeSlot.getTime()) / (1000 * 60 * 60)
  //   );

  //   const payment = Number(durationInHours.toFixed(2)) * request.driver.hourlyRate;

  //   const updatedRequest = {
  //     ...request,
  //     actualDropTime: formattedActualDropTime,
  //     actualDuration: `${durationInHours.toFixed(2)} hours`,
  //     paymentAmount: payment,
  //     status: 'Trip End',
  //   };

  //   this.driverRequestService.updateDriverRequest(request.driverRequestId, updatedRequest).subscribe(
  //     () => this.fetchData(),
  //     (error) => console.error('Error ending trip:', error)
  //   );
  // }

  handleTripEnd(request: any): void {
    // Parse tripDate and timeSlot into a Date object
    const tripStartDate = new Date(request.tripDate[0], request.tripDate[1] - 1, request.tripDate[2]);
    tripStartDate.setHours(request.timeSlot[0], request.timeSlot[1], 0);
  
    // Parse actualDropDate and actualDropTime into a Date object
    const actualDropDate = new Date(
      request.actualDropDate[0], // Year
      request.actualDropDate[1] - 1, // Month (0-indexed)
      request.actualDropDate[2], // Day
      request.actualDropTime[0], // Hours
      request.actualDropTime[1], // Minutes
      request.actualDropTime[2] // Seconds
    );
  
    // Calculate duration in milliseconds
    const durationInMs = actualDropDate.getTime() - tripStartDate.getTime();
  
    // Convert duration to hours and minutes
    const totalMinutes = Math.floor(durationInMs / (1000 * 60)); // Total minutes
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
  
    const actualDuration = `${hours} hours ${minutes} minutes`;
  
    // Calculate payment
    const payment = (hours + minutes / 60) * request.driver.hourlyRate;
  
    // Update the request object
    const updatedRequest = {
      ...request,
      actualDuration: actualDuration,
      actualDropDate: [
        actualDropDate.getFullYear(),
        actualDropDate.getMonth() + 1, // Adjust for 0-indexed month
        actualDropDate.getDate(),
      ],
      actualDropTime: [
        actualDropDate.getHours(),
        actualDropDate.getMinutes(),
        actualDropDate.getSeconds(),
      ],
      paymentAmount: payment.toFixed(2), // Ensure 2 decimal places for payment
      status: 'Trip End',
    };
  
    console.log(updatedRequest);
    
    // Call the API to update the request
    // this.driverRequestService.updateDriverRequest(request.driverRequestId, updatedRequest).subscribe(
    //   () => this.fetchData(),
    //   (error) => console.error('Error ending trip:', error)
    // );
  }
  

  openPayAmountModal(request: any): void {
    this.selectedRequest = {
      ...request,
      paymentAmount: request.paymentAmount ? parseFloat(request.paymentAmount.toFixed(1)) : null
    };
    this.isLoading = true;
    this.showPayAmountModal = true;

    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  closePayAmountModal(): void {
    this.showPayAmountModal = false;
    this.selectedRequest = null;
  }

  navigateToReview(): void {  
    this.router.navigate(['/customer/add/feedback', this.selectedRequest.driver.driverId]);
  }
}
