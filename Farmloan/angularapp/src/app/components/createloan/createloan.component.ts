import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/app/services/loan.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Loan } from 'src/app/models/loan.model';

@Component({
  selector: 'app-createloan',
  templateUrl: './createloan.component.html',
  styleUrls: ['./createloan.component.css'],
})
export class CreateloanComponent implements OnInit {
  formData: Loan = {
    LoanType: '',
    Description: '',
    InterestRate: null,
    MaximumAmount: null,
    RepaymentTenure: null,  // New field added
    Eligibility: '',         // New field added
    DocumentsRequired: ''    // New field added
  };
  errors: any = {};
  errorMessage: string;
  successPopup: boolean = false;

  constructor(private loanService: LoanService, private router: Router) {}

  ngOnInit(): void {
    // Initialization logic if needed
  }

  handleChange(event: any, field: string) {
    this.formData[field] = event.target.value;
    // Validate your form here and set errors if any
  }

  onSubmit(loanForm: NgForm) {
    console.log('Form Validity:', loanForm.valid);
    if (loanForm.valid) {
      this.loanService.addLoan(this.formData).subscribe(
        (res) => {
          this.successPopup = true;
          console.log('Loan added successfully', res);
          loanForm.resetForm();
        },
        (err) => {
          if (err.status === 500 && err.error.message === 'Loan with the same type already exists') {
            this.errorMessage = 'Loan with the same type already exists';
          } else {
            this.errors = err.error;
          }
          console.error('Error adding loan:', err);
        }
      );
    } else {
      this.errorMessage = 'All fields are required';
    }
  }

  handleSuccessMessage() {
    this.successPopup = false;
    this.errorMessage = '';
    this.formData = {
      LoanType: '',
      Description: '',
      InterestRate: null,
      MaximumAmount: null,
      RepaymentTenure: null,  // Reset new field
      Eligibility: '',         // Reset new field
      DocumentsRequired: ''    // Reset new field
    };
  }
}
