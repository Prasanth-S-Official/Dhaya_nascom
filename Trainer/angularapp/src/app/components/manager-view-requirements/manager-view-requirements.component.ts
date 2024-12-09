import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequirementService } from 'src/app/services/requirement.service';

@Component({
  selector: 'app-manager-view-requirements',
  templateUrl: './manager-view-requirements.component.html',
  styleUrls: ['./manager-view-requirements.component.css']
})
export class ManagerViewRequirementsComponent implements OnInit {
  allRequirements: any[] = [];
  filteredRequirements: any[] = [];
  showDeletePopup = false;
  requirementToDelete: number | null = null;
  searchField = '';
  selectedStatus: string | null = null;
  status: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private requirementService: RequirementService) {}

  ngOnInit(): void {
    this.fetchRequirements();
  }

  fetchRequirements() {
    this.status = 'loading';
    this.requirementService.getAllRequirements().subscribe(
      (data: any) => {
        this.allRequirements = data;
        this.filteredRequirements = data;
        this.status = this.filteredRequirements.length === 0 ? 'noRecords' : '';
      },
      (error) => {
        console.error('Error fetching requirements:', error);
        this.status = 'error';
      }
    );
  }

  handleDeleteClick(requirementId: number) {
    this.requirementToDelete = requirementId;
    this.showDeletePopup = true;
  }

  handleConfirmDelete() {
    if (this.requirementToDelete) {
      this.requirementService.deleteRequirement(this.requirementToDelete).subscribe(
        () => {
          this.closeDeletePopup();
          this.fetchRequirements();
          this.errorMessage = '';
        },
        (error) => {
          console.error('Error deleting requirement:', error);
          this.errorMessage = error.error.message || 'Failed to delete requirement';
        }
      );
    }
  }

  closeDeletePopup() {
    this.requirementToDelete = null;
    this.showDeletePopup = false;
    this.errorMessage = '';
  }

  navigateToEditRequirement(id: number) {
    this.router.navigate(['/manager/edit/requirement', id]);
  }

  applyFilters(): void {
    this.filteredRequirements = this.allRequirements.filter((requirement) => {
      const matchesSearch =
        requirement.title.toLowerCase().includes(this.searchField.toLowerCase()) ||
        requirement.department.toLowerCase().includes(this.searchField.toLowerCase());

      const matchesStatus = !this.selectedStatus || requirement.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });

    this.status = this.filteredRequirements.length === 0 ? 'noRecords' : '';
  }
}
