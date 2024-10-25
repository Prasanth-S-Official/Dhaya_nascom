import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-userviewloan',
  templateUrl: './userviewloan.component.html',
  styleUrls: ['./userviewloan.component.css']
})
export class UserviewloanComponent implements OnInit {

  availableLoans: any[] = [];
  filteredLoans = [];
  searchValue: string = '';
  sortValue: number = 0;
  page: number = 1;
  searchField: string = '';  // Declaring searchField here
  limit: number = 5;
  appliedLoans: any[] = [];
  loans = [];

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
        this.availableLoans = allLoans.map((loan: any) => ({
          LoanId: loan.LoanId,
          LoanType: loan.LoanType,
          Description: loan.Description,
          InterestRate: loan.InterestRate,
          MaximumAmount: loan.MaximumAmount,
          RepaymentTenure: loan.RepaymentTenure,       // New field
          Eligibility: loan.Eligibility,               // New field
          DocumentsRequired: loan.DocumentsRequired    // New field
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
        loan.LoanType.toLowerCase().includes(searchLower) ||
        loan.Description.toLowerCase().includes(searchLower)
    );
  }

  toggleSort(order: number) {
    this.sortValue = order;

    this.filteredLoans = [...this.filteredLoans].sort((a, b) => {
      if (order === 1) {
        return a.InterestRate - b.InterestRate;
      } else if (order === -1) {
        return b.InterestRate - a.InterestRate;
      } else {
        return 0;
      }
    });
  }

  handleApplyClick(loan: any) {
    const isLoanApplied = this.isLoanApplied(loan);

    if (isLoanApplied) {
      alert('Loan is already applied.');
    } else {
      this.appliedLoans.push(loan); // Add the applied loan to the appliedLoans array
      localStorage.setItem('loanId', loan.LoanId); // Store loanId in local storage
      this.router.navigate(['/user/loanapplicationform']);
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredLoans.length / this.limit);
  }

  isLoanApplied(loan: any): boolean {
    return this.appliedLoans.some(
      (appliedLoan) => appliedLoan.LoanId === loan.LoanId
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
