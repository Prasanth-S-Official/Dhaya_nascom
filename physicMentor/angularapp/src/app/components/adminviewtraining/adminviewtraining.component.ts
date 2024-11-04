import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhysicalTrainingService } from 'src/app/services/physical-training.service';

@Component({
  selector: 'app-adminviewtraining',
  templateUrl: './adminviewtraining.component.html',
  styleUrls: ['./adminviewtraining.component.css']
})
export class AdminviewtrainingComponent implements OnInit {
  availableTrainings: any[] = [];
  allTrainings: any[] = [];
  showDeletePopup = false;
  trainingToDelete: string | null = null;
  searchField = '';
  selectedTrainingType: boolean | null = null; // Indoor/Outdoor filter
  status: string = ''; 
  errorMessage: string = '';

  constructor(private router: Router, private trainingService: PhysicalTrainingService) {}

  ngOnInit(): void {
    this.fetchAvailableTrainings();
  }

  fetchAvailableTrainings() {
    this.status = 'loading';
    this.trainingService.getAllPhysicalTrainings().subscribe(
      (data: any) => {
        this.availableTrainings = data;
        this.allTrainings = data; 
        this.status = this.availableTrainings.length === 0 ? 'noRecords' : ''; // Clear loading state or set no records state
      },
      (error) => {
        console.error('Error fetching trainings:', error);
        this.status = 'error'; // Set error state
      }
    );
  }
  
  handleDeleteClick(trainingId: string) {
    this.trainingToDelete = trainingId;
    this.showDeletePopup = true;
  }

  navigateToEditTraining(id: string) {
    this.router.navigate(['/admin/edit/training', id]);
  }

  handleConfirmDelete() {
    if (this.trainingToDelete) {
      this.trainingService.deletePhysicalTraining(this.trainingToDelete).subscribe(
        () => {
          this.closeDeletePopup();
          this.fetchAvailableTrainings(); 
          this.errorMessage = '';
        },
        (error) => {
          console.error('Error deleting training:', error);
          this.errorMessage = error.error.message;
        }
      );
    }
  }

  closeDeletePopup() {
    this.trainingToDelete = null;
    this.showDeletePopup = false;
    this.errorMessage = '';
  }

  applyFilters(): void {
    this.availableTrainings = this.allTrainings.filter(training => {
      const matchesSearch = training.trainingName.toLowerCase().includes(this.searchField.toLowerCase()) ||
                            training.description.toLowerCase().includes(this.searchField.toLowerCase());
      const matchesType = this.selectedTrainingType === null || training.isIndoor === this.selectedTrainingType;
      return matchesSearch && matchesType;
    });
    // After filtering, if there are no trainings, set the status
    if (this.availableTrainings.length === 0) {
      this.status = 'noRecords'; // Set state to no records found
    } else {
      this.status = ''; // Reset status if there are records
    }
  }
}
