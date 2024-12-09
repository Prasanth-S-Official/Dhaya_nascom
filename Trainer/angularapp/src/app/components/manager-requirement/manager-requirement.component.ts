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
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private requirementService: RequirementService
  ) {
    this.requirementForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      department: ['', Validators.required],
      duration: ['', Validators.required],
      mode: ['', Validators.required],
      location: [''],
      skillLevel: ['', Validators.required],
      budget: ['', [Validators.required, Validators.min(0.01)]],
      priority: [''],
      trainerId: [null],
    });
  }

  ngOnInit(): void {
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
        requirementId: this.id || undefined,
      };

      if (this.id) {
        this.requirementService.updateRequirement(this.id, requirement).subscribe(
          () => this.showSuccessPopup(),
          () => console.error('Error updating requirement')
        );
      } else {
        this.requirementService.addRequirement(requirement).subscribe(
          () => this.showSuccessPopup(),
          () => console.error('Error adding requirement')
        );
      }
    }
  }

  showSuccessPopup(): void {
    this.successPopup = true;
  }

  handleSuccessMessage(): void {
    this.successPopup = false;
    this.requirementForm.reset();
    this.router.navigate(['/manager/view/requirements']);
  }
}