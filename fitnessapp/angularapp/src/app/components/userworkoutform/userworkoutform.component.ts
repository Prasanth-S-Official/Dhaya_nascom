import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WorkoutRequest } from 'src/app/models/workoutrequest.model';
import { WorkoutrequestService } from 'src/app/services/workoutrequest.service';

@Component({
  selector: 'app-userworkoutform',
  templateUrl: './userworkoutform.component.html',
  styleUrls: ['./userworkoutform.component.css']
})
export class UserworkoutformComponent implements OnInit {

  workoutForm: FormGroup;
  successPopup = false;
  errorMessage = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private workoutRequestService: WorkoutrequestService
  ) {
    this.workoutForm = this.fb.group({
      age: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      bmi: ['', [Validators.required, Validators.min(10), Validators.max(50)]],
      gender: ['', Validators.required],
      dietaryPreferences: ['', Validators.required],
      medicalHistory: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.workoutForm.valid) {
      const formData = this.workoutForm.value;
      const requestObject: WorkoutRequest = {
        userId: localStorage.getItem('userId'), // Get ObjectId from localStorage (this should be a string)
        workoutId: localStorage.getItem('workoutId'), // Get ObjectId from localStorage (this should be a string)
        age: Number(formData.age),
        bmi: Number(formData.bmi),
        gender: formData.gender,
        dietaryPreferences: formData.dietaryPreferences,
        medicalHistory: formData.medicalHistory,
        requestedDate: new Date().toISOString(),
        requestStatus: 'Pending', // Default status when a request is created
      };

      // Submit the workout request
      this.workoutRequestService.addWorkoutRequest(requestObject).subscribe(
        (response) => {
          console.log('Response:', response);
          this.successPopup = true;
        },
        (error) => {
          console.error('Error submitting workout request:', error);
          this.errorMessage = 'Error submitting workout request';
        }
      );
    } else {
      this.errorMessage = "All fields are required";
    }
  }

  handleSuccessMessage(): void {
    this.successPopup = false;
    this.router.navigate(['/user/view/workout']);
  }

  navigateBack(): void {
    this.router.navigate(['/user/view/workout']);
  }
}
