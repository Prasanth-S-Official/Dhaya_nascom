import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-clientpostfeedback',
  templateUrl: './clientpostfeedback.component.html',
  styleUrls: ['./clientpostfeedback.component.css'],
})
export class ClientpostfeedbackComponent implements OnInit {
  addFeedbackForm = this.formBuilder.group({
    userId: [{ value: '', disabled: true }, Validators.required], // User ID
    agentId: ['', Validators.required], // Support Agent ID from query parameter
    ticketId: ['', Validators.required], // Ticket ID from query parameter
    feedbackText: ['', Validators.required], // Feedback text
    category: ['', Validators.required], // Feedback category
    rating: ['', Validators.required], // Rating
  });

  categories = ['Service Quality', 'Professionalism', 'Responsiveness']; // Categories
  ratings = [1, 2, 3, 4, 5]; // Rating options
  submitted = false;
  successPopup = false;

  constructor(
    private formBuilder: FormBuilder,
    private feedbackService: FeedbackService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    this.addFeedbackForm.get('userId').setValue(userId);

    this.route.queryParams.subscribe((params) => {
      const agentId = params['agentId'];
      const ticketId = params['ticketId'];
      if (agentId && ticketId) {
        this.addFeedbackForm.get('agentId').setValue(agentId);
        this.addFeedbackForm.get('ticketId').setValue(ticketId);
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.addFeedbackForm.valid) {
      const feedback = {
        feedbackText: this.addFeedbackForm.get('feedbackText').value,
        date: new Date(),
        category: this.addFeedbackForm.get('category').value,
        rating: this.addFeedbackForm.get('rating').value,
        user: { userId: this.addFeedbackForm.get('userId').value },
        supportAgent: { agentId: this.addFeedbackForm.get('agentId').value },
        ticket: { ticketId: this.addFeedbackForm.get('ticketId').value },
      };

      this.feedbackService.sendFeedback(feedback).subscribe(
        () => {
          this.successPopup = true;
          this.addFeedbackForm.reset({ userId: this.addFeedbackForm.get('userId').value });
          this.submitted = false;
        },
        (error) => {
          console.error('Error:', error);
          alert('Error submitting feedback.');
        }
      );
    }
  }

  handleSuccessMessage(): void {
    this.successPopup = false;
    this.submitted = false;
  }
}
