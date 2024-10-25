import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Workout } from 'src/app/models/workout.model';
import { WorkoutService } from 'src/app/services/workout.service';

@Component({
  selector: 'app-adminaddworkout',
  templateUrl: './adminaddworkout.component.html',
  styleUrls: ['./adminaddworkout.component.css']
})
export class AdminaddworkoutComponent implements OnInit {

  formData: Workout = {
    workoutName: '',
    description: '',
    difficultyLevel: 0,
    targetArea: '',
    daysPerWeek: 0,
    averageWorkoutDurationInMinutes: 0
  };
  errorMessage: string = '';
  successPopup: boolean = false;

  constructor(private workoutService: WorkoutService, private router: Router) {}

  ngOnInit(): void {}

  handleChange(event: any, field: string) {
    this.formData[field] = event.target.value;
  }

  onSubmit(workoutForm: NgForm) {
    if (workoutForm.valid) {
      this.workoutService.addWorkout(this.formData).subscribe(
        (res) => {
          this.successPopup = true;
          workoutForm.resetForm();
        },
        (err) => {
          this.errorMessage = err.error.message || 'An error occurred while adding the workout.';
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
      workoutName: '',
      description: '',
      difficultyLevel: 0,
      targetArea: '',
      daysPerWeek: 0,
      averageWorkoutDurationInMinutes: 0
    };
  }
}
