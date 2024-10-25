import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkoutrequestService } from 'src/app/services/workoutrequest.service';

@Component({
  selector: 'app-userappliedworkout',
  templateUrl: './userappliedworkout.component.html',
  styleUrls: ['./userappliedworkout.component.css']
})
export class UserappliedworkoutComponent implements OnInit {

  showDeletePopup = false;
  workoutToDelete: any = null;
  appliedWorkouts: any[] = [];
  filteredWorkouts: any[] = [];
  searchValue = '';
  page = 1;
  limit = 5;
  maxRecords = 1;

  constructor(private workoutRequestService: WorkoutrequestService, private router: Router) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    const userId = localStorage.getItem('userId');
    this.workoutRequestService.getAppliedWorkouts(userId).subscribe(
      (response: any) => {
        this.appliedWorkouts = response.data; // Ensure 'data' field is accessed
        this.filteredWorkouts = [...this.appliedWorkouts];
        this.maxRecords = this.filteredWorkouts.length;
        console.log('Applied workouts:', this.appliedWorkouts);
      },
      (error) => {
        console.error('Error fetching applied workouts:', error);
      }
    );
  }

  filterWorkouts(): void {
    const searchLower = this.searchValue.toLowerCase();
    if (searchLower === '') {
      this.filteredWorkouts = [...this.appliedWorkouts];
    } else {
      this.filteredWorkouts = this.appliedWorkouts.filter(workout =>
        workout.workoutId && workout.workoutId.workoutName.toLowerCase().includes(searchLower)
      );
    }
    this.maxRecords = this.filteredWorkouts.length;
  }

  handleDeleteClick(workout: any): void {
    this.workoutToDelete = workout;
    this.showDeletePopup = true;
  }

  handleConfirmDelete(): void {
    if (this.workoutToDelete && this.workoutToDelete._id) {
      this.workoutRequestService.deleteWorkoutApplication(this.workoutToDelete._id).subscribe(
        () => {
          console.log('Workout deleted successfully');
          this.fetchData();
          this.closeDeletePopup();
        },
        (error) => {
          console.error('Error deleting workout:', error);
        }
      );
    }
  }

  closeDeletePopup(): void {
    this.workoutToDelete = null;
    this.showDeletePopup = false;
  }
}
