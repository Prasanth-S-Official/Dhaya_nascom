import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WifiSchemeRequestService } from 'src/app/services/wifi-scheme-request.service';

@Component({
  selector: 'app-useraddrequest',
  templateUrl: './useraddrequest.component.html',
  styleUrls: ['./useraddrequest.component.css'],
})
export class UseraddrequestComponent implements OnInit {
  requestForm: FormGroup;
  successPopup = false;
  errorMessage = '';
  imageError = '';
  proofBase64: string = '';
  minDate: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private wifiSchemeRequestService : WifiSchemeRequestService
  ) {
    this.requestForm = this.fb.group({
      streetName: ['', Validators.required],
      landmark: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      preferredSetupDate: ['', Validators.required],
      timeSlot: ['', Validators.required],
      comments: [''],
    });
  }

  ngOnInit(): void {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0]; // Set today's date in 'YYYY-MM-DD' format
  }

  handleFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        this.imageError = 'Invalid file type. Only JPG, PNG, and PDF are allowed.';
        this.proofBase64 = '';
        return;
      }

      const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSizeInBytes) {
        this.imageError = 'File size exceeds the maximum limit of 5MB.';
        this.proofBase64 = '';
        return;
      }

      this.convertFileToBase64(file).then(
        (base64String) => {
          this.proofBase64 = base64String;
          this.imageError = '';
        },
        (error) => {
          console.error('Error converting file to base64:', error);
          this.imageError = 'Error processing the file.';
        }
      );
    }
  }

  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  onSubmit(): void {
    if (this.requestForm.valid && this.proofBase64) {
      const formData = this.requestForm.value;
      const userId = Number(localStorage.getItem('userId'));
      const wifiSchemeId = Number(localStorage.getItem('wifiSchemeId'));
    
      const payload: any = {
        requestDate: new Date().toISOString().split('T')[0],
        status: 'Pending',
        comments: formData.comments,
        streetName: formData.streetName,
        landmark: formData.landmark,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        preferredSetupDate: formData.preferredSetupDate,
        timeSlot: formData.timeSlot,
        proof: this.proofBase64,
        user: {
          userId: userId, // Nested user object
        },
        wifiScheme: {
          wifiSchemeId: wifiSchemeId, // Nested WiFi scheme object
        },
      };
    
      console.log("PayloadRequest", payload);
    
      this.wifiSchemeRequestService.addWiFiSchemeRequest(payload).subscribe(
        (response) => {
          console.log('Request submitted successfully:', response);
          this.successPopup = true;
        },
        (error) => {
          console.error('Error submitting request:', error);
          this.errorMessage = 'Error submitting request';
        }
      );
    } else {
      this.errorMessage = 'All required fields must be filled out';
  
      // if (!this.proofBase64) {
      //   this.imageError = 'Proof document is required.';
      // }
    }
  }

  handleSuccessMessage(): void {
    this.successPopup = false;
    this.router.navigate(['/user/view/schemes']);
  }

  navigateBack(): void {
    this.router.navigate(['/user/view/schemes']);
  }
}
