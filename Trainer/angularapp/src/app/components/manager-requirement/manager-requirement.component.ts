import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Requirement } from 'src/app/models/requirement.model';
import { RequirementService } from 'src/app/services/requirement.service';

@Component({
  selector: 'app-manager-requirement',
  templateUrl: './manager-requirement.component.html',
  styleUrls: ['./manager-requirement.component.css']
})
export class ManagerRequirementComponent implements OnInit {

  requirementForm: FormGroup;
  successPopup = false;
  errorMessage = '';
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private requirementService: RequirementService
  ) {
    // Initialize the form with required fields
    this.requirementForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      department: ['', Validators.required],
      status: ['Open'], // Default status
      duration: ['', Validators.required],
      mode: ['', Validators.required],
      location: [''],
      skillLevel: ['', Validators.required],
      budget: ['', [Validators.required, Validators.min(0.01)]],
      priority: [''],
      trainerId: [null], // Optional trainer assignment
    });
  }

  ngOnInit(): void {
    // Extract ID from route parameters if provided
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? Number(idParam) : null;
    if (this.id) {
      this.fetchRequirement(this.id);
    }
  }

  fetchRequirement(id: number): void {
    this.requirementService.getRequirementById(id).subscribe(
      (response) => this.requirementForm.patchValue(response),
      () => this.router.navigate(['/error'])
    );
  }

  onSubmit(): void {
    if (this.requirementForm.valid) {
      const formData = this.requirementForm.value;

      const requirement: Requirement = {
        ...formData,
        postedDate: new Date().toISOString(), // Set the current date as postedDate
        requirementId: this.id || undefined, // Include ID for updates
      };

      if (this.id) {
        this.requirementService.updateRequirement(this.id, requirement).subscribe(
          () => this.showSuccessPopup('Requirement Updated Successfully!'),
          (error) => this.showErrorPopup('Error updating requirement: ' + error.message)
        );
      } else {
        console.log("requirement",requirement);
        this.requirementService.addRequirement(requirement).subscribe(
          () => this.showSuccessPopup('Requirement Added Successfully!'),
          (error) => this.showErrorPopup('Error adding requirement: ' + error.message)
        );
      }
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }

  showSuccessPopup(message: string): void {
    this.successPopup = true;
    this.errorMessage = message;
  }

  showErrorPopup(message: string): void {
    this.errorMessage = message;
  }

  handleSuccessMessage(): void {
    this.successPopup = false;
    this.requirementForm.reset();
    this.router.navigate(['/manager/view/requirements']);
  }

  navigateBack(): void {
    this.router.navigate(['/manager/view/requirements']);
  }
}
