import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-admin-view-drivers',
  templateUrl: './admin-view-drivers.component.html',
  styleUrls: ['./admin-view-drivers.component.css']
})
export class AdminViewDriversComponent implements OnInit {

  allDrivers: any[] = [];
  filteredDrivers: any[] = [];
  showDeletePopup = false;
  showImagePopup = false;
  driverToDelete: number | null = null;
  driverImage: string | null = null;
  searchField = '';
  selectedStatus: string | null = null;
  status: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private driverService: DriverService) {}

  ngOnInit(): void {
    this.fetchDrivers();
  }

  fetchDrivers() {
    this.status = 'loading';
    this.driverService.getAllDrivers().subscribe(
      (data: any) => {
        this.allDrivers = data;
        this.filteredDrivers = data;
        this.status = this.filteredDrivers.length === 0 ? 'noRecords' : '';
      },
      (error) => {
        console.error('Error fetching drivers:', error);
        this.status = 'error';
      }
    );
  }

  handleDeleteClick(driverId: number) {
    this.driverToDelete = driverId;
    this.showDeletePopup = true;
  }

  handleConfirmDelete() {
    if (this.driverToDelete) {
      this.driverService.deleteDriver(this.driverToDelete).subscribe(
        () => {
          this.closeDeletePopup();
          this.fetchDrivers();
          this.errorMessage = '';
        },
        (error) => {
          console.error('Error deleting driver:', error);
          this.errorMessage = error.error.message || 'Failed to delete driver';
        }
      );
    }
  }

  closeDeletePopup() {
    this.driverToDelete = null;
    this.showDeletePopup = false;
    this.errorMessage = '';
  }

  navigateToEditDriver(id: number) {
    this.router.navigate(['/admin/edit/driver', id]);
  }

  toggleDriverStatus(driver: any) {
    const updatedStatus = driver.availabilityStatus === 'Available' ? 'On Leave' : 'Available';
    const updatedDriver = { ...driver, availabilityStatus: updatedStatus };

    this.driverService.updateDriver(driver.driverId, updatedDriver).subscribe(
      () => {
        driver.availabilityStatus = updatedStatus;
      },
      (error) => {
        console.error('Error updating driver status:', error);
      }
    );
  }

  viewDriverImage(imageBase64: string) {
    this.driverImage = imageBase64;
    this.showImagePopup = true;
  }

  closeImagePopup() {
    this.driverImage = null;
    this.showImagePopup = false;
  }

  applyFilters(): void {
    this.filteredDrivers = this.allDrivers.filter((driver) => {
      const matchesSearch =
        driver.driverName.toLowerCase().includes(this.searchField.toLowerCase()) ||
        driver.vehicleType.toLowerCase().includes(this.searchField.toLowerCase());

      const matchesStatus = !this.selectedStatus || driver.availabilityStatus === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });

    this.status = this.filteredDrivers.length === 0 ? 'noRecords' : '';
  }
}
