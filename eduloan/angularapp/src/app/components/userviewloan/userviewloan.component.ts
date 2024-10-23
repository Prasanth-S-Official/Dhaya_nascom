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
  limit: number = 5;
  appliedLoans: any[] = [];
  loans = [];


  constructor(private router: Router, private loanService: LoanService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  //  fetchAppliedLoans() {

  //   const userId = localStorage.getItem('userId');
  //   this.loanService.getAppliedLoans(userId).subscribe(
  //     (response: any) => {
  //       this.appliedLoans = response;
  //       console.log('Applied loans:', this.appliedLoans);
  //     },
  //     (error) => {
  //       console.error('Error fetching data:', error);
  //     }
  //   );
  // }

  fetchData() {
    const userId = localStorage.getItem('userId');

    forkJoin({
      appliedLoans: this.loanService.getAppliedLoans(userId),
      allLoans: this.loanService.getAllLoans()
    }).subscribe(
      ({ appliedLoans, allLoans }) => {
        this.appliedLoans = appliedLoans;
        this.availableLoans = allLoans;
        this.filteredLoans = allLoans;
        console.log('Applied loans:', this.appliedLoans);
        console.log('Available loans:', this.availableLoans);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  // async fetchData() {
  //      this.fetchAppliedLoans();

  //   this.loanService.getAllLoans().subscribe(
  //     (data: any) => {
  //       this.availableLoans = data;
  //       this.filteredLoans = data;
  //       console.log('Available loans:', this.availableLoans);
  //     },
  //     (error) => {
  //       // Handle error
  //       console.error('Error fetching loans:', error);
  //     }
  //   );
  // }

  searchField = '';

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
        return a.interestRate - b.interestRate;
      } else if (order === -1) {
        return b.interestRate - a.interestRate;
      } else {
        return 0;
      }
    });
  }


  handleApplyClick(loan: any) {
    const isLoanApplied = this.isLoanApplied(loan);
    console.log(isLoanApplied);

    if (isLoanApplied) {
      alert('Loan is already applied.');
    } else {
      this.appliedLoans.push(loan);
      console.log("selectedloan" ,loan) ;// Add the applied loan to the appliedLoans array
      localStorage.setItem('loanId', loan.loanId); // Store loanType in local storage
      this.router.navigate(['/user/loanapplicationform']);
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredLoans.length / this.limit);
  }

  // isLoanApplied(loan: any): boolean {
  //   console.log();
  //   return this.appliedLoans.some(
  //     (appliedLoan) => appliedLoan.loanType === loan.loanType
  //   );
  // }

  isLoanApplied(loan: any): boolean {
    console.log("loandetails",loan)
    return this.appliedLoans.some(
      (appliedLoan) => appliedLoan.loan.loanId === loan.loanId
    );
    // return true;
}

  navigateToViewAppliedLoan() {
    this.router.navigate(['/appliedloan']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
