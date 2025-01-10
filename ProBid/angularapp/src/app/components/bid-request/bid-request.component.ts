import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BidService } from 'src/app/services/bid.service';
import { Bid } from 'src/app/models/bid.model';

@Component({
  selector: 'app-bid-request',
  templateUrl: './bid-request.component.html',
  styleUrls: ['./bid-request.component.css'],
})
export class BidRequestComponent implements OnInit {
  bidForm: FormGroup;
  successPopup = false;
  bidId: number | null = null;
  showError = false;
  fileError = '';
  resumeBase64 = '';
  minDate: string; // Minimum allowed date for the time estimation

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private bidService: BidService
  ) {
    this.bidForm = this.fb.group({
      bidAmount: ['', [Validators.required, Validators.min(1)]],
      proposal: ['', Validators.required],
      timeEstimation: ['', Validators.required],
      communicationPreference: ['', Validators.required],
      resumeImage: [''],
      status: [''], // Added for preserving status during edit
    });
  }

  ngOnInit(): void {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0]; // Set today's date as minimum date

    const idParam = this.route.snapshot.paramMap.get('id');
    this.bidId = idParam ? Number(idParam) : null;

    if (this.bidId) {
      this.fetchBid(this.bidId);
    }
  }

  fetchBid(id: number): void {
    this.bidService.getBidById(id).subscribe(
      (response) => {
        this.bidForm.patchValue({
          ...response,
          timeEstimation: this.formatDate(response.timeEstimation), // Format date for the form
        });
        this.resumeBase64 = response.resumeImage || '';
      },
      () => this.router.navigate(['/error'])
    );
  }

  onSubmit(): void {
    if (this.bidForm.invalid) {
      this.showErrorMessage();
      return;
    }

    const formData: Bid = {
      ...this.bidForm.value,
      user: { userId: Number(localStorage.getItem('userId')) },
      project: { projectId: Number(localStorage.getItem('projectId')) },
      resumeImage: this.resumeBase64,
      submissionDate: new Date().toISOString(),
      status: this.bidId ? this.bidForm.value.status : 'Pending',
    };

    if (this.bidId) {
      this.bidService.updateBid(this.bidId, formData).subscribe(
        () => this.showSuccessPopup(),
        (error) => console.error('Error updating bid:', error)
      );
    } else {
      this.bidService.addBid(formData).subscribe(
        () => this.showSuccessPopup(),
        (error) => console.error('Error submitting bid:', error)
      );
    }
  }

  handleFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        this.fileError = 'Invalid file type. Only JPG and PNG are allowed.';
        return;
      }

      const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSizeInBytes) {
        this.fileError = 'File size exceeds the maximum limit of 5MB.';
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.resumeBase64 = (reader.result as string).split(',')[1];
        this.fileError = '';
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
        this.fileError = 'Error processing the file.';
      };
      reader.readAsDataURL(file);
    }
  }

  formatDate(date: string | Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  showErrorMessage(): void {
    this.showError = true;
    setTimeout(() => {
      this.showError = false;
    }, 3000);
  }

  showSuccessPopup(): void {
    this.successPopup = true;
  }

  handleSuccessMessage(): void {
    this.successPopup = false;
    if (this.bidId) {
      this.router.navigate(['/freelancer/my/bids']);
    } else {
      this.router.navigate(['/freelancer/view/projects']);
    }
  }

  navigateBack(): void {
    if (this.bidId) {
      this.router.navigate(['/freelancer/my/bids']);
    } else {
      this.router.navigate(['/freelancer/view/projects']);
    }
  }
}
