import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-clientviewfeedback',
  templateUrl: './clientviewfeedback.component.html',
  styleUrls: ['./clientviewfeedback.component.css'],
})
export class ClientviewfeedbackComponent implements OnInit {
  feedbacks: any[] = [];
  showDeletePopup = false;
  showAgentModal = false;
  showTicketModal = false;
  selectedAgent: any = null;
  selectedTicket: any = null;
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

  showAgentDetails(agent: any): void {
    this.selectedAgent = agent;
    this.showAgentModal = true;
  }

  closeAgentModal(): void {
    this.selectedAgent = null;
    this.showAgentModal = false;
  }

  showTicketDetails(ticket: any): void {
    this.selectedTicket = ticket;
    this.showTicketModal = true;
  }

  closeTicketModal(): void {
    this.selectedTicket = null;
    this.showTicketModal = false;
  }
}
