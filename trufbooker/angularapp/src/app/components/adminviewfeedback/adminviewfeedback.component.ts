import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit {

  feedbacks: any[] = [];
  filteredFeedbacks: any[] = [];
  uniqueCategories: string[] = [];
  selectedCategory = '';
  showProfilePopup = false;
  showDriverPopup = false;
  selectedUser: any = null;
  selectedDriver: any = null;

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.fetchFeedbacks();
  }

  fetchFeedbacks(): void {
    this.feedbackService.getFeedbacks().subscribe(
      (response) => {
        this.feedbacks = response;
        this.filteredFeedbacks = [...this.feedbacks];
        this.extractUniqueCategories();
      },
      (error) => {
        console.error('Error fetching feedbacks:', error);
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

  showProfile(user: any): void {
    this.selectedUser = user;
    this.showProfilePopup = true;
  }

  closeProfilePopup(): void {
    this.showProfilePopup = false;
  }

  showDriverDetails(driver: any): void {
    this.selectedDriver = driver;
    this.showDriverPopup = true;
  }

  closeDriverPopup(): void {
    this.showDriverPopup = false;
  }
}
