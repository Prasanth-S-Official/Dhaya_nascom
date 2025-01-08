import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialService } from 'src/app/services/material.service';

@Component({
  selector: 'app-admin-view-material',
  templateUrl: './admin-view-material.component.html',
  styleUrls: ['./admin-view-material.component.css']
})
export class AdminViewMaterialComponent implements OnInit {
  availableMaterials: any[] = [];
  allMaterials: any[] = [];
  showDeletePopup = false;
  materialToDelete: number | null = null;
  searchField = '';
  selectedCategory: string | null = null;
  status: string = '';
  errorMessage: string = '';
  uniqueCategories: string[] = [];

  constructor(private router: Router, private materialService: MaterialService) {}

  ngOnInit(): void {
    this.fetchAvailableMaterials();
  }

  fetchAvailableMaterials() {
    this.status = 'loading';
    this.materialService.getAllMaterials().subscribe(
      (data: any) => {
        this.availableMaterials = data;
        this.allMaterials = data;
        this.uniqueCategories = this.getUniqueCategories(data);
        this.status = this.availableMaterials.length === 0 ? 'noRecords' : '';
      },
      (error) => {
        console.error('Error fetching materials:', error);
        this.status = 'error';
      }
    );
  }

  getUniqueCategories(materials: any[]): string[] {
    return Array.from(new Set(materials.map((material) => material.category)));
  }

  handleDeleteClick(materialId: string) {
    this.materialToDelete = Number(materialId);
    this.showDeletePopup = true;
  }

  navigateToEditMaterial(id: string) {
    this.router.navigate(['/admin/edit/material', id]);
  }

  handleConfirmDelete() {
    if (this.materialToDelete) {
      this.materialService.deleteMaterial(this.materialToDelete).subscribe(
        () => {
          this.closeDeletePopup();
          this.fetchAvailableMaterials();
          this.errorMessage = '';
        },
        (error) => {
          console.error('Error deleting material:', error);
          this.errorMessage = error.error.message;
        }
      );
    }
  }

  closeDeletePopup() {
    this.materialToDelete = null;
    this.showDeletePopup = false;
    this.errorMessage = '';
  }

  applyFilters(): void {
    this.availableMaterials = this.allMaterials.filter((material) => {
      const matchesSearch =
        material.materialName.toLowerCase().includes(this.searchField.toLowerCase()) ||
        material.description.toLowerCase().includes(this.searchField.toLowerCase());

      const matchesCategory = !this.selectedCategory || material.category === this.selectedCategory;

      return matchesSearch && matchesCategory;
    });

    this.status = this.availableMaterials.length === 0 ? 'noRecords' : '';
  }

  toggleAvailability(material: any): void {
    const newStatus = material.availabilityStatus === 'In Stock' ? 'Out of Stock' : 'In Stock';
    const updatedMaterial = { ...material, availabilityStatus: newStatus };

    this.materialService.updateMaterial(material.materialId, updatedMaterial).subscribe(
      () => {
        material.availabilityStatus = newStatus; // Update the local data
      },
      (error) => {
        console.error('Error updating material availability:', error);
      }
    );
  }
}
