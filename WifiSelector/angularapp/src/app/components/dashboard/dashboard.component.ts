import { Component, OnInit } from '@angular/core';
import { WifiSchemeService } from 'src/app/services/wifi-scheme.service';
import { WiFiSchemeRequestService } from 'src/app/services/wifi-scheme-request.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  totalSchemes: number = 0;
  availableSchemes: number = 0;
  nonAvailableSchemes: number = 0;

  allSchemes: any[] = [];
  allRequests: any[] = [];
  selectedSchemes: any[] = [];
  lastClickedFilter: string = null;

  famousSchemeByRegion: { [key: string]: any } = {}; // Stores region-wise famous schemes

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
        this.totalSchemes = schemes.length;
        this.availableSchemes = schemes.filter((scheme) => scheme.availabilityStatus === 'Available').length;
        this.nonAvailableSchemes = this.totalSchemes - this.availableSchemes;

        this.fetchRegionWiseFamousSchemes();
      },
      (error) => {
        console.error('Error fetching schemes:', error);
      }
    );
  }

  fetchRegionWiseFamousSchemes(): void {
    this.wifiSchemeRequestService.getAllWiFiSchemeRequests().subscribe(
      (requests) => {
        this.allRequests = requests;

        const regionWiseRequests: { [key: string]: any[] } = {};

        // Group requests by region
        requests.forEach((request) => {
          const region = (request as any).wifiScheme?.region;
          const schemeId = (request as any).wifiScheme?.wifiSchemeId;

          if (region && schemeId) {
            if (!regionWiseRequests[region]) {
              regionWiseRequests[region] = [];
            }
            regionWiseRequests[region].push(request);
          }
        });

        // Determine famous scheme for each region
        for (const region in regionWiseRequests) {
          const schemeRequestCount: { [key: number]: number } = {};

          regionWiseRequests[region].forEach((request) => {
            const schemeId = request.wifiScheme?.wifiSchemeId;
            if (schemeId) {
              if (!schemeRequestCount[schemeId]) {
                schemeRequestCount[schemeId] = 0;
              }
              schemeRequestCount[schemeId]++;
            }
          });

          let maxRequests = 0;
          let famousSchemeId = null;

          for (const schemeId in schemeRequestCount) {
            if (schemeRequestCount[schemeId] > maxRequests) {
              maxRequests = schemeRequestCount[schemeId];
              famousSchemeId = Number(schemeId);
            }
          }

          const famousScheme = this.allSchemes.find(
            (scheme) => scheme.wifiSchemeId === famousSchemeId
          );

          this.famousSchemeByRegion[region] = {
            scheme: famousScheme,
            totalRequests: maxRequests,
          };
        }
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
        this.selectedSchemes = this.allSchemes.filter((scheme) => scheme.availabilityStatus === 'Available');
      } else if (filter === 'not-available') {
        this.selectedSchemes = this.allSchemes.filter((scheme) => scheme.availabilityStatus !== 'Available');
      }
    }
  }

  // Getter to expose Object.keys for template use
  get regions(): string[] {
    return Object.keys(this.famousSchemeByRegion);
  }
}
