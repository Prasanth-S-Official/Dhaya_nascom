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

  loanForm: FormGroup;
  successPopup = false;
  errorMessage = "";
  today = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loanService: LoanService
  ) {
    this.loanForm = this.fb.group({
      institution: ['', Validators.required],
      course: ['', Validators.required],
      tuitionFee: ['', Validators.required],
      address: ['', Validators.required],
      file: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loanForm.valid) {
      const formData = this.loanForm.value;
      const requestObject: LoanApplication = {
        loanApplicationId: 0,
        userId: Number(localStorage.getItem('userId')),
        loanId: Number(localStorage.getItem('loanId')),
        submissionDate: new Date().toISOString(),
        institution: formData.institution,
        course: formData.course,
        tuitionFee: Number(formData.tuitionFee),
        address: formData.address,
        loanStatus: 0,
        file: formData.file // Include the base64 encoded file
      };
console.log(requestObject)
      this.loanService.addLoanApplication(requestObject).subscribe(
        (response) => {
          console.log('Response:', response);
          this.successPopup = true;
        },
        (error) => {
          console.error('Error submitting loan application:', error);
          // Handle error appropriately
        }
      );
    } else {
      this.errorMessage = "All fields are required";
    }
  }

  handleFileChange(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.convertFileToBase64(file).then(
        (base64String) => {
          this.loanForm.patchValue({
            file: base64String,
          });
        },
        (error) => {
          console.error('Error converting file to base64:', error);
          // Handle error appropriately
        }
      );
    }
  }

  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result as string);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }

  handleSuccessMessage(): void {
    this.successPopup = false;
    this.router.navigate(['/user/view/viewloan']);
  }

  navigateBack(): void {
    this.router.navigate(['/user/view/viewloan']);
  }
}
