import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DriverService } from 'src/app/services/driver.service';
import { Driver } from 'src/app/models/driver.model';

@Component({
  selector: 'app-driver-management',
  templateUrl: './driver-management.component.html',
  styleUrls: ['./driver-management.component.css']
})
export class DriverManagementComponent implements OnInit {
  driverForm: FormGroup;
  successPopup = false;
  fileError = '';
  imageBase64 = '';
  id: number | null = null;
  showError = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private driverService: DriverService
  ) {
    this.driverForm = this.fb.group({
      driverName: ['', Validators.required],
      licenseNumber: ['', Validators.required],
      experienceYears: ['', Validators.required],
      contactNumber: ['', Validators.required],
      address: ['', Validators.required],
      vehicleType: ['', Validators.required],
      hourlyRate: ['', Validators.required],
      image: [''], // Base64 string
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? Number(idParam) : null;
    if (this.id) {
      this.fetchDriver(this.id);
    }
  }

  fetchDriver(id: number): void {
    this.driverService.getDriverById(id).subscribe(
      (response) => {
        this.driverForm.patchValue(response);
        this.imageBase64 = response.image || '';
      },
      () => this.router.navigate(['/error'])
    );
  }

  handleFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        this.fileError = 'Invalid file type. Only JPG, JPEG, and PNG are allowed.';
        this.imageBase64 = '';
        return;
      }

      const maxSizeInBytes = 5 * 1024 * 1024; // 5MB max size
      if (file.size > maxSizeInBytes) {
        this.fileError = 'File size exceeds the maximum limit of 5MB.';
        this.imageBase64 = '';
        return;
      }

      this.convertImageToBase64(file).then(
        (base64String) => {
          this.imageBase64 = base64String;
          this.driverForm.patchValue({
            image: base64String,
          });
          this.fileError = '';
        },
        (error) => {
          console.error('Error converting image to Base64:', error);
          this.fileError = 'Error processing the image.';
        }
      );
    }
  }

  convertImageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  onSubmit(): void {
    if (this.driverForm.invalid) {
      this.showErrorMessage();
      return;
    }

    const formData: Driver = {
      ...this.driverForm.value,
      image: this.imageBase64,
      availabilityStatus: 'Active', // Default status
    };

    if (this.id) {
      this.driverService.updateDriver(this.id, formData).subscribe(
        () => this.showSuccessPopup(),
        (error) => console.error('Error updating driver:', error)
      );
    } else {
      this.driverService.addDriver(formData).subscribe(
        () => this.showSuccessPopup(),
        (error) => console.error('Error adding driver:', error)
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
    this.router.navigate(['/admin/view/drivers']);
  }

  navigateBack(): void {
    this.router.navigate(['/admin/view/drivers']);
  }
}
