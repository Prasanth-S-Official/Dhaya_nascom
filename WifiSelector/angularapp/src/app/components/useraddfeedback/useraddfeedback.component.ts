import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css'],
})
export class UseraddfeedbackComponent implements OnInit {
  addFeedbackForm = this.formBuilder.group({
    userId: [{ value: '', disabled: true }, Validators.required], // User ID
    wifiSchemeId: ['', Validators.required], // WiFi Scheme ID from query parameter
    feedbackText: ['', Validators.required], // Feedback text
    category: ['', Validators.required], // Feedback category
  });

  categories = ['Service', 'Pricing', 'Speed', 'Support']; // Example categories
  submitted = false;
  successPopup = false;

  constructor(
    private formBuilder: FormBuilder,
    private feedbackService: FeedbackService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get userId from local storage and set it in the form
    const userId = localStorage.getItem('userId');
    console.log('User ID from local storage:', userId);
    this.addFeedbackForm.get('userId').setValue(userId);

    // Get wifiSchemeId from query parameters and set it in the form
    this.route.queryParams.subscribe((params) => {
      const wifiSchemeId = params['wifiSchemeId'];
      console.log('WiFi Scheme ID from query params:', wifiSchemeId);
      if (wifiSchemeId) {
        this.addFeedbackForm.get('wifiSchemeId').setValue(wifiSchemeId);
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.addFeedbackForm.valid) {
      const feedback: Feedback = {
        userId: this.addFeedbackForm.get('userId').value,
        wifiSchemeId: this.addFeedbackForm.get('wifiSchemeId').value,
        feedbackText: this.addFeedbackForm.get('feedbackText').value,
        category: this.addFeedbackForm.get('category').value,
        date: new Date(),
      };

      // Transforming feedback object to match the backend format
      const requestPayload = {
        feedbackText: feedback.feedbackText,
        date: feedback.date.toISOString().split('T')[0],
        category: feedback.category,
        user: {
          userId: feedback.userId,
        },
        wifiScheme: {
          wifiSchemeId: feedback.wifiSchemeId,
        },
      };

      console.log('Constructed requestPayload:', requestPayload);

      this.feedbackService.sendFeedback(requestPayload as unknown as Feedback).subscribe(
        (response) => {
          console.log('Response from API:', response);
          this.successPopup = true;
          this.addFeedbackForm.reset({ userId: this.addFeedbackForm.get('userId').value });
          this.submitted = false;
        },
        (error) => {
          console.error('Error:', error);
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
