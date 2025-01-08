import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Material } from 'src/app/models/material.model';
import { MaterialService } from 'src/app/services/material.service';

@Component({
  selector: 'app-admin-material',
  templateUrl: './admin-material.component.html',
  styleUrls: ['./admin-material.component.css']
})
export class AdminMaterialComponent implements OnInit {
  materialForm: FormGroup;
  successPopup = false;
  errorMessage = '';
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private materialService: MaterialService
  ) {
    this.materialForm = this.fb.group({
      materialName: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      pricePerUnit: ['', [Validators.required, Validators.min(0.01)]],
      unitType: ['', Validators.required],
      availabilityStatus: ['In Stock', Validators.required],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? Number(idParam) : null;
    if (this.id) {
      this.fetchMaterial(this.id);
    }
  }

  fetchMaterial(id: number): void {
    this.materialService.getMaterialById(id).subscribe(
      (response) => {
        console.log("fetchMaterial",response);
        this.materialForm.patchValue(response);
      },
      () => {
        this.router.navigate(['/error']);
      }
    );
  }

  onSubmit(): void {
    if (this.materialForm.valid) {
      const formData = this.materialForm.value;

      const material: Material = {
        ...formData,
        materialId: this.id || undefined,
      };

      if (this.id) {
        this.materialService.updateMaterial(this.id, material).subscribe(
          () => this.showSuccessPopup(),
          () => this.showErrorPopup('Error updating material')
        );
      } else {
        console.log("AddMaterial",material);
        this.materialService.addMaterial(material).subscribe(
          () => this.showSuccessPopup(),
          () => this.showErrorPopup('Error adding material')
        );
      }
    } else {
      this.errorMessage = 'All fields are required.';
    }
  }

  showSuccessPopup(): void {
    this.successPopup = true;
  }

  showErrorPopup(message: string): void {
    this.errorMessage = message;
  }

  handleSuccessMessage(): void {
    this.successPopup = false;
    this.errorMessage = '';
    this.materialForm.reset();
    this.router.navigate(['/admin/view/materials']);
  }

  navigateBack(): void {
    this.router.navigate(['/admin/view/materials']);
  }
}
