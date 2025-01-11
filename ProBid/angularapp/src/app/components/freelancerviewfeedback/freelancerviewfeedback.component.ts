import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-freelancerviewfeedback',
  templateUrl: './freelancerviewfeedback.component.html',
  styleUrls: ['./freelancerviewfeedback.component.css']
})
export class FreelancerviewfeedbackComponent implements OnInit {
  feedbacks = [];
  filteredFeedbacks = [];
  userId: number;
  showClientPopup = false;
  showProjectPopup = false;
  showBidPopup = false;
  selectedClient = null;
  selectedProject = null;
  selectedBid = null;

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userId')); // Get Freelancer's userId
    this.fetchFeedbacks();
  }

  fetchFeedbacks(): void {
    this.feedbackService.getFeedbacks().subscribe(
      (response) => {
        console.log('GetFeedback', response);
        // Filter feedbacks where userId matches bid.user
        this.feedbacks = response.filter(feedback => feedback.bid?.user?.userId === this.userId);
        this.filteredFeedbacks = [...this.feedbacks]; // Initialize filtered feedbacks
      },
      (error) => {
        console.error('Error fetching feedbacks:', error);
      }
    );
  }

  showClientInfo(user): void {
    this.selectedClient = user;
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
