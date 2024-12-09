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
        this.allTrainers = allTrainers;
        console.log('Available requirements:', this.availableRequirements);
        console.log('Available trainers:', this.allTrainers);
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

  handleAssignClick(requirement: Requirement): void {
    const trainerId = this.selectTrainer(requirement);
    if (trainerId) {
      const updatedRequirement = { ...requirement, trainerId };

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
    } else {
      alert('No available trainers to assign.');
    }
  }

  selectTrainer(requirement: Requirement): number | null {
    // Logic to select an available trainer based on expertise, or assign the first one
    const suitableTrainer = this.allTrainers.find(
      (trainer) => trainer.expertise.toLowerCase().includes(requirement.skillLevel.toLowerCase()) && trainer.status === 'Active'
    );

    return suitableTrainer ? suitableTrainer.trainerId : null;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
