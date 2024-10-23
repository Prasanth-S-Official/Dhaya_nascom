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
  id: string;
  formData: Loan = { // Use the Loan interface to type the formData object
    loanType: '',
    description: '',
    interestRate: null,
    maximumAmount: null,
    repaymentTenure: null,
    eligibility: '',
    documentsRequired: ''
  };
  errors: any = {};
  errorMessage: string;
  successPopup: boolean = false;

  constructor(private loanService: LoanService, private router: Router) {}

  ngOnInit(): void {
    // Initialize your component here
  }

  handleChange(event: any, field: string) {
    this.formData[field] = event.target.value;
    // Validate your form here and set errors if any
  }

  onSubmit(loanForm: NgForm) {
    console.log('Form Validity:', loanForm.valid);
    console.log(this.formData)
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
      loanType: '',
      description: '',
      interestRate: null,
      maximumAmount: null,
      repaymentTenure: null,
      eligibility: '',
      documentsRequired: ''
    };
  }
}
