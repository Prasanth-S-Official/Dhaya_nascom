import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WifiSchemeService } from 'src/app/services/wifi-scheme.service';

@Component({
  selector: 'app-adminviewscheme',
  templateUrl: './adminviewscheme.component.html',
  styleUrls: ['./adminviewscheme.component.css']
})
export class AdminviewschemeComponent implements OnInit {

  availableSchemes: any[] = [];  // List of WiFi schemes to display
  allSchemes: any[] = [];       // Full list of WiFi schemes fetched from the server
  showDeletePopup = false;      // Controls the visibility of the delete confirmation popup
  schemeToDelete: number | null = null;  // ID of the scheme to delete
  searchField = '';              // Search field input value
  selectedRegion: string | null = null;  // Selected region filter
  status: string = '';           // Status for loading, error, or no records
  errorMessage: string = '';     // Error message for delete operation

  constructor(private router: Router, private wifiSchemeService: WifiSchemeService) {}

  ngOnInit(): void {
    this.fetchAvailableSchemes(); // Fetch schemes on component initialization
  }

  fetchAvailableSchemes(): void {
    this.status = 'loading'; // Set loading status
    this.wifiSchemeService.getAllWiFiSchemes().subscribe(
      (data: any) => {
        this.availableSchemes = data; // Set the available schemes from the response
        this.allSchemes = data;      // Keep a copy of all schemes for filtering
        this.status = this.availableSchemes.length === 0 ? 'noRecords' : ''; // Update status
      },
      (error) => {
        console.error('Error fetching schemes:', error);
        this.status = 'error'; // Set error status
      }
    );
  }

  handleDeleteClick(schemeId: string): void {
    this.schemeToDelete = Number(schemeId);
    this.showDeletePopup = true; // Show the delete confirmation popup
  }

  navigateToEditScheme(id: string): void {
    this.router.navigate(['/admin/edit/scheme', id]); // Navigate to edit page
  }

  handleConfirmDelete(): void {
    if (this.schemeToDelete) {
      this.wifiSchemeService.deleteWiFiScheme(this.schemeToDelete).subscribe(
        () => {
          this.closeDeletePopup(); // Close popup after deletion
          this.fetchAvailableSchemes(); // Refresh schemes after deletion
          this.errorMessage = ''; // Clear any error messages
        },
        (error) => {
          console.error('Error deleting scheme:', error);
          this.errorMessage = error.error.message; // Set error message
        }
      );
    }
  }

  closeDeletePopup(): void {
    this.schemeToDelete = null; // Reset scheme to delete
    this.showDeletePopup = false; // Hide the delete popup
    this.errorMessage = ''; // Clear error message
  }

  applyFilters(): void {
    this.availableSchemes = this.allSchemes.filter(scheme => {
      const matchesSearch = scheme.schemeName.toLowerCase().includes(this.searchField.toLowerCase()) ||
                            scheme.description.toLowerCase().includes(this.searchField.toLowerCase());

      const matchesRegion = !this.selectedRegion || scheme.region === this.selectedRegion;

      return matchesSearch && matchesRegion;
    });

    this.status = this.availableSchemes.length === 0 ? 'noRecords' : ''; // Update status
  }
}