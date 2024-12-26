import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
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
      const feedback: Feedback = {
        feedbackId: undefined, // Optional
        feedbackText: this.addFeedbackForm.get('feedbackText').value,
        date: new Date(),
        category: this.addFeedbackForm.get('category').value,
        rating: this.addFeedbackForm.get('rating').value, // Assuming rating is in the form
        userId: Number(this.addFeedbackForm.get('userId').value),
        ticketId: Number(this.addFeedbackForm.get('ticketId').value), // Assuming ticketId is in the form
        agentId: Number(this.addFeedbackForm.get('agentId')?.value), // Optional
      };
  
      // Transforming feedback object to match the backend format
      const requestPayload = {
        feedbackText: feedback.feedbackText,
        date: feedback.date.toISOString().split('T')[0], // Format date to YYYY-MM-DD
        category: feedback.category,
        rating: feedback.rating,
        user: {
          userId: feedback.userId,
        },
        supportAgent: feedback.agentId ? { agentId: feedback.agentId } : null, // Include agentId only if present
        ticket: {
          ticketId: feedback.ticketId,
        },
      };
  
      console.log('Constructed requestPayload:', requestPayload);
  
      // Ensure the type matches the expected structure
      this.feedbackService.sendFeedback(requestPayload as unknown as Feedback).subscribe(
        (response) => {
          console.log('Feedback submitted successfully:', response);
          this.successPopup = true;
          this.addFeedbackForm.reset();
          this.submitted = false;
        },
        (error) => {
          console.error('Error submitting feedback:', error);
          alert('Error submitting feedback!');
        }
      );
    } else {
      console.error('Form is invalid:', this.addFeedbackForm.errors);
    }
  }
  
  
  handleSuccessMessage(): void {
    this.successPopup = false;
    this.submitted = false;
  }
}
