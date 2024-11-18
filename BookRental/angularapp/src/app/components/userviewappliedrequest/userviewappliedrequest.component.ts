import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookrentalrequestService } from 'src/app/services/bookrentalrequest.service';

@Component({
  selector: 'app-userviewappliedrequest',
  templateUrl: './userviewappliedrequest.component.html',
  styleUrls: ['./userviewappliedrequest.component.css']
})
export class UserviewappliedrequestComponent implements OnInit {
  showDeletePopup = false;
  showDetailsModal = false;
  requestToDelete: any = null;
  selectedRequest: any = null;
  appliedRequests: any[] = [];
  filteredRequests: any[] = [];
  searchValue = '';

  constructor(private rentalRequestService: BookrentalrequestService, private router: Router) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    const userId = localStorage.getItem('userId');
    this.rentalRequestService.getBookRentalRequestsByUserId(Number(userId)).subscribe(
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
      request.book.title.toLowerCase().includes(searchLower)
    );
  }

  handleDeleteClick(request: any): void {
    this.requestToDelete = request;
    this.showDeletePopup = true;
  }

  handleConfirmDelete(): void {
    this.rentalRequestService.deleteBookRentalRequest(this.requestToDelete.rentalId).subscribe(
      () => {
        this.fetchData();
        this.closeDeletePopup();
      },
      error => console.error('Error deleting request:', error)
    );
  }

  closeDeletePopup(): void {
    this.requestToDelete = null;
    this.showDeletePopup = false;
  }

  // Show additional request details in modal
  showRequestDetails(request: any): void {
    this.selectedRequest = request;
    this.showDetailsModal = true;
  }

  // Close the details modal
  closeDetailsModal(): void {
    this.selectedRequest = null;
    this.showDetailsModal = false;
  }
}
