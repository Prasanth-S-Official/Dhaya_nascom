import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent implements OnInit {
  addFeedbackForm = this.formBuilder.group({
    userId: [{value: '', disabled: true}, Validators.required],
    feedbackText: ['', Validators.required]
  });

  submitted = false;
  successPopup = false;

  constructor(private formBuilder: FormBuilder, private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    // Get userId from local storage and set it in the form
    const userId = localStorage.getItem('userId');
    this.addFeedbackForm.get('userId').setValue(userId);
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.addFeedbackForm.valid) {
      const feedback: Feedback = {
        userId: this.addFeedbackForm.get('userId').value,
        feedbackText: this.addFeedbackForm.get('feedbackText').value,
        date: new Date()
      };

      // Transforming feedback object to match the backend format
      const requestPayload = {
        feedbackText: feedback.feedbackText,
        date: feedback.date.toISOString().split('T')[0],
        user: {
          userId: feedback.userId
        }
      };

      this.feedbackService.sendFeedback(requestPayload as unknown as Feedback).subscribe(
        (response) => {
          console.log('Response:', response);
          this.successPopup = true;
          this.addFeedbackForm.reset({ userId: this.addFeedbackForm.get('userId').value });
          this.submitted = false;
        },
        (error) => {
          console.error('Error:', error);
          // Handle error
        }
      );
    }
  }

  handleSuccessMessage(): void {
    this.successPopup = false;
    this.submitted = false;
  }
}
