import { Component, OnInit } from '@angular/core';
import { PhysicalTrainingService } from 'src/app/services/physical-training.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminviewappliedrequest',
  templateUrl: './adminviewappliedrequest.component.html',
  styleUrls: ['./adminviewappliedrequest.component.css']
})
export class AdminviewappliedrequestComponent implements OnInit {
  trainingRequests: any[] = [];
  filteredRequests: any[] = [];
  searchValue = '';
  statusFilter = '-1'; // All statuses by default
  showModal = false;
  selectedRequest: any = null;

  constructor(
    private trainingService: PhysicalTrainingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchTrainingRequests();
  }

  fetchTrainingRequests(): void {
    this.trainingService.getAllPhysicalTrainingRequests().subscribe(
      (response) => {
        this.trainingRequests = response;
        this.filteredRequests = [...this.trainingRequests];
      },
      (error) => {
        console.error('Error fetching training requests:', error);
      }
    );
  }

  handleSearchChange(event: any): void {
    const searchValueLower = this.searchValue.toLowerCase();
    this.filteredRequests = this.trainingRequests.filter((request) =>
      request.physicalTraining.trainingName.toLowerCase().includes(searchValueLower)
    );
  }

  handleFilterChange(event: any): void {
    this.filteredRequests = this.trainingRequests.filter((request) => {
      if (this.statusFilter === '-1') {
        return true;
      } else {
        return request.status === (this.statusFilter === '0' ? 'Pending' : this.statusFilter === '1' ? 'Approved' : 'Rejected');
      }
    });
  }

  handleApprove(trainingRequest: any): void {
    trainingRequest.status = 'Approved';
    this.updateRequestStatus(trainingRequest);
  }

  handleReject(trainingRequest: any): void {
    trainingRequest.status = 'Rejected';
    this.updateRequestStatus(trainingRequest);
  }

  updateRequestStatus(trainingRequest: any): void {
    this.trainingService.updatePhysicalTrainingRequest(trainingRequest.physicalTrainingRequestId, trainingRequest).subscribe(
      () => {
        this.fetchTrainingRequests();
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
