import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoanService } from 'src/app/services/loan.service';
import { LoanApplication } from 'src/app/models/loanapplication.model';

@Component({
  selector: 'app-userappliedloan',
  templateUrl: './userappliedloan.component.html',
  styleUrls: ['./userappliedloan.component.css']
})
export class UserappliedloanComponent implements OnInit {

  showDeletePopup: boolean = false;
  showDetailsPopup: boolean = false;
  loanToDelete: LoanApplication | null = null;
  selectedLoan: LoanApplication | null = null;
  appliedLoans: LoanApplication[] = [];
  filteredLoans: LoanApplication[] = [];
  searchValue = '';
  sortValue = 0;
  page = 1;
  limit = 5;
  maxRecords = 1;

  constructor(private loanService: LoanService, private router: Router) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    const userId = localStorage.getItem('userId');
    this.loanService.getAppliedLoans(userId).subscribe(
      (response: LoanApplication[]) => {
        this.appliedLoans = response;
        console.log('User Applied loans:', this.appliedLoans);
        this.filteredLoans = response;
        this.maxRecords = response.length;
      },
      (error) => {
        console.error('Error fetching data:', error);
        // Handle error appropriately
      }
    );
  }

  totalPages(): number {
    return Math.ceil(this.maxRecords / this.limit);
  }

  filterLoans(): void {
    const searchLower = this.searchValue ? this.searchValue.toLowerCase() : '';
    if (searchLower === '') {
      this.filteredLoans = [...this.appliedLoans];
    } else {
      this.filteredLoans = this.appliedLoans.filter((loan) =>
        loan.loanId && loan.loanId.toString().includes(searchLower)
      );
    }
    this.maxRecords = this.filteredLoans.length;
  }

  toggleSort(order: number): void {
    this.sortValue = order;

    this.filteredLoans.sort((a, b) => {
      return order === 1
        ? new Date(a.submissionDate).getTime() - new Date(b.submissionDate).getTime()
        : order === -1
        ? new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime()
        : 0;
    });
  }

  handleDeleteClick(loan: LoanApplication): void {
    this.loanToDelete = loan;
    this.showDeletePopup = true;
  }

  handleConfirmDelete(): void {
    if (this.loanToDelete) {
      this.loanService
        .deleteLoanApplication(this.loanToDelete.loanApplicationId!.toString())
        .subscribe((response) => {
          console.log('Loan deleted successfully', response);
          this.fetchData();
          this.closeDeletePopup();
        });
    }
  }

  closeDeletePopup(): void {
    this.loanToDelete = null;
    this.showDeletePopup = false;
  }

  handleViewDetailsClick(loan: LoanApplication): void {
    this.selectedLoan = loan;
    this.showDetailsPopup = true;
  }

  closeDetailsPopup(): void {
    this.selectedLoan = null;
    this.showDetailsPopup = false;
  }
}
