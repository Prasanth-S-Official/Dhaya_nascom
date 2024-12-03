import { Component, OnInit } from '@angular/core';
import { MaterialRequestService } from 'src/app/services/material-request.service';

@Component({
  selector: 'app-admin-insights',
  templateUrl: './admin-insights.component.html',
  styleUrls: ['./admin-insights.component.css']
})
export class AdminInsightsComponent implements OnInit {
  allUserInsights: any[] = [];
  filteredUserInsights: any[] = [];
  selectedUserOrders: any[] = [];
  showOrdersPopup: boolean = false;
  searchQuery: string = '';

  constructor(private materialRequestService: MaterialRequestService) {}

  ngOnInit(): void {
    this.fetchInsights();
  }

  fetchInsights(): void {
    this.materialRequestService.getAdminInsights().subscribe(
      (data: any[]) => {
        this.allUserInsights = data;
        this.filteredUserInsights = [...this.allUserInsights]; // Initialize filtered array
        console.log('Fetched User Insights:', this.allUserInsights);
      },
      (error) => {
        console.error('Error fetching insights:', error);
      }
    );
  }

  applySearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredUserInsights = this.allUserInsights.filter(user =>
      user.email.toLowerCase().includes(query)
    );
  }

  showOrders(orders: any[]): void {
    this.selectedUserOrders = orders;
    this.showOrdersPopup = true;
  }

  closeOrdersPopup(): void {
    this.showOrdersPopup = false;
    this.selectedUserOrders = [];
  }
}
