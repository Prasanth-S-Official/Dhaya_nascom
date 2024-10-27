import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanService } from 'src/app/services/loan.service';
import { Router } from '@angular/router';
import { LoanApplication } from 'src/app/models/loanapplication.model';

@Component({
  selector: 'app-loanform',
  templateUrl: './loanform.component.html',
  styleUrls: ['./loanform.component.css']
})
export class LoanformComponent implements OnInit {

  // loanForm: FormGroup;
  // successPopup = false;
  // errorMessage = "";
  // today = new Date().toISOString().split('T')[0];

  // constructor(
  //   private fb: FormBuilder,
  //   private router: Router,
  //   private loanService: LoanService // Inject your loan service
  // ) {
  //   // Updated form group to reflect LoanApplication model
  //   this.loanForm = this.fb.group({
  //     farmLocation: ['', Validators.required],      // Farm location field
  //     farmerAddress: ['', Validators.required],     // Farmer address field
  //     farmSizeInAcres: ['', Validators.required],   // Farm size field
  //     farmPurpose: ['', Validators.required],       // Farm purpose field
  //     file: [null, Validators.required],            // File input
  //   });
  // }

  ngOnInit(): void {}

  // onSubmit(): void {
  //   if (this.loanForm.valid) {
  //     const formData = this.loanForm.value;
  //     const requestObject: LoanApplication = {
  //       UserId: Number(localStorage.getItem('userId')),
  //       LoanId: Number(localStorage.getItem('loanId')),
  //       SubmissionDate: new Date().toISOString(),
  //       LoanStatus: 0, // Default to pending status
  //       FarmLocation: formData.farmLocation,
  //       FarmerAddress: formData.farmerAddress,
  //       FarmSizeInAcres: Number(formData.farmSizeInAcres),
  //       FarmPurpose: formData.farmPurpose,
  //       File: formData.file, // Base64-encoded file
  //     };

  //     this.loanService.addLoanApplication(requestObject).subscribe(
  //       (response) => {
  //         console.log('Response:', response);
  //         this.successPopup = true;
  //       },
  //       (error) => {
  //         console.error('Error submitting loan application:', error);
  //         this.errorMessage = 'Error submitting loan application';
  //       }
  //     );
  //   } else {
  //     this.errorMessage = "All fields are required";
  //   }
  // }

  // handleFileChange(event: any): void {
  //   const file = event.target.files[0];

  //   if (file) {
  //     this.convertFileToBase64(file).then(
  //       (base64String) => {
  //         this.loanForm.patchValue({
  //           file: base64String,
  //         });
  //       },
  //       (error) => {
  //         console.error('Error converting file to base64:', error);
  //       }
  //     );
  //   }
  // }

  // convertFileToBase64(file: File): Promise<string> {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = () => resolve(reader.result as string);
  //     reader.onerror = (error) => reject(error);
  //     reader.readAsDataURL(file);
  //   });
  // }

  // handleSuccessMessage(): void {
  //   this.successPopup = false;
  //   this.router.navigate(['/user/view/viewloan']);
  // }

  // navigateBack(): void {
  //   this.router.navigate(['/user/view/viewloan']);
  // }
}
