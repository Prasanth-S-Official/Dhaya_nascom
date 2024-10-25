import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanService } from 'src/app/services/loan.service';
import { Loan } from 'src/app/models/loan.model';

@Component({
  selector: 'app-admineditloan',
  templateUrl: './admineditloan.component.html',
  styleUrls: ['./admineditloan.component.css']
})
export class AdmineditloanComponent implements OnInit {
  id: string;
  errorMessage: string = '';
  formData: Loan = { // Updated formData object with additional fields
    LoanType: '',
    Description: '',
    InterestRate: null,
    MaximumAmount: null,
    RepaymentTenure: null,
    Eligibility: '',
    DocumentsRequired: ''
  };
  errors: any = {};
  successPopup: boolean; // Add this line to declare the successPopup property

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loanService: LoanService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getLoanById();
  }

  getLoanById() {
    this.loanService.getLoanById(this.id).subscribe(
      (response) => {
        console.log('Loan details:', response);
        this.formData = {
          LoanType: response.LoanType,
          Description: response.Description,
          InterestRate: response.InterestRate,
          MaximumAmount: response.MaximumAmount,
          RepaymentTenure: response.RepaymentTenure,
          Eligibility: response.Eligibility,
          DocumentsRequired: response.DocumentsRequired
        };
      },
      (error) => {
        console.error('Error fetching loan details:', error);
        this.router.navigate(['/error']);
      }
    );
  }

  handleChange(event: any, field: string) {
    this.formData[field] = event.target.value;
    this.errors[field] = ''; // Clear error when the user makes a change
  }

  handleUpdateLoan(loanForm: NgForm) {
    if (loanForm.valid) {
      this.loanService.updateLoan(this.id, this.formData).subscribe(
        (response) => {
          console.log('Loan updated successfully', response);
          this.successPopup = true;
          this.errorMessage = '';
        },
        (error) => {
          console.error('Error updating loan:', error);
          this.errorMessage = error.error.message;
        }
      );
    }
  }

  handleOkClick() {
    this.successPopup = false;
    this.router.navigate(['/admin/view/viewloan']);
  }

  navigateToDashboard() {
    this.router.navigate(['/admin/view/viewloan']);
  }
}
