import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-managerviewfeedback',
  templateUrl: './managerviewfeedback.component.html',
  styleUrls: ['./managerviewfeedback.component.css']
})
export class ManagerviewfeedbackComponent implements OnInit {
  feedbacks = [];
  filteredFeedbacks = [];
  uniqueCategories = [];
  selectedCategory = '';
  showProfilePopup = false;
  showTrainerPopup = false;
  selectedUser = null;
  selectedTrainer = null;

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.feedbackService.getFeedbacks().subscribe(
      (response) => {
        console.log("GetFeedback", response);
        this.feedbacks = response;
        this.filteredFeedbacks = [...this.feedbacks]; // Initialize filtered feedbacks
        this.extractUniqueCategories(); // Extract unique categories
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  extractUniqueCategories(): void {
    this.uniqueCategories = Array.from(new Set(this.feedbacks.map(f => f.category)));
  }

  filterFeedbacks(): void {
    if (this.selectedCategory) {
      this.filteredFeedbacks = this.feedbacks.filter(f => f.category === this.selectedCategory);
    } else {
      this.filteredFeedbacks = [...this.feedbacks];
    }
  }

  showProfile(user): void {
    this.selectedUser = user;
    this.showProfilePopup = true;
  }

  closeProfilePopup(): void {
    this.showProfilePopup = false;
  }

  showTrainerDetails(trainer): void {
    this.selectedTrainer = trainer;
    this.showTrainerPopup = true;
  }

  closeTrainerPopup(): void {
    this.showTrainerPopup = false;
  }
}
