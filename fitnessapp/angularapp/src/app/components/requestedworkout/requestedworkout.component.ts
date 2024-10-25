import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkoutrequestService } from 'src/app/services/workoutrequest.service';

@Component({
  selector: 'app-requestedworkout',
  templateUrl: './requestedworkout.component.html',
  styleUrls: ['./requestedworkout.component.css']
})
export class RequestedworkoutComponent implements OnInit {

  workoutRequests: any[] = [];
  searchValue = '';
  statusFilter = '-1';  // Default to 'All'
  showModal = false;
  selectedWorkout: any = null;
  filteredWorkouts: any[] = [];

  constructor(private workoutService: WorkoutrequestService, private router: Router) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.workoutService.getAllWorkoutRequests().subscribe(
      (response: any) => {
        console.log("fetchData", response);
        this.workoutRequests = response.data;  // Access the 'data' field containing the array
        this.filteredWorkouts = [...this.workoutRequests];
        console.log('workoutRequests:', this.workoutRequests);
      },
      (error) => {
        console.error('Error fetching workout requests:', error);
      }
    );
  }

  handleSearchChange(): void {
    const searchLower = this.searchValue.toLowerCase();
    this.filteredWorkouts = this.workoutRequests.filter(request =>
      request.workoutId?.workoutName.toLowerCase().includes(searchLower)
    );
  }

  handleFilterChange(): void {
    this.filteredWorkouts = this.workoutRequests.filter(request => {
      if (this.statusFilter === '-1') {
        return true;  // Show all if 'All' is selected
      }
      return request.requestStatus === this.statusFilter;
    });
  }

  handleApprove(workoutRequest: any): void {
    this.updateWorkoutStatus(workoutRequest, 'Approved');
  }

  handleReject(workoutRequest: any): void {
    this.updateWorkoutStatus(workoutRequest, 'Rejected');
  }

  updateWorkoutStatus(workoutRequest: any, newStatus: string): void {
    this.workoutService.updateWorkoutStatus(workoutRequest._id, { ...workoutRequest, requestStatus: newStatus }).subscribe(
      (response) => {
        console.log('Response:', response);
        workoutRequest.requestStatus = newStatus;
        this.fetchData();  // Refetch data to update the UI
      },
      (error) => {
        console.error('Error updating workout status:', error);
      }
    );
  }

  handleRowExpand(index: number): void {
    const selected = this.workoutRequests[index];
    this.selectedWorkout = selected;
    this.showModal = true;
  }

  closeWorkoutDetailsModal(): void {
    this.showModal = false;
  }
}
