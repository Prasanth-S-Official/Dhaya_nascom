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
  searchValue = '';
  sortValue = 0;
  statusFilter = '-1';
  page = 1;
  pagesize = 2;
  maxPageLength = 0;
  maxRecords = 1;
  expandedRow: number | null = null;
  showModal = false;
  selectedLoan: any = null;

  constructor(private loanService: LoanService, private router: Router) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
      this.loanService.getAllLoanApplications().subscribe(
      (response) => {
        this.loanRequests = response;
        this.filteredLoans = [...this.loanRequests];
        console.log('loanrequest:', this.loanRequests);
      },
      (error) => {
        console.error('Error fetching loans:', error);
        // Handle error appropriately
      }
    );
  }
  filteredLoans = [];
  availableLoans: any[] = [];

handleSearchChange(event: any): void {
  this.searchValue = event.target.value.toLowerCase();
  this.filteredLoans = this.loanRequests.filter(loan =>
    loan.Loan.LoanType.toLowerCase().includes(this.searchValue)
  );
}


handleFilterChange(event: any): void {
  this.statusFilter = event.target.value;
  this.filteredLoans = this.loanRequests.filter(loan => {
    if (this.statusFilter === '-1') {
      // If the filter is set to 'All', return all loans
      return true;
    } else {
      // Otherwise, return only the loans that match the selected status
      return loan.LoanStatus === parseInt(this.statusFilter, 10);
    }
  });
}


  // handleApprove(id: string): void {
  //   this.updateLoanStatus(id, 1);
  // }

  // handleReject(id: string): void {
  //   this.updateLoanStatus(id, 2);
  // }

  // updateLoanStatus(id: string, status: number): void {
  //   this.loanService.updateLoanStatus(id, status).subscribe(
  //     (response) => {
  //       console.log('Response:', response);
  //       this.fetchData();
  //     },
  //     (error) => {
  //       console.error('Error updating loan status:', error);
  //       // Handle error appropriately
  //     }
  //   );
  // }

  handleApprove(loanApplication: any): void {
  loanApplication.loanStatus = 1;
  this.updateLoanStatus(loanApplication);
}

handleReject(loanApplication: any): void {
  loanApplication.loanStatus = 2;
  this.updateLoanStatus(loanApplication);
}

updateLoanStatus(loanApplication: any): void {
  this.loanService.updateLoanStatus(loanApplication.loanApplicationId, loanApplication).subscribe(
    (response) => {
      console.log('Response:', response);
      this.fetchData();
    },
    (error) => {
      console.error('Error updating loan status:', error);
      // Handle error appropriately
    }
  );
}



  handleRowExpand(index: number): void {
    const selected = this.loanRequests[index];
    console.log('selected:', selected);
    this.expandedRow = this.expandedRow === index ? null : index;
    this.selectedLoan = selected;
    this.showModal = !this.showModal;
  }

  closeLoanDetailsModal(): void {
    this.showModal = false;
  }



  handlePagination(direction: number): void {
    if (direction === -1 && this.page > 1) {
      this.page -= 1;
    } else if (direction === 1 && this.page < this.maxPageLength) {
      this.page += 1;
    }
    this.fetchData();
  }
}
