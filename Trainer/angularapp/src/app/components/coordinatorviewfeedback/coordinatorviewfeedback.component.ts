import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-coordinatorviewfeedback',
  templateUrl: './coordinatorviewfeedback.component.html',
  styleUrls: ['./coordinatorviewfeedback.component.css']
})
export class CoordinatorviewfeedbackComponent implements OnInit {

  feedbacks = [];
  filteredFeedbacks = [];
  uniqueCategories = [];
  selectedCategory = '';
  showProfilePopup = false;
  showMaterialPopup = false;
  selectedUser = null;
  selectedMaterial = null;

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

  showMaterialDetails(material): void {
    this.selectedMaterial = material;
    this.showMaterialPopup = true;
  }

  closeMaterialPopup(): void {
    this.showMaterialPopup = false;
  }
}
