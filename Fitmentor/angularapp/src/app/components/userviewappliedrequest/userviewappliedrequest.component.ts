import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhysicalTrainingService } from 'src/app/services/physical-training.service';

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
  sortValue = 0;
  page = 1;
  limit = 5;
  maxRecords = 1;

  constructor(private trainingService: PhysicalTrainingService, private router: Router) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    const userId = localStorage.getItem('userId');
    this.trainingService.getPhysicalTrainingRequestsByUserId(userId).subscribe(
      (response: any) => {
        this.appliedRequests = response;
        this.filteredRequests = response;
        this.maxRecords = response.length;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  totalPages(): number {
    return Math.ceil(this.maxRecords / this.limit);
  }

  filterRequests(): void {
    const searchLower = this.searchValue.toLowerCase();
    this.filteredRequests = this.appliedRequests.filter(request =>
      request.physicalTraining.trainingName.toLowerCase().includes(searchLower)
    );
    this.maxRecords = this.filteredRequests.length;
  }

  toggleSort(order: number): void {
    this.sortValue = order;
    this.filteredRequests.sort((a, b) =>
      order === 1
        ? new Date(a.requestDate).getTime() - new Date(b.requestDate).getTime()
        : new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime()
    );
  }

  handleDeleteClick(request: any): void {
    this.requestToDelete = request;
    this.showDeletePopup = true;
  }

  handleConfirmDelete(): void {
    this.trainingService.deletePhysicalTrainingRequest(this.requestToDelete.physicalTrainingRequestId).subscribe(
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
