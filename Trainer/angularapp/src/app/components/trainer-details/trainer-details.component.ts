import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainerService } from 'src/app/services/trainer.service';
import { RequirementService } from 'src/app/services/requirement.service';

@Component({
  selector: 'app-trainer-details',
  templateUrl: './trainer-details.component.html',
  styleUrls: ['./trainer-details.component.css']
})
export class TrainerDetailsComponent implements OnInit {
  trainer: any = null;
  requirement: any = null;
  isLoading: boolean = true;
  errorMessage: string = '';
  showResumePopup: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trainerService: TrainerService,
    private requirementService: RequirementService
  ) {}

  ngOnInit(): void {
    const trainerId = this.route.snapshot.paramMap.get('trainerId');
    if (trainerId) {
      this.fetchTrainerDetails(Number(trainerId));
    } else {
      this.errorMessage = 'Invalid trainer ID';
      this.isLoading = false;
    }
  }

  fetchTrainerDetails(trainerId: number): void {
    this.trainerService.getTrainerById(trainerId).subscribe(
      (data: any) => {
        this.trainer = data;
        this.fetchAssociatedRequirement(data.trainerId);
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load trainer details.';
        this.isLoading = false;
      }
    );
  }

  fetchAssociatedRequirement(trainerId: number): void {
    this.requirementService.getRequirementsByTrainerId(trainerId).subscribe(
      (requirements: any[]) => {
        this.requirement = requirements.find(req => req.status === 'Open') || null;
      },
      (error) => {
        console.error('Failed to load associated requirement:', error);
      }
    );
  }

  viewResume(): void {
    this.showResumePopup = true;
  }

  closeResumePopup(): void {
    this.showResumePopup = false;
  }

  acceptRequirement(requirementId: number): void {
    const updatedRequirement = { ...this.requirement, status: 'Closed' };
    this.requirementService.updateRequirement(requirementId, updatedRequirement).subscribe(
      () => {
        this.requirement.status = 'Closed';
      },
      (error) => {
        console.error('Error accepting requirement:', error);
      }
    );
  }

  rejectRequirement(requirementId: number): void {
    const updatedRequirement = { ...this.requirement, trainer: null };
    this.requirementService.updateRequirement(requirementId, updatedRequirement).subscribe(
      () => {
        this.requirement.trainer = null;
      },
      (error) => {
        console.error('Error rejecting requirement:', error);
      }
    );
  }
}
