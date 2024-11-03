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
  expandedRow: number | null = null;
  showModal = false;
  selectedRequest: any = null;

  constructor(
    private trainingService: PhysicalTrainingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchTrainingRequests();
  }

  // Fetch all training applications from the service
  fetchTrainingRequests(): void {
    this.trainingService.getAllPhysicalTrainingRequests().subscribe(
      (response) => {
        this.trainingRequests = response;
        this.filteredRequests = [...this.trainingRequests]; // Initialize the filtered list
        console.log('Training requests:', this.trainingRequests);
      },
      (error) => {
        console.error('Error fetching training requests:', error);
      }
    );
  }

  // Search functionality to filter training requests by Training Name
  handleSearchChange(event: any): void {
    this.searchValue = event.target.value.toLowerCase();
    this.filteredRequests = this.trainingRequests.filter((request) =>
      request.Training.TrainingName.toLowerCase().includes(this.searchValue)
    );
  }

  // Filter requests based on their status (Pending, Approved, Rejected)
  handleFilterChange(event: any): void {
    this.statusFilter = event.target.value;
    this.filteredRequests = this.trainingRequests.filter((request) => {
      if (this.statusFilter === '-1') {
        // If 'All' is selected, return all requests
        return true;
      } else {
        // Return only requests matching the selected status
        return request.RequestStatus === parseInt(this.statusFilter, 10);
      }
    });
  }

  // Approve a training request
  handleApprove(trainingRequest: any): void {
    trainingRequest.Status = "Approved"; // Status for Approved
    console.log("trainingRequest",trainingRequest);
    this.updateRequestStatus(trainingRequest);
  }

  // Reject a training request
  handleReject(trainingRequest: any): void {
    trainingRequest.Status = "Rejected"; // Status for Approved
    this.updateRequestStatus(trainingRequest);
  }

  // Update request status via the TrainingService
  updateRequestStatus(trainingRequest: any): void {
    console.log("trainingRequest",trainingRequest);
    this.trainingService.updatePhysicalTrainingRequest(trainingRequest.PhysicalTrainingRequestId, trainingRequest).subscribe(
      (response) => {
        console.log('Training request status updated:', response);
        this.fetchTrainingRequests(); // Refresh data after status update
      },
      (error) => {
        console.error('Error updating request status:', error);
      }
    );
  }

  // Expand row to show more details
  handleRowExpand(index: number): void {
    const selected = this.trainingRequests[index];
    this.expandedRow = this.expandedRow === index ? null : index;
    this.selectedRequest = selected;
    this.showModal = !this.showModal;
  }

  // Close the request details modal
  closeRequestDetailsModal(): void {
    this.showModal = false;
  }
}
