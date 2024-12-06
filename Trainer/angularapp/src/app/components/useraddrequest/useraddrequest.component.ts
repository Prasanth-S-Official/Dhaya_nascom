import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialRequestService } from 'src/app/services/material-request.service';

@Component({
  selector: 'app-useraddrequest',
  templateUrl: './useraddrequest.component.html',
  styleUrls: ['./useraddrequest.component.css'],
})
export class UseraddrequestComponent implements OnInit {
  requestForm: FormGroup;
  successPopup = false;
  errorMessage = '';
  minDate: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private materialRequestService: MaterialRequestService
  ) {
    this.requestForm = this.fb.group({
      deliveryAddress: ['', Validators.required],
      contactNumber: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      urgencyLevel: ['', Validators.required],
      preferredDeliveryDate: ['', Validators.required],
      timeSlot: ['', Validators.required],
      comments: [''],
    });
  }

  ngOnInit(): void {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0]; // Set today's date in 'YYYY-MM-DD' format
  }

  onSubmit(): void {
    if (this.requestForm.valid) {
      const formData = this.requestForm.value;
      const userId = Number(localStorage.getItem('userId'));
      const materialId = Number(localStorage.getItem('materialId'));

      const payload: any = {
        requestDate: new Date().toISOString().split('T')[0],
        status: 'Pending',
        comments: formData.comments,
        deliveryAddress: formData.deliveryAddress,
        contactNumber: formData.contactNumber,
        quantity: formData.quantity,
        urgencyLevel: formData.urgencyLevel,
        preferredDeliveryDate: formData.preferredDeliveryDate,
        timeSlot: formData.timeSlot,
        user: { userId: userId }, // Nested user object
        material: { materialId: materialId }, // Nested material object
      };

      console.log('PayloadRequest', payload);

      this.materialRequestService.addMaterialRequest(payload).subscribe(
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
    }
  }

  handleSuccessMessage(): void {
    this.successPopup = false;
    this.router.navigate(['/user/view/materials']);
  }

  navigateBack(): void {
    this.router.navigate(['/user/view/materials']);
  }
}