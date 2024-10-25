import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { WorkoutService } from 'src/app/services/workout.service';

@Component({
  selector: 'app-userviewworkout',
  templateUrl: './userviewworkout.component.html',
  styleUrls: ['./userviewworkout.component.css']
})
export class UserviewworkoutComponent implements OnInit {

  availableWorkouts: any[] = [];
  filteredWorkouts = [];
  searchField: string = '';
  appliedWorkouts: any[] = [];
  page: number = 1;
  limit: number = 5;

  constructor(private router: Router, private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.fetchData();
    console.log("userId", localStorage.getItem('userId'));
  }

  fetchData() {
    const userId = localStorage.getItem('userId');
  
    forkJoin({
      appliedWorkouts: this.workoutService.getAppliedWorkouts(userId),
      allWorkouts: this.workoutService.getAllWorkouts()
    }).subscribe(
      ({ appliedWorkouts, allWorkouts }: any) => {
        this.appliedWorkouts = appliedWorkouts.data; // Access the data field
        this.availableWorkouts = allWorkouts.data;   // Access the data field
        this.filteredWorkouts = allWorkouts.data;    // Access the data field for filtering
        console.log('Applied workouts:', this.appliedWorkouts);
        console.log('Available workouts:', this.availableWorkouts);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  // Handle search functionality
  handleSearchChange(searchValue: string): void {
    this.searchField = searchValue;
    this.filteredWorkouts = this.filterWorkouts(searchValue);
  }

  filterWorkouts(search: string) {
    const searchLower = search.toLowerCase();
    if (searchLower === '') return this.availableWorkouts;
    return this.availableWorkouts.filter(
      (workout) =>
        workout.workoutName.toLowerCase().includes(searchLower) ||
        workout.description.toLowerCase().includes(searchLower)
    );
  }

  // Handle Apply button click
  handleApplyClick(workout: any) {
    if (this.isWorkoutApplied(workout)) {
      alert('Workout is already applied.');
    } else {
      // Push the applied workout to the list and navigate to apply page
      this.appliedWorkouts.push(workout);
      console.log("selectedWorkout", workout); 
      localStorage.setItem('workoutId', workout._id); // Use _id from the backend data
      this.router.navigate(['/user/apply/workout']);
    }
  }

  // Check if the workout is already applied
  isWorkoutApplied(workout: any): boolean {
    // Check if the workout._id exists in the appliedWorkouts list
    return this.appliedWorkouts.some(
      (appliedWorkout) => appliedWorkout.workoutId._id === workout._id // Check using workoutId._id
    );
  }

  navigateToViewAppliedWorkout() {
    this.router.navigate(['/appliedworkout']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
