import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BidService } from 'src/app/services/bid.service';

@Component({
  selector: 'app-freelancer-view-requested',
  templateUrl: './freelancer-view-requested.component.html',
  styleUrls: ['./freelancer-view-requested.component.css'],
})
export class FreelancerViewRequestedComponent implements OnInit {
  showDeletePopup = false;
  showDetailsModal = false;
  showWithdrawModal = false;
  bidToDelete: any = null;
  selectedBid: any = null;
  withdrawReason = '';
  myBids: any[] = [];
  filteredBids: any[] = [];
  searchValue = '';

  constructor(private bidService: BidService, private router: Router) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    const userId = Number(localStorage.getItem('userId'));
    this.bidService.getBidsByUserId(userId).subscribe(
      (response: any) => {
        this.myBids = response;
        this.filteredBids = response;
      },
      (error) => console.error('Error fetching bids:', error)
    );
  }

  filterBids(): void {
    const searchLower = this.searchValue.toLowerCase();
    this.filteredBids = this.myBids.filter((bid) =>
      bid.project.title.toLowerCase().includes(searchLower)
    );
  }

  handleDeleteClick(bid: any): void {
    this.bidToDelete = bid;
    this.showDeletePopup = true;
  }

  handleConfirmDelete(): void {
    this.bidService.deleteBid(this.bidToDelete.bidId).subscribe(
      () => {
        this.myBids = this.myBids.filter((b) => b.bidId !== this.bidToDelete.bidId);
        this.filteredBids = [...this.myBids];
        this.closeDeletePopup();
      },
      (error) => console.error('Error deleting bid:', error)
    );
  }

  closeDeletePopup(): void {
    this.bidToDelete = null;
    this.showDeletePopup = false;
  }

  openWithdrawModal(bid: any): void {
    this.selectedBid = bid;
    this.withdrawReason = '';
    this.showWithdrawModal = true;
  }

  confirmWithdraw(): void {
    const updatedBid = {
      ...this.selectedBid,
      status: 'Withdrawn',
      withdrawReason: this.withdrawReason,
    };

    this.bidService.updateBid(this.selectedBid.bidId, updatedBid).subscribe(
      () => {
        this.fetchData();
        this.closeWithdrawModal();
      },
      (error) => console.error('Error withdrawing bid:', error)
    );
  }

  closeWithdrawModal(): void {
    this.selectedBid = null;
    this.showWithdrawModal = false;
  }

  showBidDetails(bid: any): void {
    this.selectedBid = bid;
    this.showDetailsModal = true;
  }

  closeDetailsModal(): void {
    this.selectedBid = null;
    this.showDetailsModal = false;
  }

  navigateToEdit(bidId: number): void {
    this.router.navigate(['/freelancer/edit/bid', bidId]);
  }
}
