import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-managerviewfeedback',
  templateUrl: './managerviewfeedback.component.html',
  styleUrls: ['./managerviewfeedback.component.css']
})
export class ManagerviewfeedbackComponent implements OnInit {

  feedbacks: any[] = [];
  showDeletePopup = false;
  showDetailsModal = false;
  selectedMaterial: any = null;
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

  showMaterialDetails(material: any): void {
    this.selectedMaterial = material;
    this.showDetailsModal = true;
  }

  closeDetailsModal(): void {
    this.selectedMaterial = null;
    this.showDetailsModal = false;
  }
}
