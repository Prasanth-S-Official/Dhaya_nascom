import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Feedback } from 'src/app/models/feedback.model';

@Component({
  selector: 'app-customerpostfeedback',
  templateUrl: './customerpostfeedback.component.html',
  styleUrls: ['./customerpostfeedback.component.css']
})
export class CustomerpostfeedbackComponent implements OnInit {
  feedbackForm: FormGroup;
  categories = ['Driver Performance', 'Service Experience', 'Punctuality', 'Behavior'];
  submitted = false;
  successPopup = false;

  constructor(
    private formBuilder: FormBuilder,
    private feedbackService: FeedbackService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.feedbackForm = this.formBuilder.group({
      feedbackText: ['', Validators.required],
      category: ['', Validators.required],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      driverId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const driverId = this.route.snapshot.queryParamMap.get('driverId');
    if (driverId) {
      this.feedbackForm.get('driverId')?.setValue(driverId);
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.feedbackForm.valid) {
      const userId = Number(localStorage.getItem('userId'));

      const feedback: Feedback = {
        feedbackText: this.feedbackForm.get('feedbackText')?.value,
        category: this.feedbackForm.get('category')?.value,
        rating: this.feedbackForm.get('rating')?.value,
        date: new Date(),
        userId: userId,
        driverId: this.feedbackForm.get('driverId')?.value,
      };

      const requestPayload = {
        feedbackText: feedback.feedbackText,
        date: feedback.date.toISOString().split('T')[0],
        category: feedback.category,
        rating: feedback.rating,
        user: { userId: feedback.userId },
        driver: { driverId: feedback.driverId },
      };

      this.feedbackService.sendFeedback(requestPayload as unknown as Feedback).subscribe(
        () => {
          this.successPopup = true;
          this.feedbackForm.reset();
          this.submitted = false;
        },
        (error) => {
          console.error('Error submitting feedback:', error);
          alert('Failed to submit feedback. Please try again.');
        }
      );
    }
  }

  handleSuccessMessage(): void {
    this.successPopup = false;
    this.router.navigate(['/customer/view/drivers']);
  }
}
