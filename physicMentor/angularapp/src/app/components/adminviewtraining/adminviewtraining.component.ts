// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { PhysicalTrainingService } from 'src/app/services/physical-training.service';

// @Component({
//   selector: 'app-adminviewtraining',
//   templateUrl: './adminviewtraining.component.html',
//   styleUrls: ['./adminviewtraining.component.css']
// })
// export class AdminviewtrainingComponent implements OnInit {
//   availableTrainings: any[] = [];
//   showDeletePopup = false;
//   trainingToDelete: string | null = null;
//   searchField = '';
//   status: string = ''; // For handling loading state
//   errorMessage: string = '';
//   allTrainings: any[] = []; // Holds the full list of training sessions

//   constructor(private router: Router, private trainingService: PhysicalTrainingService) {}

//   ngOnInit(): void {
//     this.fetchAvailableTrainings();
//   }

//   // Fetch all training sessions from the service
//   fetchAvailableTrainings() {
//     this.status = 'loading';
//     this.trainingService.getAllPhysicalTrainings().subscribe(
//       (data: any) => {
//         this.availableTrainings = data;
//         this.allTrainings = data; // Populate allTrainings with the full list
//         this.status = ''; // Clear loading state
//         console.log('Available trainings:', this.availableTrainings);
//       },
//       (error) => {
//         console.error('Error fetching trainings:', error);
//         this.status = 'error'; // Set error state
//       }
//     );
//   }

//   // Handle delete button click, open confirmation popup
//   handleDeleteClick(trainingId: string) {
//     this.trainingToDelete = trainingId;
//     this.showDeletePopup = true;
//   }

//   // Navigate to the edit page for a training session
//   navigateToEditTraining(id: string) {
//     this.router.navigate(['/admin/edit/training', id]);
//   }

//   // Confirm and delete training session
//   handleConfirmDelete() {
//     if (this.trainingToDelete) {
//       this.trainingService.deletePhysicalTraining(this.trainingToDelete).subscribe(
//         (response) => {
//           console.log('Training deleted successfully', response);
//           this.closeDeletePopup();
//           this.fetchAvailableTrainings(); // Refresh the list
//           this.errorMessage = '';
//         },
//         (error) => {
//           console.error('Error deleting training:', error);
//           this.errorMessage = error.error.message;
//         }
//       );
//     }
//   }

//   // Close the delete confirmation popup
//   closeDeletePopup() {
//     this.trainingToDelete = null;
//     this.showDeletePopup = false;
//     this.errorMessage = '';
//   }

//   // Update the displayed training sessions based on search input
//   handleSearchChange(searchValue: string): void {
//     this.searchField = searchValue;
//     if (searchValue) {
//       this.availableTrainings = this.filterTrainings(searchValue);
//     } else {
//       this.availableTrainings = this.allTrainings;
//     }
//   }

//   // Filter training sessions by name or description
//   filterTrainings(search: string) {
//     const searchLower = search.toLowerCase();
//     return this.allTrainings.filter(
//       (training) =>
//         training.trainingName.toLowerCase().includes(searchLower) ||
//         training.description.toLowerCase().includes(searchLower)
//     );
//   }
// }

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
  showDeletePopup = false;
  trainingToDelete: string | null = null;
  searchField = '';
  status: string = ''; // For handling loading state
  errorMessage: string = '';
  allTrainings: any[] = []; // Holds the full list of training sessions

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
        this.status = ''; // Clear loading state
      },
      (error) => {
        console.error('Error fetching trainings:', error);
        this.status = 'error';
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
        (response) => {
          this.closeDeletePopup();
          this.fetchAvailableTrainings();
        },
        (error) => {
          this.errorMessage = error.error.message || 'An error occurred';
        }
      );
    }
  }

  closeDeletePopup() {
    this.trainingToDelete = null;
    this.showDeletePopup = false;
    this.errorMessage = '';
  }

  handleSearchChange(searchValue: string): void {
    this.searchField = searchValue;
    if (searchValue) {
      this.availableTrainings = this.filterTrainings(searchValue);
    } else {
      this.availableTrainings = this.allTrainings;
    }
  }

  filterTrainings(search: string) {
    const searchLower = search.toLowerCase();
    return this.allTrainings.filter(
      (training) =>
        training.trainingName.toLowerCase().includes(searchLower) ||
        training.description.toLowerCase().includes(searchLower)
    );
  }
}

