import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequirementService } from 'src/app/services/requirement.service';

@Component({
  selector: 'app-selected-trainers',
  templateUrl: './selected-trainers.component.html',
  styleUrls: ['./selected-trainers.component.css']
})
export class SelectedTrainersComponent implements OnInit {

  closedRequirements: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private requirementService: RequirementService ,  private router: Router) {}

  ngOnInit(): void {
    this.fetchClosedRequirements();
  }

  fetchClosedRequirements(): void {
    this.requirementService.getAllRequirements().subscribe(
      (requirements: any[]) => {
        // Filter requirements with status 'Closed' and with associated trainers
        this.closedRequirements = requirements.filter(
          (req) => req.status === 'Closed' && req.trainer
        );
        this.isLoading = false;
      },
      (error) => {
        console.error('Failed to fetch requirements:', error);
        this.errorMessage = 'Failed to load trainers.';
        this.isLoading = false;
      }
    );
  }

  writeReview(trainerId: number): void {
    this.router.navigate(['/manager/add/feedback'], { queryParams: { trainerId } });
  }
}