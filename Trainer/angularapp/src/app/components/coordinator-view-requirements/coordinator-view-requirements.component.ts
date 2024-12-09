import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { RequirementService } from 'src/app/services/requirement.service';
import { Requirement } from 'src/app/models/requirement.model';

@Component({
  selector: 'app-coordinator-view-requirements',
  templateUrl: './coordinator-view-requirements.component.html',
  styleUrls: ['./coordinator-view-requirements.component.css']
})
export class CoordinatorViewRequirementsComponent implements OnInit {

  availableRequirements: Requirement[] = [];
  filteredRequirements: Requirement[] = [];
  assignedRequirements: any[] = [];
  searchField: string = '';

  constructor(
    private router: Router,
    private requirementService: RequirementService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    const coordinatorId = Number(localStorage.getItem('userId'));

    forkJoin({
      assignedRequirements: this.requirementService.getRequirementsByCoordinatorId(coordinatorId),
      allRequirements: this.requirementService.getAllRequirements(),
    }).subscribe(
      ({ assignedRequirements, allRequirements }) => {
        this.assignedRequirements = assignedRequirements || [];
        this.availableRequirements = allRequirements;
        this.filteredRequirements = this.availableRequirements;
        console.log('Assigned requirements:', this.assignedRequirements);
        console.log('Available requirements:', this.availableRequirements);
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
    if (this.isRequirementAssigned(requirement)) {
      alert('Trainer is already assigned for this requirement.');
    } else {
      localStorage.setItem('requirementId', requirement.requirementId.toString());
      this.router.navigate(['/coordinator/assign/trainer']);
    }
  }

  isRequirementAssigned(requirement: Requirement): boolean {
    if (!this.assignedRequirements) return false;

    return this.assignedRequirements.some(
      (assigned) => assigned.requirement.requirementId === requirement.requirementId
    );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}