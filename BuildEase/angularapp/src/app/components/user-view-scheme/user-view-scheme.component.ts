import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { WifiSchemeService } from 'src/app/services/wifi-scheme.service';
import { WifiScheme } from 'src/app/models/wifi-scheme.model';
import { WifiSchemeRequestService } from 'src/app/services/wifi-scheme-request.service';

@Component({
  selector: 'app-user-view-scheme',
  templateUrl: './user-view-scheme.component.html',
  styleUrls: ['./user-view-scheme.component.css'],
})
export class UserViewSchemeComponent implements OnInit {
  availableSchemes: WifiScheme[] = [];
  filteredSchemes: WifiScheme[] = [];
  appliedSchemes: any[] = [];
  searchField: string = '';

  constructor(
    private router: Router,
    private wifiSchemeService: WifiSchemeService,
    private wifiSchemeRequestService: WifiSchemeRequestService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    const userId = Number(localStorage.getItem('userId'));

    forkJoin({
      appliedSchemes: this.wifiSchemeRequestService.getWiFiSchemeRequestsByUserId(userId),
      allSchemes: this.wifiSchemeService.getAllWiFiSchemes(),
    }).subscribe(
      ({ appliedSchemes, allSchemes }) => {
        this.appliedSchemes = appliedSchemes || []; // Ensure it is initialized as an array
        this.availableSchemes = allSchemes;
        this.filteredSchemes = this.availableSchemes;
        console.log('Applied schemes:', this.appliedSchemes);
        console.log('Available schemes:', this.availableSchemes);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  handleSearchChange(searchValue: string): void {
    this.searchField = searchValue;
    this.filteredSchemes = this.filterSchemes(searchValue);
  }

  filterSchemes(search: string): WifiScheme[] {
    const searchLower = search.toLowerCase();
    return this.availableSchemes.filter(
      (scheme) =>
        scheme.schemeName.toLowerCase().includes(searchLower) ||
        scheme.description.toLowerCase().includes(searchLower) ||
        scheme.region.toLowerCase().includes(searchLower)
    );
  }

  handleApplyClick(scheme: WifiScheme): void {
    if (this.isSchemeApplied(scheme)) {
      alert('You have already applied for this scheme.');
    } else {
      localStorage.setItem('wifiSchemeId', scheme.wifiSchemeId.toString());
      this.router.navigate(['/user/add/request']);
    }
  }

  isSchemeApplied(scheme: WifiScheme): boolean {
    // Ensure `appliedSchemes` is not null before checking
    if (!this.appliedSchemes) return false;

    return this.appliedSchemes.some(
      (appliedScheme) => appliedScheme.wifiScheme.wifiSchemeId === scheme.wifiSchemeId
    );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
