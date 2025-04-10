import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WifiSchemeRequestService } from 'src/app/services/wifi-scheme-request.service';

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

  constructor(private wifiSchemeRequestService: WifiSchemeRequestService, private router: Router) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    const userId = Number(localStorage.getItem('userId'));
    this.wifiSchemeRequestService.getWiFiSchemeRequestsByUserId(userId!).subscribe(
      (response: any) => {
        console.log("userapplied",response);
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
      request.wifiScheme.schemeName.toLowerCase().includes(searchLower)
    );
  }

  handleDeleteClick(request: any): void {
    this.requestToDelete = request;
    this.showDeletePopup = true;
  }

  // handleConfirmDelete(): void {
  //   this.wifiSchemeRequestService.deleteWiFiSchemeRequest(this.requestToDelete.wifiSchemeRequestId).subscribe(
  //     () => {
  //       this.fetchData();
  //       this.closeDeletePopup();
  //     },
  //     error => console.error('Error deleting request:', error)
  //   );
  // }

  handleConfirmDelete(): void {
    this.wifiSchemeRequestService.deleteWiFiSchemeRequest(this.requestToDelete.wifiSchemeRequestId).subscribe(
      () => {
        // Remove the deleted request from the array
        this.appliedRequests = this.appliedRequests.filter(
          (req) => req.wifiSchemeRequestId !== this.requestToDelete.wifiSchemeRequestId
        );
        this.filteredRequests = [...this.appliedRequests]; // Update the filteredRequests array
  
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

  navigateToFeedback(wifiSchemeId: number): void {
    this.router.navigate(['/user/add/feedback'], { queryParams: { wifiSchemeId } });
  }
}
