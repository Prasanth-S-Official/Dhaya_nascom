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

  constructor(private wifiSchemeService: WifiSchemeService) {}

  ngOnInit(): void {
    this.fetchWiFiSchemeData();
  }

  fetchWiFiSchemeData(): void {
    this.wifiSchemeService.getAllWiFiSchemes().subscribe(
      (schemes) => {
        this.totalSchemes = schemes.length;
        this.availableSchemes = schemes.filter(scheme => scheme.availabilityStatus === 'Available').length;
        this.nonAvailableSchemes = this.totalSchemes - this.availableSchemes;
      },
      (error) => {
        console.error('Error fetching schemes:', error);
      }
    );
  }
}