import { Component, OnInit } from '@angular/core';
import { DriverRequestService } from 'src/app/services/driver-request.service';

@Component({
  selector: 'app-adminviewrequests',
  templateUrl: './adminviewrequests.component.html',
  styleUrls: ['./adminviewrequests.component.css']
})
export class AdminviewrequestsComponent implements OnInit {
  driverRequests: any[] = [];
  filteredRequests: any[] = [];
  searchValue = '';
  statusFilter = '-1'; // All statuses by default
  showModal = false;
  selectedRequest: any = null;

  constructor(private driverRequestService: DriverRequestService) {}

  ngOnInit(): void {
    this.fetchDriverRequests();
  }

  fetchDriverRequests(): void {
    this.driverRequestService.getAllDriverRequests().subscribe(
      (response) => {
        console.log('Driver Requests:', response);
        this.driverRequests = response;
        this.filteredRequests = [...this.driverRequests];
      },
      (error) => {
        console.error('Error fetching driver requests:', error);
      }
    );
  }

  handleSearchChange(): void {
    const searchValueLower = this.searchValue.toLowerCase();
    this.filteredRequests = this.driverRequests.filter((request) =>
      request.user.username.toLowerCase().includes(searchValueLower) ||
      request.pickupLocation.toLowerCase().includes(searchValueLower)
    );
  }

  handleFilterChange(): void {
    this.filteredRequests = this.driverRequests.filter((request) => {
      if (this.statusFilter === '-1') {
        return true; // Show all statuses
      } else {
        return request.status === this.statusFilter;
      }
    });
  }

  handleApprove(request: any): void {
    request.status = 'Approved';
    this.updateRequestStatus(request);
  }

  handleReject(request: any): void {
    request.status = 'Rejected';
    this.updateRequestStatus(request);
  }

  updateRequestStatus(request: any): void {
    this.driverRequestService.updateDriverRequest(request.driverRequestId, request).subscribe(
      () => {
        this.fetchDriverRequests();
      },
      (error) => {
        console.error('Error updating request status:', error);
      }
    );
  }

  handleShowDriverDetails(request: any): void {
    this.selectedRequest = request;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedRequest = null;
  }
}
