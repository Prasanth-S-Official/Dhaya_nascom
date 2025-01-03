import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { DriverService } from 'src/app/services/driver.service';
import { DriverRequestService } from 'src/app/services/driver-request.service';
import { Driver } from 'src/app/models/driver.model';

@Component({
  selector: 'app-customerviewdriver',
  templateUrl: './customerviewdriver.component.html',
  styleUrls: ['./customerviewdriver.component.css']
})
export class CustomerViewDriverComponent implements OnInit {

  availableDrivers: Driver[] = [];
  filteredDrivers: Driver[] = [];
  requestedDrivers: any[] = [];
  searchField: string = '';

  constructor(
    private router: Router,
    private driverService: DriverService,
    private driverRequestService: DriverRequestService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    const userId = Number(localStorage.getItem('userId'));

    forkJoin({
      requestedDrivers: this.driverRequestService.getDriverRequestsByUserId(userId),
      allDrivers: this.driverService.getAllDrivers(),
    }).subscribe(
      ({ requestedDrivers, allDrivers }) => {
        this.requestedDrivers = requestedDrivers || [];
        this.availableDrivers = allDrivers;
        this.filteredDrivers = this.availableDrivers;
        console.log('Requested drivers:', this.requestedDrivers);
        console.log('Available drivers:', this.availableDrivers);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  handleSearchChange(searchValue: string): void {
    this.searchField = searchValue;
    this.filteredDrivers = this.filterDrivers(searchValue);
  }

  filterDrivers(search: string): Driver[] {
    const searchLower = search.toLowerCase();
    return this.availableDrivers.filter(
      (driver) =>
        driver.driverName.toLowerCase().includes(searchLower) ||
        driver.licenseNumber.toLowerCase().includes(searchLower) ||
        driver.vehicleType.toLowerCase().includes(searchLower)
    );
  }

  handleRequestClick(driver: Driver): void {
    if (this.isDriverRequested(driver)) {
      alert('You have already requested this driver.');
    } else {
      localStorage.setItem('driverId', driver.driverId.toString());
      this.router.navigate(['/customer/add/request']);
    }
  }

  isDriverRequested(driver: Driver): boolean {
    if (!this.requestedDrivers) return false;

    return this.requestedDrivers.some(
      (request) => request.driver.driverId === driver.driverId
    );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
