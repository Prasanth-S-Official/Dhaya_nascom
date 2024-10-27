import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-requestedloan',
  templateUrl: './requestedloan.component.html',
  styleUrls: ['./requestedloan.component.css'],
})
export class RequestedloanComponent implements OnInit {
  loanRequests: any[] = [];
  filteredLoans: any[] = [];
  searchValue = '';
  statusFilter = '-1'; // All statuses by default
  page = 1;
  pageSize = 2;
  expandedRow: number | null = null;
  showModal = false;
  selectedLoan: any = null;

  constructor(private loanService: LoanService, private router: Router) {}

  ngOnInit(): void {
    this.fetchData();
  }

  // Fetch all loan applications from the service
  fetchData(): void {
    this.loanService.getAllLoanApplications().subscribe(
      (response) => {
        this.loanRequests = response;
        this.filteredLoans = [...this.loanRequests]; // Initialize the filtered list
        console.log('Loan requests:', this.loanRequests);
      },
      (error) => {
        console.error('Error fetching loans:', error);
        // Handle error appropriately
      }
    );
  }

  // Search functionality to filter loans by Loan Type
  handleSearchChange(event: any): void {
    this.searchValue = event.target.value.toLowerCase();
    this.filteredLoans = this.loanRequests.filter((loan) =>
      loan.loan.loanType.toLowerCase().includes(this.searchValue)
    );
  }

  // Filter loans based on their status (Pending, Approved, Rejected)
  handleFilterChange(event: any): void {
    this.statusFilter = event.target.value;
    this.filteredLoans = this.loanRequests.filter((loan) => {
      if (this.statusFilter === '-1') {
        // If 'All' is selected, return all loans
        return true;
      } else {
        // Return only loans matching the selected status
        return loan.loanStatus === parseInt(this.statusFilter, 10);
      }
    });
  }

  // Approve a loan application
  handleApprove(loanApplication: any): void {
    loanApplication.loanStatus = 1; // Status for Approved
    this.updateLoanStatus(loanApplication);
  }

  // Reject a loan application
  handleReject(loanApplication: any): void {
    loanApplication.loanStatus = 2; // Status for Rejected
    this.updateLoanStatus(loanApplication);
  }

  // Update loan status via the LoanService
  updateLoanStatus(loanApplication: any): void {
    this.loanService.updateLoanStatus(loanApplication.loanApplicationId, loanApplication).subscribe(
      (response) => {
        console.log('Loan status updated:', response);
        this.fetchData(); // Refresh data after status update
      },
      (error) => {
        console.error('Error updating loan status:', error);
        // Handle error appropriately
      }
    );
  }

  // Expand row to show more details
  handleRowExpand(index: number): void {
    const selected = this.loanRequests[index];
    this.expandedRow = this.expandedRow === index ? null : index;
    this.selectedLoan = selected;
    this.showModal = !this.showModal;
  }

  // Close the loan details modal
  closeLoanDetailsModal(): void {
    this.showModal = false;
  }

  // Handle pagination (if needed)
  handlePagination(direction: number): void {
    if (direction === -1 && this.page > 1) {
      this.page -= 1;
    } else if (direction === 1 && this.page < Math.ceil(this.loanRequests.length / this.pageSize)) {
      this.page += 1;
    }
    this.fetchData(); // Refresh data for the current page
  }
}