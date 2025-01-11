import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-freelancerviewfeedback',
  templateUrl: './freelancerviewfeedback.component.html',
  styleUrls: ['./freelancerviewfeedback.component.css'],
})
export class FreelancerviewfeedbackComponent implements OnInit {
  feedbacks = []; // All feedbacks
  filteredFeedbacks = []; // Feedbacks after filtering
  uniqueCategories = []; // Unique categories for the filter dropdown
  selectedCategory = ''; // Selected category in the filter
  showClientPopup = false;
  showProjectPopup = false;
  showBidPopup = false;
  selectedClient = null;
  selectedProject = null;
  selectedBid = null;

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.fetchFeedbacks();
  }

  fetchFeedbacks(): void {
    const freelancerId = Number(localStorage.getItem('userId')); // Assuming userId is stored in local storage
    this.feedbackService.getFeedbacks().subscribe(
      (response: any[]) => {
        this.feedbacks = response.filter((f) => f.bid.user.userId === freelancerId);
        this.filteredFeedbacks = [...this.feedbacks]; // Initialize filtered feedbacks
        this.extractUniqueCategories(); // Extract unique categories
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  extractUniqueCategories(): void {
    this.uniqueCategories = Array.from(new Set(this.feedbacks.map((f) => f.category)));
  }

  filterFeedbacks(): void {
    if (this.selectedCategory) {
      this.filteredFeedbacks = this.feedbacks.filter(
        (f) => f.category === this.selectedCategory
      );
    } else {
      this.filteredFeedbacks = [...this.feedbacks];
    }
  }

  showClientInfo(client): void {
    this.selectedClient = client;
    this.showClientPopup = true;
  }

  closeClientPopup(): void {
    this.showClientPopup = false;
  }

  showProjectInfo(project): void {
    this.selectedProject = project;
    this.showProjectPopup = true;
  }

  closeProjectPopup(): void {
    this.showProjectPopup = false;
  }

  showBidInfo(bid): void {
    this.selectedBid = bid;
    this.showBidPopup = true;
  }

  closeBidPopup(): void {
    this.showBidPopup = false;
  }
}
