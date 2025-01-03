import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DriverRequestService } from 'src/app/services/driver-request.service';
import { DriverRequest } from 'src/app/models/driver-request.model';

@Component({
  selector: 'app-customer-request',
  templateUrl: './customer-request.component.html',
  styleUrls: ['./customer-request.component.css']
})
export class CustomerRequestComponent implements OnInit {
  requestForm: FormGroup;
  successPopup = false;
  requestId: number | null = null;
  showError = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private driverRequestService: DriverRequestService
  ) {
    this.requestForm = this.fb.group({
      pickupLocation: ['', Validators.required],
      dropLocation: ['', Validators.required],
      tripDate: ['', Validators.required],
      timeSlot: ['', Validators.required],
      estimatedDuration: ['', Validators.required],
      comments: [''],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.requestId = idParam ? Number(idParam) : null;

    if (this.requestId) {
      this.fetchRequest(this.requestId);
    }
  }

  fetchRequest(id: number): void {
    this.driverRequestService.getDriverRequestById(id).subscribe(
      (response) => this.requestForm.patchValue(response),
      () => this.router.navigate(['/error'])
    );
  }

  onSubmit(): void {
    if (this.requestForm.invalid) {
      this.showErrorMessage();
      return;
    }

    const formData: DriverRequest = {
      ...this.requestForm.value,
      userId: Number(localStorage.getItem('userId')), // Add the user ID from local storage
      status: this.requestId ? undefined : 'Pending', // Default to "Pending" for new requests
    };

    if (this.requestId) {
      this.driverRequestService.updateDriverRequest(this.requestId, formData).subscribe(
        () => this.showSuccessPopup(),
        (error) => console.error('Error updating driver request:', error)
      );
    } else {
      this.driverRequestService.addDriverRequest(formData).subscribe(
        () => this.showSuccessPopup(),
        (error) => console.error('Error submitting driver request:', error)
      );
    }
  }

  showErrorMessage(): void {
    this.showError = true;
    setTimeout(() => {
      this.showError = false;
    }, 3000); // Hide error message after 3 seconds
  }

  showSuccessPopup(): void {
    this.successPopup = true;
  }

  handleSuccessMessage(): void {
    this.successPopup = false;
    this.router.navigate(['/customer/view/requests']);
  }

  navigateBack(): void {
    this.router.navigate(['/customer/view/requests']);
  }
}
