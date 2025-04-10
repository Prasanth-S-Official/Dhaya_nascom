import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PhysicalTrainingService } from 'src/app/services/physical-training.service';
import { PhysicalTraining } from 'src/app/models/physical-training.model';

@Component({
  selector: 'app-adminedittraining',
  templateUrl: './adminedittraining.component.html',
  styleUrls: ['./adminedittraining.component.css']
})
export class AdminedittrainingComponent implements OnInit {
  id: string;
  errorMessage: string = '';
  formData: PhysicalTraining = { 
    trainingName: '',
    description: '',
    trainerName: '',
    location: '',
    isIndoor: null,
    fee: null,
    focusArea: '',
    physicalRequirements: '',
  };
  errors: any = {};
  successPopup: boolean = false;

  focusAreas: string[] = [
    'Strength Training',
    'Cardio',
    'Yoga',
    'Pilates',
    'Martial Arts',
    'CrossFit',
    'Dance',
    'Zumba',
    'Swimming',
    'Cycling',
    'Kickboxing',
    'Bodybuilding',
    'Athletic Conditioning',
    'Functional Training',
    'Resistance Training',
    'High-Intensity Interval Training (HIIT)',
    'Core Stability'
  ];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trainingService: PhysicalTrainingService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getTrainingById();
  }

  getTrainingById() {
    this.trainingService.getPhysicalTrainingById(this.id).subscribe(
      (response) => {
        console.log('Training details:', response);
        this.formData = { ...response };
      },
      (error) => {
        console.error('Error fetching training details:', error);
        this.router.navigate(['/error']);
      }
    );
  }

  handleChange(event: any, field: string) {
    if (field === 'isIndoor') {
      this.formData.isIndoor = event.target.value === 'true';
    } else {
      this.formData[field] = event.target.value;
    }
    this.errors[field] = ''; // Clear error when the user makes a change
  }
  
  handleUpdateTraining(trainingForm: NgForm) {
    if (trainingForm.valid) {
      console.log("Updating", this.formData);
      this.trainingService.updatePhysicalTraining(this.id, this.formData).subscribe(
        (response) => {
          console.log('Training updated successfully', response);
          this.successPopup = true;
          this.errorMessage = '';
        },
        (error) => {
          console.error('Error updating training:', error);
          this.errorMessage = error.error.message || 'An error occurred';
        }
      );
    } else {
      this.errorMessage = 'All fields are required';
    }
  }

  handleOkClick() {
    this.successPopup = false;
    this.router.navigate(['/admin/view/trainings']);
  }

  navigateToDashboard() {
    this.router.navigate(['/admin/view/trainings']);
  }
}
