import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WifiSchemeService } from 'src/app/services/wifi-scheme.service';

@Component({
  selector: 'app-admin-view-scheme',
  templateUrl: './admin-view-scheme.component.html',
  styleUrls: ['./admin-view-scheme.component.css']
})
export class AdminViewSchemeComponent implements OnInit {
  availableSchemes: any[] = [];
  allSchemes: any[] = [];
  showDeletePopup = false;
  schemeToDelete: number | null = null;
  searchField = '';
  selectedRegion: string | null = null;
  status: string = '';
  errorMessage: string = '';
  uniqueRegions: string[] = [];

  constructor(private router: Router, private wifiSchemeService: WifiSchemeService) {}

  ngOnInit(): void {
    this.fetchAvailableSchemes();
  }

  fetchAvailableSchemes() {
    this.status = 'loading';
    this.wifiSchemeService.getAllWiFiSchemes().subscribe(
      (data: any) => {
        this.availableSchemes = data;
        this.allSchemes = data;
        this.uniqueRegions = this.getUniqueRegions(data);
        this.status = this.availableSchemes.length === 0 ? 'noRecords' : '';
      },
      (error) => {
        console.error('Error fetching schemes:', error);
        this.status = 'error';
      }
    );
  }

  getUniqueRegions(schemes: any[]): string[] {
    return Array.from(new Set(schemes.map((scheme) => scheme.region)));
  }

  handleDeleteClick(schemeId: string) {
    this.schemeToDelete = Number(schemeId);
    this.showDeletePopup = true;
  }

  navigateToEditScheme(id: string) {
    this.router.navigate(['/admin/edit/scheme', id]);
  }

  handleConfirmDelete() {
    if (this.schemeToDelete) {
      this.wifiSchemeService.deleteWiFiScheme(this.schemeToDelete).subscribe(
        () => {
          this.closeDeletePopup();
          this.fetchAvailableSchemes();
          this.errorMessage = '';
        },
        (error) => {
          console.error('Error deleting scheme:', error);
          this.errorMessage = error.error.message;
        }
      );
    }
  }

  closeDeletePopup() {
    this.schemeToDelete = null;
    this.showDeletePopup = false;
    this.errorMessage = '';
  }

  applyFilters(): void {
    this.availableSchemes = this.allSchemes.filter((scheme) => {
      const matchesSearch =
        scheme.schemeName.toLowerCase().includes(this.searchField.toLowerCase()) ||
        scheme.description.toLowerCase().includes(this.searchField.toLowerCase());

      const matchesRegion = !this.selectedRegion || scheme.region === this.selectedRegion;

      return matchesSearch && matchesRegion;
    });

    this.status = this.availableSchemes.length === 0 ? 'noRecords' : '';
  }

  toggleAvailability(scheme: any): void {
    const newStatus = scheme.availabilityStatus === 'Available' ? 'Unavailable' : 'Available';
    const updatedScheme = { ...scheme, availabilityStatus: newStatus };

    this.wifiSchemeService.updateWiFiScheme(scheme.wifiSchemeId, updatedScheme).subscribe(
      () => {
        scheme.availabilityStatus = newStatus; // Update the local data
      },
      (error) => {
        console.error('Error updating scheme availability:', error);
      }
    );
  }
}
