import { Component, OnInit } from '@angular/core';
import { WifiSchemeService } from 'src/app/services/wifi-scheme.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalSchemes: number = 0;
  availableSchemes: number = 0;
  nonAvailableSchemes: number = 0;

  allSchemes = [];
  selectedSchemes = [];
  lastClickedFilter: string = null; // To track the last clicked filter

  constructor(private wifiSchemeService: WifiSchemeService) {}

  ngOnInit(): void {
    this.fetchWiFiSchemeData();
  }

  fetchWiFiSchemeData(): void {
    this.wifiSchemeService.getAllWiFiSchemes().subscribe(
      (schemes) => {
        this.allSchemes = schemes;
        this.totalSchemes = schemes.length;
        this.availableSchemes = schemes.filter(scheme => scheme.availabilityStatus === 'Available').length;
        this.nonAvailableSchemes = this.totalSchemes - this.availableSchemes;
      },
      (error) => {
        console.error('Error fetching schemes:', error);
      }
    );
  }

  toggleSchemeDetails(filter: string): void {
    // If the same filter is clicked again, hide the details
    if (this.lastClickedFilter === filter) {
      this.selectedSchemes = [];
      this.lastClickedFilter = null;
    } else {
      this.lastClickedFilter = filter;
      if (filter === 'all') {
        this.selectedSchemes = this.allSchemes;
      } else if (filter === 'available') {
        this.selectedSchemes = this.allSchemes.filter(scheme => scheme.availabilityStatus === 'Available');
      } else if (filter === 'not-available') {
        this.selectedSchemes = this.allSchemes.filter(scheme => scheme.availabilityStatus !== 'Available');
      }
    }
  }
}