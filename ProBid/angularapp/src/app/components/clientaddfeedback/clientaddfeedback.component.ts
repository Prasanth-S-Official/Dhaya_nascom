import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-clientaddfeedback',
  templateUrl: './clientaddfeedback.component.html',
  styleUrls: ['./clientaddfeedback.component.css']
})
export class ClientaddfeedbackComponent implements OnInit {

  addFeedbackForm = this.formBuilder.group({
    userId: [{ value: '', disabled: true }, Validators.required], // User ID
    projectId: ['', Validators.required], // Project ID
    bidId: ['', Validators.required], // Bid ID (optional if applicable)
    feedbackText: ['', Validators.required], // Feedback text
    category: ['', Validators.required], // Feedback category
    rating: [null, [Validators.required, Validators.min(1), Validators.max(5)]], // Rating out of 5
  });

  categories = ['Communication', 'Work Quality', 'Pricing', 'Timeliness']; // Example categories
  submitted = false;
  successPopup = false;

  constructor(
    private formBuilder: FormBuilder,
    private feedbackService: FeedbackService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get userId from local storage and set it in the form
    const userId = Number(localStorage.getItem('userId'));
    this.addFeedbackForm.get('userId').setValue(userId);

    // Get projectId and bidId from query parameters and set them in the form
    this.route.queryParams.subscribe((params) => {
      const projectId = Number(params['projectId']);
    const bidId = Number(params['bidId']);

    // Debugging: Check if the parameters are being captured
    console.log('Project ID:', projectId);
    console.log('Bid ID:', bidId);

      if (projectId) {
        this.addFeedbackForm.get('projectId').setValue(projectId);
      }
      if (bidId) {
        this.addFeedbackForm.get('bidId').setValue(bidId);
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    console.log(this.addFeedbackForm.value);
 
    if (this.addFeedbackForm.valid) {
      const feedback: Feedback = {
        userId: this.addFeedbackForm.get('userId').value,
        projectId: this.addFeedbackForm.get('projectId').value,
        bidId: this.addFeedbackForm.get('bidId').value,
        feedbackText: this.addFeedbackForm.get('feedbackText').value,
        category: this.addFeedbackForm.get('category').value,
        rating: this.addFeedbackForm.get('rating').value,
        date: new Date(),
      };

      // Transforming feedback object to match the backend format
      const requestPayload = {
        feedbackText: feedback.feedbackText,
        date: feedback.date.toISOString().split('T')[0],
        category: feedback.category,
        rating: feedback.rating,
        user: {
          userId: feedback.userId,
        },
        project: {
          projectId: feedback.projectId,
        },
        bid: feedback.bidId ? { bidId: feedback.bidId } : null, // Include bid only if provided
      };

      console.log(requestPayload);
      

      this.feedbackService.sendFeedback(requestPayload as unknown as Feedback).subscribe(
        (response) => {
          console.log(response);
          this.successPopup = true;
          this.addFeedbackForm.reset({ userId: this.addFeedbackForm.get('userId').value });
          this.submitted = false;
        },
        (error) => {
          alert('Error submitting feedback!');
        }
      );
    }
  }

  handleSuccessMessage(): void {
    this.successPopup = false;
    this.submitted = false;
  }
}