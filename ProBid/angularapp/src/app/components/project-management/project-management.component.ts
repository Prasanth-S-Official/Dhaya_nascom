import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css'],
})
export class ProjectManagementComponent implements OnInit {
  projectForm: FormGroup;
  successPopup = false;
  id: number | null = null;
  showError = false;

  categories: string[] = ['Web Development', 'Graphic Design', 'Mobile App Development', 'SEO Optimization'];
  priorities: string[] = ['High', 'Medium', 'Low'];
  paymentTerms: string[] = ['Milestone-based', 'Hourly Rate', 'Fixed Price'];

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      budget: ['', [Validators.required, Validators.min(1)]],
      deadline: ['', Validators.required],
      category: ['', Validators.required],
      skillsRequired: ['', Validators.required],
      attachments: [''], // Optional file field
      priority: ['', Validators.required],
      paymentTerms: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? Number(idParam) : null;
    if (this.id) {
      this.fetchProject(this.id);
    }
  }

  fetchProject(projectId: number): void {
    this.projectService.getProjectById(projectId).subscribe(
      (response) => {
        this.projectForm.patchValue(response);
      },
      (error) => {
        console.error('Error fetching project:', error);
        this.router.navigate(['/error']); // Navigate to error page if fetching fails
      }
    );
  }

  onSubmit(): void {
    if (this.projectForm.invalid) {
      this.showErrorMessage();
      return;
    }

    const projectData: Project = {
      ...this.projectForm.value,
      status: 'Open', // Default status for new projects
      user: { userId: Number(localStorage.getItem('userId')) }, // Fetch userId from local storage
    };

    if (this.id) {
      this.projectService.updateProject(this.id, projectData).subscribe(
        () => this.showSuccessPopup(),
        (error) => {
          console.error('Error updating project:', error);
          this.router.navigate(['/error']); // Navigate to error page if update fails
        }
      );
    } else {
      this.projectService.addProject(projectData).subscribe(
        () => this.showSuccessPopup(),
        (error) => {
          console.error('Error adding project:', error);
          this.router.navigate(['/error']); // Navigate to error page if addition fails
        }
      );
    }
  }

  showErrorMessage(): void {
    this.showError = true;
    setTimeout(() => {
      this.showError = false;
    }, 3000);
  }

  showSuccessPopup(): void {
    this.successPopup = true;
  }

  handleSuccessMessage(): void {
    this.successPopup = false;
    this.router.navigate(['/client/view/projects']);
  }

  navigateBack(): void {
    this.router.navigate(['/client/view/projects']);
  }
}
