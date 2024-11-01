import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhysicalTrainingService } from 'src/app/services/physical-training.service';
import { Router } from '@angular/router';
import { PhysicalTrainingRequest } from 'src/app/models/physical-training-request.model';

@Component({
  selector: 'app-useraddrequest',
  templateUrl: './useraddrequest.component.html',
  styleUrls: ['./useraddrequest.component.css']
})
export class UseraddrequestComponent implements OnInit {

  requestForm: FormGroup;
  successPopup = false;
  errorMessage = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private trainingService: PhysicalTrainingService
  ) {
    // Initializing form group with fields matching the model
    this.requestForm = this.fb.group({
      healthConditions: ['', Validators.required],     // Health conditions
      fitnessGoals: ['', Validators.required],         // Fitness goals
      comments: [''],                                  // Additional comments
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.requestForm.valid) {
      const formData = this.requestForm.value;
      const requestObject: PhysicalTrainingRequest = {
        UserId: Number(localStorage.getItem('userId')),
        PhysicalTrainingId: Number(localStorage.getItem('trainingId')),
        RequestDate: new Date().toISOString().split('T')[0],
        Status: 'Pending', // Default status
        HealthConditions: formData.healthConditions,
        FitnessGoals: formData.fitnessGoals,
        Comments: formData.comments,
      };

      this.trainingService.addPhysicalTrainingRequest(requestObject).subscribe(
        (response) => {
          console.log('Response:', response);
          this.successPopup = true;
        },
        (error) => {
          console.error('Error submitting request:', error);
          this.errorMessage = 'Error submitting request';
        }
      );
    } else {
      this.errorMessage = "All required fields must be filled out";
    }
  }

  handleSuccessMessage(): void {
    this.successPopup = false;
    this.router.navigate(['/user/view/trainings']);
  }

  navigateBack(): void {
    this.router.navigate(['/user/view/trainings']);
  }
}
