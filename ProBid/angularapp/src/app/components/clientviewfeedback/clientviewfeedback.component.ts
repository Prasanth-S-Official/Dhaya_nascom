import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-clientviewfeedback',
  templateUrl: './clientviewfeedback.component.html',
  styleUrls: ['./clientviewfeedback.component.css']
})
export class ClientviewfeedbackComponent implements OnInit {

  feedbacks: any[] = [];
  showDeletePopup = false;
  showBidPopup = false;
  selectedBid: any = null;
  feedbackToDelete: number | null = null;

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.fetchFeedbacks();
  }

  fetchFeedbacks(): void {
    const userId = Number(localStorage.getItem('userId'));
    this.feedbackService.getAllfeedbacksByUserId(userId).subscribe(
      (response) => {
        this.feedbacks = response;
        console.log('Fetched Feedbacks:', this.feedbacks);
      },
      (error) => {
        console.error('Error fetching feedbacks:', error);
      }
    );
  }

  openDeletePopup(feedbackId: number): void {
    this.feedbackToDelete = feedbackId;
    this.showDeletePopup = true;
  }

  handleConfirmDelete(): void {
    if (this.feedbackToDelete) {
      this.feedbackService.deleteFeedback(this.feedbackToDelete).subscribe(
        () => {
          this.fetchFeedbacks();
          this.closeDeletePopup();
        },
        (error) => {
          console.error('Error deleting feedback:', error);
        }
      );
    }
  }

  closeDeletePopup(): void {
    this.feedbackToDelete = null;
    this.showDeletePopup = false;
  }

  viewBidDetails(bid: any): void {
    this.selectedBid = bid;
    this.showBidPopup = true;
  }

  closeBidPopup(): void {
    this.selectedBid = null;
    this.showBidPopup = false;
  }
}