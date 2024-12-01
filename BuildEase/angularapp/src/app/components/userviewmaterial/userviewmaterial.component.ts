
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { MaterialService } from 'src/app/services/material.service';
import { MaterialRequestService } from 'src/app/services/material-request.service';
import { Material } from 'src/app/models/material.model';

@Component({
  selector: 'app-userviewmaterial',
  templateUrl: './userviewmaterial.component.html',
  styleUrls: ['./userviewmaterial.component.css']
})
export class UserviewmaterialComponent implements OnInit {

  availableMaterials: Material[] = [];
  filteredMaterials: Material[] = [];
  requestedMaterials: any[] = [];
  searchField: string = '';

  constructor(
    private router: Router,
    private materialService: MaterialService,
    private materialRequestService: MaterialRequestService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    const userId = Number(localStorage.getItem('userId'));

    forkJoin({
      requestedMaterials: this.materialRequestService.getMaterialRequestsByUserId(userId),
      allMaterials: this.materialService.getAllMaterials(),
    }).subscribe(
      ({ requestedMaterials, allMaterials }) => {
        this.requestedMaterials = requestedMaterials || [];
        this.availableMaterials = allMaterials;
        this.filteredMaterials = this.availableMaterials;
        console.log('Requested materials:', this.requestedMaterials);
        console.log('Available materials:', this.availableMaterials);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  handleSearchChange(searchValue: string): void {
    this.searchField = searchValue;
    this.filteredMaterials = this.filterMaterials(searchValue);
  }

  filterMaterials(search: string): Material[] {
    const searchLower = search.toLowerCase();
    return this.availableMaterials.filter(
      (material) =>
        material.materialName.toLowerCase().includes(searchLower) ||
        material.description.toLowerCase().includes(searchLower) ||
        material.category.toLowerCase().includes(searchLower)
    );
  }

  handleRequestClick(material: Material): void {
    if (this.isMaterialRequested(material)) {
      alert('You have already requested this material.');
    } else {
      localStorage.setItem('materialId', material.materialId.toString());
      this.router.navigate(['/user/add/request']);
    }
  }

  isMaterialRequested(material: Material): boolean {
    if (!this.requestedMaterials) return false;

    return this.requestedMaterials.some(
      (request) => request.material.materialId === material.materialId
    );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}