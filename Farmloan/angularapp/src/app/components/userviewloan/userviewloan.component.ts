// userviewloan.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { LoanService } from 'src/app/services/loan.service';
import { Loan } from 'src/app/models/loan.model';
import { LoanApplication } from 'src/app/models/loanapplication.model';

@Component({
  selector: 'app-userviewloan',
  templateUrl: './userviewloan.component.html',
  styleUrls: ['./userviewloan.component.css']
})
export class UserviewloanComponent implements OnInit {

  availableLoans: Loan[] = [];
  filteredLoans: Loan[] = [];
  searchValue: string = '';
  sortValue: number = 0;
  page: number = 1;
  searchField: string = '';
  limit: number = 5;
  appliedLoans: LoanApplication[] = [];
  loans: Loan[] = [];

  constructor(private router: Router, private loanService: LoanService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    const userId = localStorage.getItem('userId');

    forkJoin({
      appliedLoans: this.loanService.getAppliedLoans(userId),
      allLoans: this.loanService.getAllLoans()
    }).subscribe(
      ({ appliedLoans, allLoans }) => {
        this.appliedLoans = appliedLoans;
        this.availableLoans = allLoans.map((loan: Loan) => ({
          loanId: loan.loanId,
          loanType: loan.loanType,
          description: loan.description,
          interestRate: loan.interestRate,
          maximumAmount: loan.maximumAmount,
          repaymentTenure: loan.repaymentTenure,
          eligibility: loan.eligibility,
          documentsRequired: loan.documentsRequired
        }));
        this.filteredLoans = this.availableLoans;
        console.log('Applied loans:', this.appliedLoans);
        console.log('Available loans:', this.availableLoans);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  handleSearchChange(searchValue: string): void {
    this.searchField = searchValue;
    this.filteredLoans = this.filterLoans(searchValue);
  }

  filterLoans(search: string) {
    const searchLower = search.toLowerCase();
    if (searchLower === '') return this.availableLoans;
    return this.availableLoans.filter(
      (loan) =>
        loan.loanType.toLowerCase().includes(searchLower) ||
        loan.description.toLowerCase().includes(searchLower)
    );
  }

  toggleSort(order: number) {
    this.sortValue = order;

    this.filteredLoans = [...this.filteredLoans].sort((a, b) => {
      if (order === 1) {
        return a.interestRate - b.interestRate;
      } else if (order === -1) {
        return b.interestRate - a.interestRate;
      } else {
        return 0;
      }
    });
  }

  handleApplyClick(loan: Loan) {
    const isLoanApplied = this.isLoanApplied(loan);

    if (isLoanApplied) {
      alert('Loan is already applied.');
    } else {
      const newLoanApplication: LoanApplication = {
        loanApplicationId: undefined,
        userId: Number(localStorage.getItem('userId')), // Convert userId to number
        loanId: loan.loanId,
        submissionDate: new Date().toISOString().split('T')[0], // Set current date as submission date
        loanStatus: 0, // Set default loan status to pending
        farmLocation: '',
        farmerAddress: '',
        farmSizeInAcres: 0,
        farmPurpose: '',
        file: ''
      };
      this.appliedLoans.push(newLoanApplication); // Add the applied loan to the appliedLoans array
      localStorage.setItem('loanId', loan.loanId.toString()); // Store loanId in local storage
      this.router.navigate(['/user/loanapplicationform']);
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredLoans.length / this.limit);
  }

  isLoanApplied(loan: Loan): boolean {
    return this.appliedLoans.some(
      (appliedLoan) => appliedLoan.loan.loanId === loan.loanId
    );
  }

  navigateToViewAppliedLoan() {
    this.router.navigate(['/appliedloan']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
