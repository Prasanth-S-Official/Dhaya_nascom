import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PhysicalTrainingService } from 'src/app/services/physical-training.service';
import { PhysicalTraining } from 'src/app/models/physical-training.model';

@Component({
  selector: 'app-userviewtraining',
  templateUrl: './userviewtraining.component.html',
  styleUrls: ['./userviewtraining.component.css']
})
export class UserviewtrainingComponent implements OnInit {
  availableTrainings: PhysicalTraining[] = [];
  filteredTrainings: PhysicalTraining[] = [];
  appliedTrainings: any[] = [];
  searchField: string = '';
  page: number = 1;
  limit: number = 5;

  constructor(private router: Router, private trainingService: PhysicalTrainingService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    const userId = localStorage.getItem('userId');
    
    forkJoin({
      appliedTrainings: this.trainingService.getPhysicalTrainingRequestsByUserId(userId),
      allTrainings: this.trainingService.getAllPhysicalTrainings()
    }).subscribe(
      ({ appliedTrainings, allTrainings }) => {
        this.appliedTrainings = appliedTrainings;
        this.availableTrainings = allTrainings;
        this.filteredTrainings = this.availableTrainings;
        console.log('Applied trainings:', this.appliedTrainings);
        console.log('Available trainings:', this.availableTrainings);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  handleSearchChange(searchValue: string): void {
    this.searchField = searchValue;
    this.filteredTrainings = this.filterTrainings(searchValue);
  }

  filterTrainings(search: string): PhysicalTraining[] {
    const searchLower = search.toLowerCase();
    return this.availableTrainings.filter(
      (training) =>
        training.trainingName.toLowerCase().includes(searchLower) ||
        training.description.toLowerCase().includes(searchLower) ||
        training.focusArea.toLowerCase().includes(searchLower)
    );
  }

  handleApplyClick(training: PhysicalTraining) {
    const isTrainingApplied = this.isTrainingApplied(training);
    if (isTrainingApplied) {
      alert('Training is already applied.');
    } else {
      localStorage.setItem('trainingId', training.physicalTrainingId.toString());
      this.router.navigate(['/user/add/request']);
    }
  }

  isTrainingApplied(training: PhysicalTraining): boolean {
    return this.appliedTrainings.some(
      (appliedTraining) => appliedTraining.physicalTraining.physicalTrainingId === training.physicalTrainingId
    );
  }

  navigateToViewAppliedTrainings() {
    this.router.navigate(['/user/view/applied-requests']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
