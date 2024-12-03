import { Component, OnInit } from '@angular/core';
import { MaterialRequestService } from 'src/app/services/material-request.service';

@Component({
  selector: 'app-admin-insights',
  templateUrl: './admin-insights.component.html',
  styleUrls: ['./admin-insights.component.css']
})
export class AdminInsightsComponent implements OnInit {
  allUserInsights: any[] = [];
  selectedUserOrders: any[] = [];
  showOrdersPopup: boolean = false;

  constructor(private materialRequestService: MaterialRequestService) {}

  ngOnInit(): void {
    this.fetchInsights();
  }

  fetchInsights(): void {
    this.materialRequestService.getAdminInsights().subscribe(
      (data: any[]) => {
        this.allUserInsights = data;
        console.log('Fetched User Insights:', this.allUserInsights);
      },
      (error) => {
        console.error('Error fetching insights:', error);
      }
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