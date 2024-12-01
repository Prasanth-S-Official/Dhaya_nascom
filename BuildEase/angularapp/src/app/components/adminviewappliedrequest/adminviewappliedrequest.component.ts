import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialRequestService } from 'src/app/services/material-request.service';

@Component({
  selector: 'app-adminviewappliedrequest',
  templateUrl: './adminviewappliedrequest.component.html',
  styleUrls: ['./adminviewappliedrequest.component.css']
})
export class AdminviewappliedrequestComponent implements OnInit {
  materialRequests: any[] = [];
  filteredRequests: any[] = [];
  searchValue = '';
  statusFilter = '-1'; // All statuses by default
  showModal = false;
  selectedRequest: any = null;

  constructor(
    private materialRequestService: MaterialRequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchMaterialRequests();
  }

  fetchMaterialRequests(): void {
    this.materialRequestService.getAllMaterialRequests().subscribe(
      (response) => {
        console.log('Requests:', response);
        this.materialRequests = response;
        this.filteredRequests = [...this.materialRequests];
      },
      (error) => {
        console.error('Error fetching material requests:', error);
      }
    );
  }

  handleSearchChange(): void {
    const searchValueLower = this.searchValue.toLowerCase();
    this.filteredRequests = this.materialRequests.filter((request) =>
      request.material.materialName.toLowerCase().includes(searchValueLower)
    );
  }

  handleFilterChange(): void {
    this.filteredRequests = this.materialRequests.filter((request) => {
      if (this.statusFilter === '-1') {
        return true; // Show all statuses
      } else {
        return request.status === (this.statusFilter === '0' ? 'Pending' : this.statusFilter === '1' ? 'Approved' : 'Rejected');
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
    this.materialRequestService.updateMaterialRequest(request.materialRequestId, request).subscribe(
      () => {
        this.fetchMaterialRequests();
      },
      (error) => {
        console.error('Error updating request status:', error);
      }
    );
  }

  handleShowMore(request: any): void {
    this.selectedRequest = request;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedRequest = null;
  }
}