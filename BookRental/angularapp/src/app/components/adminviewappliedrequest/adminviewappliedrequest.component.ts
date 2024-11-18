import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookrentalrequestService } from 'src/app/services/bookrentalrequest.service';

@Component({
  selector: 'app-adminviewappliedrequest',
  templateUrl: './adminviewappliedrequest.component.html',
  styleUrls: ['./adminviewappliedrequest.component.css']
})
export class AdminviewappliedrequestComponent implements OnInit {
  rentalRequests: any[] = [];
  filteredRequests: any[] = [];
  searchValue = '';
  statusFilter = '-1'; // All statuses by default
  showModal = false;
  selectedRequest: any = null;

  constructor(
    private bookRentalService: BookrentalrequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchRentalRequests();
  }

  fetchRentalRequests(): void {
    this.bookRentalService.getAllBookRentalRequests().subscribe(
      (response) => {
        console.log("AppliedRental",response);
        this.rentalRequests = response;
        this.filteredRequests = [...this.rentalRequests];
      },
      (error) => {
        console.error('Error fetching rental requests:', error);
      }
    );
  }

  handleSearchChange(event: any): void {
    const searchValueLower = this.searchValue.toLowerCase();
    this.filteredRequests = this.rentalRequests.filter((request) =>
      request.book.title.toLowerCase().includes(searchValueLower)
    );
  }

  handleFilterChange(event: any): void {
    this.filteredRequests = this.rentalRequests.filter((request) => {
      if (this.statusFilter === '-1') {
        return true;
      } else {
        return request.status === (this.statusFilter === '0' ? 'Pending' : this.statusFilter === '1' ? 'Approved' : 'Rejected');
      }
    });
  }

  handleApprove(rentalRequest: any): void {
    rentalRequest.status = 'Approved';
    this.updateRequestStatus(rentalRequest);
  }

  handleReject(rentalRequest: any): void {
    rentalRequest.status = 'Rejected';
    this.updateRequestStatus(rentalRequest);
  }

  updateRequestStatus(rentalRequest: any): void {
    this.bookRentalService.updateBookRentalRequest(rentalRequest.rentalId, rentalRequest).subscribe(
      () => {
        this.fetchRentalRequests();
      },
      (error) => {
        console.error('Error updating request status:', error);
      }
    );
  }

  // Show More button handler to display the modal with details
  handleShowMore(request: any): void {
    this.selectedRequest = request;
    this.showModal = true;
  }

  // Close the modal
  closeModal(): void {
    this.showModal = false;
    this.selectedRequest = null;
  }
}