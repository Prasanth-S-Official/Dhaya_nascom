import { Component, OnInit } from '@angular/core';
import { WiFiSchemeRequestService } from 'src/app/services/wifi-scheme-request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminviewappliedrequest',
  templateUrl: './adminviewappliedrequest.component.html',
  styleUrls: ['./adminviewappliedrequest.component.css']
})
export class AdminviewappliedrequestComponent implements OnInit {
  wifiSchemeRequests: any[] = [];
  filteredRequests: any[] = [];
  searchValue = '';
  statusFilter = '-1'; // All statuses by default
  showModal = false;
  selectedRequest: any = null;

  constructor(
    private wifiSchemeRequestService: WiFiSchemeRequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchWiFiSchemeRequests();
  }

  fetchWiFiSchemeRequests(): void {
    this.wifiSchemeRequestService.getAllWiFiSchemeRequests().subscribe(
      (response) => {
        this.wifiSchemeRequests = response;
        this.filteredRequests = [...this.wifiSchemeRequests];
      },
      (error) => {
        console.error('Error fetching WiFi scheme requests:', error);
      }
    );
  }

  handleSearchChange(event: any): void {
    const searchValueLower = this.searchValue.toLowerCase();
    this.filteredRequests = this.wifiSchemeRequests.filter((request) =>
      request.wifiScheme.schemeName.toLowerCase().includes(searchValueLower)
    );
  }

  handleFilterChange(event: any): void {
    this.filteredRequests = this.wifiSchemeRequests.filter((request) => {
      if (this.statusFilter === '-1') {
        return true;
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
    this.wifiSchemeRequestService.updateWiFiSchemeRequest(request.wifiSchemeRequestId, request).subscribe(
      () => {
        this.fetchWiFiSchemeRequests();
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
