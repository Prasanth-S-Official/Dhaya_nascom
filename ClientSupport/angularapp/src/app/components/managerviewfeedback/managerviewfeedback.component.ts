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
  showAgentPopup = false;
  showTicketPopup = false;
  selectedUser = null;
  selectedTrainer = null;
  selectedAgent = null;
  selectedTicket = null;

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
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

  showAgentProfile(agent): void {
    this.selectedAgent = agent;
    this.showAgentPopup = true;
  }

  closeAgentPopup(): void {
    this.showAgentPopup = false;
  }

  showTicketDetails(ticket): void {
    this.selectedTicket = ticket;
    this.showTicketPopup = true;
  }

  closeTicketPopup(): void {
    this.showTicketPopup = false;
  }
}
