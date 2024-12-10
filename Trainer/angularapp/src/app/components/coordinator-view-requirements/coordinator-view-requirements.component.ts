import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { RequirementService } from 'src/app/services/requirement.service';
import { TrainerService } from 'src/app/services/trainer.service';
import { Requirement } from 'src/app/models/requirement.model';
import { Trainer } from 'src/app/models/trainer.model';

@Component({
  selector: 'app-coordinator-view-requirements',
  templateUrl: './coordinator-view-requirements.component.html',
  styleUrls: ['./coordinator-view-requirements.component.css']
})
export class CoordinatorViewRequirementsComponent implements OnInit {

  availableRequirements: Requirement[] = [];
  filteredRequirements: Requirement[] = [];
  allTrainers: Trainer[] = [];
  searchField: string = '';
  searchTrainerField: string = ''; // For searching trainers in modal
  showModal: boolean = false;
  selectedRequirement: Requirement | null = null;

  constructor(
    private router: Router,
    private requirementService: RequirementService,
    private trainerService: TrainerService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    forkJoin({
      allRequirements: this.requirementService.getAllRequirements(),
      allTrainers: this.trainerService.getAllTrainers(),
    }).subscribe(
      ({ allRequirements, allTrainers }) => {
        // Map backend trainer object to trainerId in the frontend requirements
        this.availableRequirements = allRequirements.map((requirement: any) => {
          return {
            ...requirement,
            trainerId: requirement.trainer?.trainerId || null, // Extract trainerId from trainer
          };
        });
        this.filteredRequirements = this.availableRequirements;
        this.allTrainers = allTrainers.filter((trainer) => trainer.status === 'Active'); // Filter active trainers only
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  handleSearchChange(searchValue: string): void {
    this.searchField = searchValue;
    this.filteredRequirements = this.filterRequirements(searchValue);
  }

  filterRequirements(search: string): Requirement[] {
    const searchLower = search.toLowerCase();
    return this.availableRequirements.filter(
      (requirement) =>
        requirement.title.toLowerCase().includes(searchLower) ||
        requirement.department.toLowerCase().includes(searchLower)
    );
  }

  openAssignTrainerModal(requirement: Requirement): void {
    this.selectedRequirement = requirement;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedRequirement = null;
    this.searchTrainerField = ''; // Reset the trainer search field when closing the modal
  }

  assignTrainer(requirement: Requirement, trainer: Trainer): void {
    const updatedRequirement = {
      ...requirement,
      trainer: { trainerId: trainer.trainerId }, // Include the nested trainer object for backend
    };

    this.requirementService.updateRequirement(requirement.requirementId, updatedRequirement).subscribe(
      () => {
        this.fetchData(); // Refresh data to update the view
        this.closeModal();
      },
      (error) => {
        console.error('Error assigning trainer:', error);
      }
    );
  }

  getAvailableTrainers(): Trainer[] {
    // Filter trainers based on search input
    const searchLower = this.searchTrainerField.toLowerCase();
    return this.allTrainers
      .filter(
        (trainer) =>
          !this.availableRequirements.some(
            (requirement) => requirement.trainerId === trainer.trainerId
          )
      )
      .filter(
        (trainer) =>
          trainer.name.toLowerCase().includes(searchLower) ||
          trainer.expertise.toLowerCase().includes(searchLower)
      );
  }

  getTrainerName(requirement: Requirement): string {
    const trainer = (requirement as any).trainer; // Use `as any` to bypass the type error
    return trainer
      ? `${trainer.name} (${trainer.expertise})`
      : 'Not Assigned';
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
