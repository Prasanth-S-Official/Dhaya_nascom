import { Component, OnInit } from '@angular/core';
import { PhysicalTrainingService } from 'src/app/services/physical-training.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PhysicalTraining } from 'src/app/models/physical-training.model';

@Component({
  selector: 'app-adminaddtraining',
  templateUrl: './adminaddtraining.component.html',
  styleUrls: ['./adminaddtraining.component.css']
})
export class AdminaddtrainingComponent implements OnInit {
  formData: PhysicalTraining = {
    trainingName: '',
    description: '',
    trainerName: '',
    location: '',
    isIndoor: true,
    fee: null,
    focusArea: '',
    physicalRequirements: '',
  };
  errors: any = {};
  errorMessage: string;
  successPopup: boolean = false;

  constructor(private trainingService: PhysicalTrainingService, private router: Router) { }

  ngOnInit(): void {
    // Initialization logic if needed
  }

  handleChange(event: any, field: string) {
    this.formData[field] = event.target.value;
  }

  onSubmit(trainingForm: NgForm) {
    console.log('Form Validity:', trainingForm.valid);
    console.log("formdata", this.formData);
    if (trainingForm.valid) {
      this.trainingService.addPhysicalTraining(this.formData).subscribe(
        (res) => {
          this.successPopup = true;
          console.log('Training added successfully', res);
          trainingForm.resetForm();
        },
        (err) => {
          if (err.status === 500 && err.error.message === 'Training with the same name already exists') {
            this.errorMessage = 'Training with the same name already exists';
          } else {
            this.errors = err.error;
          }
          console.error('Error adding training:', err);
        }
      );
    } else {
      this.errorMessage = 'All fields are required';
    }
  }

  handleSuccessMessage() {
    this.successPopup = false;
    this.errorMessage = '';
    this.formData = {
      trainingName: '',
      description: '',
      trainerName: '',
      location: '',
      isIndoor: true,
      fee: null,
      focusArea: '',
      physicalRequirements: '',
    };
  }
}

