import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialRequestService } from 'src/app/services/material-request.service';

@Component({
  selector: 'app-userviewappliedrequest',
  templateUrl: './userviewappliedrequest.component.html',
  styleUrls: ['./userviewappliedrequest.component.css'],
})
export class UserviewappliedrequestComponent implements OnInit {
  showDeletePopup = false;
  showDetailsModal = false;
  requestToDelete: any = null;
  selectedRequest: any = null;
  appliedRequests: any[] = [];
  filteredRequests: any[] = [];
  searchValue = '';

  constructor(private materialRequestService: MaterialRequestService, private router: Router) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    const userId = Number(localStorage.getItem('userId'));
    this.materialRequestService.getMaterialRequestsByUserId(userId).subscribe(
      (response: any) => {
        console.log('User Applied Requests:', response);
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
      request.material.materialName.toLowerCase().includes(searchLower)
    );
  }

  handleDeleteClick(request: any): void {
    this.requestToDelete = request;
    this.showDeletePopup = true;
  }

  handleConfirmDelete(): void {
    this.materialRequestService.deleteMaterialRequest(this.requestToDelete.materialRequestId).subscribe(
      () => {
        // Remove the deleted request from the arrays
        this.appliedRequests = this.appliedRequests.filter(
          (req) => req.materialRequestId !== this.requestToDelete.materialRequestId
        );
        this.filteredRequests = [...this.appliedRequests]; // Update the filtered list

        this.closeDeletePopup(); // Close the popup
      },
      (error) => {
        console.error('Error deleting request:', error);
      }
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

  navigateToFeedback(materialId: number): void {
    this.router.navigate(['/user/add/feedback'], { queryParams: { materialId } });
  }
}