import { Component, OnInit } from '@angular/core';
import { WifiSchemeService } from 'src/app/services/wifi-scheme.service';
import { WiFiSchemeRequestService } from 'src/app/services/wifi-scheme-request.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalSchemes: number = 0;
  availableSchemes: number = 0;
  nonAvailableSchemes: number = 0;

  allSchemes: any[] = [];
  allRequests: any[] = [];
  selectedSchemes: any[] = [];
  lastClickedFilter: string = null;

  famousScheme: any = null;
  totalRequestsForFamousScheme: number = 0;

  constructor(
    private wifiSchemeService: WifiSchemeService,
    private wifiSchemeRequestService: WiFiSchemeRequestService
  ) {}

  ngOnInit(): void {
    this.fetchWiFiSchemeData();
  }

  fetchWiFiSchemeData(): void {
    this.wifiSchemeService.getAllWiFiSchemes().subscribe(
      (schemes) => {
        this.allSchemes = schemes;
        console.log('All Schemes:', this.allSchemes); // Debug log for schemes
        this.totalSchemes = schemes.length;
        this.availableSchemes = schemes.filter(scheme => scheme.availabilityStatus === 'Available').length;
        this.nonAvailableSchemes = this.totalSchemes - this.availableSchemes;

        this.fetchFamousSchemeData(); // Fetch famous scheme after schemes are loaded
      },
      (error) => {
        console.error('Error fetching schemes:', error);
      }
    );
  }

  fetchFamousSchemeData(): void {
    this.wifiSchemeRequestService.getAllWiFiSchemeRequests().subscribe(
      (requests) => {
        this.allRequests = requests;
        console.log('All Requests:', this.allRequests); // Debug log for requests

        const schemeRequestCount: { [key: number]: number } = {};

        // Count requests for each scheme
        requests.forEach((request) => {
          const schemeId = request.wifiSchemeId; // Use wifiSchemeId from request
          if (!schemeRequestCount[schemeId]) {
            schemeRequestCount[schemeId] = 0;
          }
          schemeRequestCount[schemeId]++;
        });

        console.log('Scheme Request Count:', schemeRequestCount); // Debug log for request counts

        // Find the scheme with the most requests
        let maxRequests = 0;
        let famousSchemeId = null;
        for (const schemeId in schemeRequestCount) {
          if (schemeRequestCount[schemeId] > maxRequests) {
            maxRequests = schemeRequestCount[schemeId];
            famousSchemeId = Number(schemeId);
          }
        }

        console.log('Famous Scheme ID:', famousSchemeId); // Debug log for famous scheme ID

        this.famousScheme = this.allSchemes.find(scheme =>
          scheme.wifiSchemeId === famousSchemeId
        );
        this.totalRequestsForFamousScheme = maxRequests;

        console.log('Famous Scheme:', this.famousScheme); // Debug log for famous scheme
      },
      (error) => {
        console.error('Error fetching requests:', error);
      }
    );
  }

  toggleSchemeDetails(filter: string): void {
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
