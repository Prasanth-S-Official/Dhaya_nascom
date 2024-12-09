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
        this.availableRequirements = allRequirements;
        this.filteredRequirements = this.availableRequirements;
        this.allTrainers = allTrainers.filter((trainer) => trainer.status === 'Active'); // Filter active trainers only
        console.log("requirement",allRequirements);
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

  handleTrainerAssign(requirement: Requirement): void {
    if (!requirement.trainerId) {
      return;
    }

    const updatedRequirement = { ...requirement };

    this.requirementService.updateRequirement(requirement.requirementId, updatedRequirement).subscribe(
      () => {
        alert('Trainer assigned successfully.');
        this.fetchData(); // Refresh data after assignment
      },
      (error) => {
        console.error('Error assigning trainer:', error);
        alert('Error assigning trainer.');
      }
    );
  }

  isTrainerAssigned(trainerId: number): boolean {
    return this.availableRequirements.some(
      (requirement) => requirement.trainerId === trainerId
    );
  }

  get availableTrainers(): Trainer[] {
    return this.allTrainers.filter(
      (trainer) => !this.isTrainerAssigned(trainer.trainerId)
    );
  }

  navigateToProgress(requirement: Requirement): void {
    this.router.navigate(['/coordinator/progress', requirement.requirementId]);
  }
}
