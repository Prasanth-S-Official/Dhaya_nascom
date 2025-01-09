// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { ProjectService } from 'src/app/services/project.service';
// import { Project } from 'src/app/models/project.model';

// @Component({
//   selector: 'app-client-view-projects',
//   templateUrl: './client-view-projects.component.html',
//   styleUrls: ['./client-view-projects.component.css']
// })
// export class ClientViewProjectsComponent implements OnInit {

//   allProjects: Project[] = [];
//   filteredProjects: Project[] = [];
//   showDeletePopup = false;
//   projectToDelete: number | null = null;
//   searchField = '';
//   selectedStatus: string | null = null;
//   status: string = '';
//   errorMessage: string = '';

//   constructor(private router: Router, private projectService: ProjectService) {}

//   ngOnInit(): void {
//     this.fetchProjects();
//   }

//   fetchProjects(): void {
//     this.status = 'loading';
//     this.projectService.getAllProjects().subscribe(
//       (data: Project[]) => {
//         console.log("FetchALL",data);
        
//         this.allProjects = data;
//         this.filteredProjects = data;
//         this.status = this.filteredProjects.length === 0 ? 'noRecords' : '';
//       },
//       (error) => {
//         console.error('Error fetching projects:', error);
//         this.status = 'error';
//       }
//     );
//   }

//   handleDeleteClick(projectId: number): void {
//     this.projectToDelete = projectId;
//     this.showDeletePopup = true;
//   }

//   handleConfirmDelete(): void {
//     if (this.projectToDelete) {
//       this.projectService.deleteProject(this.projectToDelete).subscribe(
//         () => {
//           this.closeDeletePopup();
//           this.fetchProjects();
//           this.errorMessage = '';
//         },
//         (error) => {
//           console.error('Error deleting project:', error);
//           this.errorMessage = error.error.message || 'Failed to delete project';
//         }
//       );
//     }
//   }

//   closeDeletePopup(): void {
//     this.projectToDelete = null;
//     this.showDeletePopup = false;
//     this.errorMessage = '';
//   }

//   navigateToEditProject(projectId: number): void {
//     this.router.navigate(['/client/edit/project', projectId]);
//   }

//   applyFilters(): void {
//     this.filteredProjects = this.allProjects.filter((project) => {
//       const matchesSearch =
//         project.title.toLowerCase().includes(this.searchField.toLowerCase()) ||
//         project.category.toLowerCase().includes(this.searchField.toLowerCase());

//       const matchesStatus = !this.selectedStatus || project.status === this.selectedStatus;

//       return matchesSearch && matchesStatus;
//     });

//     this.status = this.filteredProjects.length === 0 ? 'noRecords' : '';
//   }
// }
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-client-view-projects',
  templateUrl: './client-view-projects.component.html',
  styleUrls: ['./client-view-projects.component.css'],
})
export class ClientViewProjectsComponent implements OnInit {
  allProjects: Project[] = [];
  filteredProjects: Project[] = [];
  showDeletePopup = false;
  projectToDelete: number | null = null;
  searchField = '';
  selectedStatus: string | null = null;
  status: string = '';
  errorMessage: string = '';

  showAttachmentPopup = false;
  attachmentUrl = '';
  attachmentType: string | null = null;
  loadingAttachment = false;

  constructor(
    private router: Router,
    private projectService: ProjectService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(): void {
    this.status = 'loading';
    this.projectService.getAllProjects().subscribe(
      (data: Project[]) => {
        this.allProjects = data;
        this.filteredProjects = data;
        this.status = this.filteredProjects.length === 0 ? 'noRecords' : '';
      },
      (error) => {
        console.error('Error fetching projects:', error);
        this.status = 'error';
      }
    );
  }

  handleDeleteClick(projectId: number): void {
    this.projectToDelete = projectId;
    this.showDeletePopup = true;
  }

  handleConfirmDelete(): void {
    if (this.projectToDelete) {
      this.projectService.deleteProject(this.projectToDelete).subscribe(
        () => {
          this.closeDeletePopup();
          this.fetchProjects();
          this.errorMessage = '';
        },
        (error) => {
          console.error('Error deleting project:', error);
          this.errorMessage =
            error.error.message || 'Failed to delete project';
        }
      );
    }
  }

  closeDeletePopup(): void {
    this.projectToDelete = null;
    this.showDeletePopup = false;
    this.errorMessage = '';
  }

  navigateToEditProject(projectId: number): void {
    this.router.navigate(['/client/edit/project', projectId]);
  }

  applyFilters(): void {
    this.filteredProjects = this.allProjects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(this.searchField.toLowerCase()) ||
        project.category.toLowerCase().includes(this.searchField.toLowerCase());

      const matchesStatus =
        !this.selectedStatus || project.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });

    this.status = this.filteredProjects.length === 0 ? 'noRecords' : '';
  }

  viewAttachment(url: string): void {
    this.showAttachmentPopup = true;
    this.attachmentUrl = url;
    this.loadingAttachment = true;

    this.http
      .head(url, { observe: 'response', responseType: 'text', headers: new HttpHeaders({}) })
      .subscribe(
        (response) => {
          console.log("res" ,response);
          const contentType = response.headers.get('Content-Type');
          this.determineAttachmentType(contentType);
          this.loadingAttachment = false;
        },
        (error) => {
          console.error('Error fetching metadata:', error);
          this.attachmentType = 'unsupported';
          this.loadingAttachment = false;
        }
      );
  }

  private determineAttachmentType(contentType: string | null): void {
    if (contentType) {
      if (contentType.includes('pdf')) {
        this.attachmentType = 'pdf';
      } else if (contentType.startsWith('image/')) {
        this.attachmentType = 'image';
      } else {
        this.attachmentType = 'unsupported';
      }
    } else {
      this.attachmentType = 'unsupported';
    }
  }

  closeAttachmentPopup(): void {
    this.showAttachmentPopup = false;
    this.attachmentUrl = '';
    this.attachmentType = null;
  }
}
