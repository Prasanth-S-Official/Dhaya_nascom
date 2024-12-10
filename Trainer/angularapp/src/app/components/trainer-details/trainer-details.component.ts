import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer-details',
  templateUrl: './trainer-details.component.html',
  styleUrls: ['./trainer-details.component.css']
})
export class TrainerDetailsComponent implements OnInit {
  trainer: any = null;
  isLoading: boolean = true;
  errorMessage: string = '';
  showResumePopup: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trainerService: TrainerService
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
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load trainer details.';
        this.isLoading = false;
      }
    );
  }

  viewResume(): void {
    this.showResumePopup = true;
  }

  closeResumePopup(): void {
    this.showResumePopup = false;
  }
}
