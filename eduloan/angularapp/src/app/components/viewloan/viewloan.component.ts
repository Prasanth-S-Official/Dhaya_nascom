import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-viewloan',
  templateUrl: './viewloan.component.html',
  styleUrls: ['./viewloan.component.css']
})
export class ViewloanComponent implements OnInit {


  availableLoans: any[] = [];
  showDeletePopup = false;
  loanToDelete: string | null = null;
  searchValue = '';
  sortValue = 0;
  page: number = 1;
  limit = 5;
  maxRecords = 1;
  totalPages = 1;
  status: string = ''; // Add this line
  filteredLoans = [];
  searchField = '';
  errorMessage: string = '';
  allLoans: any[] = []; // Declare the allLoans property

  constructor(private router: Router, private loanService: LoanService) {}

  ngOnInit(): void {
    this.fetchAvailableLoans();
  }

  fetchAvailableLoans() {
    this.loanService.getAllLoans().subscribe(
      (data: any) => {
        this.availableLoans = data;
        this.maxRecords = this.availableLoans.length;
        this.allLoans = data; // Populate allLoans with the initial list of loans
        this.totalPages = Math.ceil(this.maxRecords / this.limit);
        console.log('Available loans:', this.availableLoans);
      },
      (error) => {
        // Handle error
        console.error('Error fetching loans:', error);
      }
    );
  }




  handleDeleteClick(loanId: string) {
    this.loanToDelete = loanId;
    this.showDeletePopup = true;
  }

  navigateToEditLoan(id: string) {
    this.router.navigate(['/admin/editloan', id]);
  }

  handleConfirmDelete() {
    if (this.loanToDelete) {
      this.loanService.deleteLoan(this.loanToDelete).subscribe(
        (response) => {
          console.log('Loan deleted successfully', response);
          this.closeDeletePopup();
          this.fetchAvailableLoans();
          this.errorMessage = '';
        },
        (error) => {
          console.error('Error deleting loan:', error);
          this.errorMessage = error.error.message;
        }
      );
    }
  }



  logout() {
    // Implement logout logic
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
  }

  closeDeletePopup() {
    this.loanToDelete = null;
    this.showDeletePopup = false;
    this.errorMessage = '';
  }

  updateAvailableLoans(newLoans: any[]) {
    this.availableLoans = newLoans;
  }

  handleSearchChange(searchValue: string): void {
    this.searchField = searchValue;
    if (searchValue) {
      this.availableLoans = this.filterLoans(searchValue);
    } else {
      this.availableLoans = this.allLoans;
    }
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
}
