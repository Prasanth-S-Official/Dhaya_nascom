import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhysicalTrainingService } from 'src/app/services/physical-training.service';

@Component({
  selector: 'app-adminviewtraining',
  templateUrl: './adminviewtraining.component.html',
  styleUrls: ['./adminviewtraining.component.css']
})
export class AdminviewtrainingComponent implements OnInit {
  availableTrainings: any[] = [];  // List of trainings that will be displayed
  allTrainings: any[] = [];         // Full list of trainings fetched from the server
  showDeletePopup = false;          // Controls the visibility of the delete confirmation popup
  trainingToDelete: string | null = null;  // ID of the training to delete
  searchField = '';                  // Search field input value
  selectedTrainingType: boolean | null = null; // Filter type (Indoor/Outdoor)
  status: string = '';               // Status for loading, error, or no records
  errorMessage: string = '';         // Error message for delete operation

  constructor(private router: Router, private trainingService: PhysicalTrainingService) {}

  ngOnInit(): void {
    this.fetchAvailableTrainings(); // Fetch trainings on component initialization
  }

  fetchAvailableTrainings() {
    this.status = 'loading'; // Set loading status
    this.trainingService.getAllPhysicalTrainings().subscribe(
      (data: any) => {
        console.log("data",data);
        this.availableTrainings = data; // Set the available trainings from the response
        this.allTrainings = data;        // Keep a copy of all trainings for filtering
        this.status = this.availableTrainings.length === 0 ? 'noRecords' : ''; // Update status
      },
      (error) => {
        console.error('Error fetching trainings:', error);
        this.status = 'error'; // Set error status
      }
    );
  }
  
  handleDeleteClick(trainingId: string) {
    this.trainingToDelete = trainingId;
    this.showDeletePopup = true; // Show the delete confirmation popup
  }

  navigateToEditTraining(id: string) {
    this.router.navigate(['/admin/edit/training', id]); // Navigate to edit page
  }

  handleConfirmDelete() {
    if (this.trainingToDelete) {
      this.trainingService.deletePhysicalTraining(this.trainingToDelete).subscribe(
        () => {
          this.closeDeletePopup(); // Close popup after deletion
          this.fetchAvailableTrainings(); // Refresh trainings after deletion
          this.errorMessage = ''; // Clear any error messages
        },
        (error) => {
          console.error('Error deleting training:', error);
          this.errorMessage = error.error.message; // Set error message
        }
      );
    }
  }

  closeDeletePopup() {
    this.trainingToDelete = null; // Reset training to delete
    this.showDeletePopup = false; // Hide the delete popup
    this.errorMessage = ''; // Clear error message
  }

  applyFilters(): void {
    // Log the current selected training type to confirm the value
    console.log("Selected Training Type:", this.selectedTrainingType);
  
    this.availableTrainings = this.allTrainings.filter(training => {
      const matchesSearch = training.trainingName.toLowerCase().includes(this.searchField.toLowerCase()) ||
                            training.description.toLowerCase().includes(this.searchField.toLowerCase());
  
      // Cast selectedTrainingType to 'any' to handle both boolean and string values
      const isAllOption = this.selectedTrainingType === null || (this.selectedTrainingType as any) === '';
      const matchesType = isAllOption || (this.selectedTrainingType === true && training.isIndoor) || (this.selectedTrainingType === false && !training.isIndoor);
  
      return matchesSearch && matchesType;
    });
  
    // Set the status to "noRecords" if no matching records are found
    this.status = this.availableTrainings.length === 0 ? 'noRecords' : '';
  }
  
  
}
