import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutService } from 'src/app/services/workout.service';
import { Workout } from 'src/app/models/workout.model';

@Component({
  selector: 'app-admineditworkout',
  templateUrl: './admineditworkout.component.html',
  styleUrls: ['./admineditworkout.component.css']
})
export class AdmineditworkoutComponent implements OnInit {
  id: string;
  errorMessage: string = '';
  formData: Workout = {
    workoutName: '',
    description: '',
    difficultyLevel: 0,
    createdAt: '',
    targetArea: '',
    daysPerWeek: 0,
    averageWorkoutDurationInMinutes: 0
  };
  errors: any = {};
  successPopup: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workoutService: WorkoutService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getWorkoutById();
  }

  getWorkoutById() {
    this.workoutService.getWorkoutById(this.id).subscribe(
      (response) => {
        console.log('Workout details:', response);
        this.formData = {
          workoutName: response.workoutName,
          description: response.description,
          difficultyLevel: response.difficultyLevel,
          createdAt: response.createdAt,
          targetArea: response.targetArea,
          daysPerWeek: response.daysPerWeek,
          averageWorkoutDurationInMinutes: response.averageWorkoutDurationInMinutes,
        };
      },
      (error) => {
        console.error('Error fetching workout details:', error);
        this.router.navigate(['/error']);
      }
    );
  }

  handleChange(event: any, field: string) {
    this.formData[field] = event.target.value;
    this.errors[field] = ''; // Clear error when the user makes a change
  }

  handleUpdateWorkout(workoutForm: NgForm) {
    if (workoutForm.valid) {
      this.workoutService.updateWorkout(this.id, this.formData).subscribe(
        (response) => {
          console.log('Workout updated successfully', response);
          this.successPopup = true;
          this.errorMessage = '';
        },
        (error) => {
          console.error('Error updating workout:', error);
          this.errorMessage = error.error.message || 'Error updating workout';
        }
      );
    }
  }

  handleOkClick() {
    this.successPopup = false;
    this.router.navigate(['/admin/view/workout']);
  }

  navigateToDashboard() {
    this.router.navigate(['/admin/view/workout']);
  }
}
