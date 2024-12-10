import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-managerpostfeedback',
  templateUrl: './managerpostfeedback.component.html',
  styleUrls: ['./managerpostfeedback.component.css']
})
export class ManagerpostfeedbackComponent implements OnInit {

  addFeedbackForm = this.formBuilder.group({
    userId: [{ value: '', disabled: true }, Validators.required], // User ID
    trainerId: ['', Validators.required], // Trainer ID from query parameter
    feedbackText: ['', Validators.required], // Feedback text
    category: ['', Validators.required], // Feedback category
  });

  categories = ['Expertise', 'Communication', 'Availability', 'Support']; // Example categories for trainers
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

    // Get trainerId from query parameters and set it in the form
    this.route.queryParams.subscribe((params) => {
      const trainerId = params['trainerId'];
      console.log('Trainer ID from query params:', trainerId);
      if (trainerId) {
        this.addFeedbackForm.get('trainerId').setValue(trainerId);
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.addFeedbackForm.valid) {
      const feedback: Feedback = {
        userId: this.addFeedbackForm.get('userId').value,
        trainerId: this.addFeedbackForm.get('trainerId').value,
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
        trainer: {
          trainerId: feedback.trainerId,
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