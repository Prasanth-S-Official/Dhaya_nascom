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
      status: [''], // Added to preserve status on edit
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
      (response) => {
        const requestData = {
          ...response,
          tripDate: this.formatDate(response.tripDate),
          timeSlot: this.extractTime((response as any).timeSlot as [number, number]),
          userId: (response as any).user.userId,
          driverId: (response as any).driver?.driverId,
        };
        this.requestForm.patchValue(requestData);
      },
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
      tripDate: new Date(this.requestForm.value.tripDate),
      timeSlot: this.convertToTimeArray(this.requestForm.value.timeSlot),
      user: {
        userId: Number(localStorage.getItem('userId')),
      },
      driver: {
        driverId: Number(localStorage.getItem('driverId')),
      },
      status: this.requestId ? this.requestForm.value.status : 'Pending', // Preserve existing status or set to Pending
      requestDate: new Date(),
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

  extractTime(timeArray: [number, number]): string {
    const hours = String(timeArray[0]).padStart(2, '0');
    const minutes = String(timeArray[1]).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  convertToTimeArray(time: string): [number, number] {
    const [hours, minutes] = time.split(':').map(Number);
    return [hours, minutes];
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

    // Navigate based on whether it's an edit or a new request
    if (this.requestId) {
      this.router.navigate(['/customer/my/requests']);
    } else {
      this.router.navigate(['/customer/view/drivers']);
    }
  }

  navigateBack(): void {
    if (this.requestId) {
      this.router.navigate(['/customer/my/requests']);
    } else {
      this.router.navigate(['/customer/view/drivers']);
    }
  }
}
