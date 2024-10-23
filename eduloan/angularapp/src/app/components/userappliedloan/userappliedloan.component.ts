import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-userappliedloan',
  templateUrl: './userappliedloan.component.html',
  styleUrls: ['./userappliedloan.component.css']
})
export class UserappliedloanComponent implements OnInit {

  showDeletePopup = false;
  loanToDelete: any = null;
  appliedLoans: any[] = [];
  filteredLoans: any[] = [];
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
    // Replace 'userId' with the actual user ID
    const userId = localStorage.getItem('userId');
    this.loanService.getAppliedLoans(userId).subscribe(
      (response: any) => {
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
      loan.loan && loan.loan.loanType && loan.loan.loanType.toLowerCase().includes(searchLower)
    );
  }
  this.maxRecords = this.filteredLoans.length;
}

  toggleSort(order: number): void {
    this.sortValue = order;

    this.filteredLoans.sort((a, b) => {
      return order === 1
        ? new Date(a.submissionDate).getTime() -
            new Date(b.submissionDate).getTime()
        : order === -1
        ? new Date(b.submissionDate).getTime() -
          new Date(a.submissionDate).getTime()
        : 0;
    });
  }


handleDeleteClick(loan: any): void {
    this.loanToDelete = loan;
    this.showDeletePopup = true;
}

handleConfirmDelete(): void {
    this.loanService
        .deleteLoanApplication(this.loanToDelete.loanApplicationId)
        .subscribe((response) => {
            console.log('Loan deleted successfully', response);
            this.fetchData();
            this.closeDeletePopup();
        });
}


  closeDeletePopup(): void {
    this.loanToDelete = null;
    this.showDeletePopup = false;
  }


}
