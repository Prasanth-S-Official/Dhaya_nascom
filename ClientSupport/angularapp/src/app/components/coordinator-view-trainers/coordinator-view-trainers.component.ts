import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-coordinator-view-trainers',
  templateUrl: './coordinator-view-trainers.component.html',
  styleUrls: ['./coordinator-view-trainers.component.css']
})
export class CoordinatorViewTrainersComponent implements OnInit {

  allTrainers: any[] = [];
  filteredTrainers: any[] = [];
  showDeletePopup = false;
  showResumePopup = false;
  trainerToDelete: number | null = null;
  resumeImage: string | null = null;
  searchField = '';
  selectedStatus: string | null = null;
  status: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private trainerService: TrainerService) {}

  ngOnInit(): void {
    this.fetchTrainers();
  }

  fetchTrainers() {
    this.status = 'loading';
    this.trainerService.getAllTrainers().subscribe(
      (data: any) => {
        this.allTrainers = data;
        this.filteredTrainers = data;
        this.status = this.filteredTrainers.length === 0 ? 'noRecords' : '';
      },
      (error) => {
        console.error('Error fetching trainers:', error);
        this.status = 'error';
      }
    );
  }

  handleDeleteClick(trainerId: number) {
    this.trainerToDelete = trainerId;
    this.showDeletePopup = true;
  }

  handleConfirmDelete() {
    if (this.trainerToDelete) {
      this.trainerService.deleteTrainer(this.trainerToDelete).subscribe(
        () => {
          this.closeDeletePopup();
          this.fetchTrainers();
          this.errorMessage = '';
        },
        (error) => {
          console.error('Error deleting trainer:', error);
          this.errorMessage = error.error.message || 'Failed to delete trainer';
        }
      );
    }
  }

  closeDeletePopup() {
    this.trainerToDelete = null;
    this.showDeletePopup = false;
    this.errorMessage = '';
  }

  navigateToEditTrainer(id: number) {
    this.router.navigate(['/coordinator/edit/trainer', id]);
  }

  toggleTrainerStatus(trainer: any) {
    const updatedStatus = trainer.status === 'Active' ? 'Inactive' : 'Active';
    const updatedTrainer = { ...trainer, status: updatedStatus };

    this.trainerService.updateTrainer(trainer.trainerId, updatedTrainer).subscribe(
      () => {
        trainer.status = updatedStatus;
      },
      (error) => {
        console.error('Error updating trainer status:', error);
      }
    );
  }

  viewResume(resumeBase64: string) {
    this.resumeImage = resumeBase64;
    this.showResumePopup = true;
  }

  closeResumePopup() {
    this.resumeImage = null;
    this.showResumePopup = false;
  }

  applyFilters(): void {
    this.filteredTrainers = this.allTrainers.filter((trainer) => {
      const matchesSearch =
        trainer.name.toLowerCase().includes(this.searchField.toLowerCase()) ||
        trainer.expertise.toLowerCase().includes(this.searchField.toLowerCase());

      const matchesStatus = !this.selectedStatus || trainer.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });

    this.status = this.filteredTrainers.length === 0 ? 'noRecords' : '';
  }
}
