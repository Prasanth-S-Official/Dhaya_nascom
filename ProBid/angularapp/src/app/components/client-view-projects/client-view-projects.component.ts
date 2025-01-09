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
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-client-projects',
  templateUrl: './client-projects.component.html',
  styleUrls: ['./client-projects.component.css'],
})
export class ClientProjectsComponent implements OnInit {
  allProjects: any[] = [];
  filteredProjects: any[] = [];
  searchField = '';
  selectedStatus: string | null = null;
  showAttachmentPopup = false;
  attachmentUrl: string | null = null;
  attachmentType: string | null = null;
  loadingAttachment = false;

  constructor(private router: Router, private projectService: ProjectService) {}

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(): void {
    this.projectService.getAllProjects().subscribe(
      (projects) => {
        this.allProjects = projects;
        this.filteredProjects = projects;
      },
      (error) => console.error('Error fetching projects:', error)
    );
  }

  applyFilters(): void {
    this.filteredProjects = this.allProjects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(this.searchField.toLowerCase()) ||
        project.category.toLowerCase().includes(this.searchField.toLowerCase());

      const matchesStatus = !this.selectedStatus || project.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  navigateToEditProject(projectId: number): void {
    this.router.navigate(['/client/edit/project', projectId]);
  }

  handleDeleteClick(projectId: number): void {
    this.projectService.deleteProject(projectId).subscribe(
      () => this.fetchProjects(),
      (error) => console.error('Error deleting project:', error)
    );
  }

  viewAttachment(url: string): void {
    this.showAttachmentPopup = true;
    this.attachmentUrl = url;
    this.loadingAttachment = true;

    const fileExtension = url.split('.').pop()?.toLowerCase();
    if (fileExtension === 'pdf') {
      this.attachmentType = 'pdf';
    } else if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension!)) {
      this.attachmentType = 'image';
    } else {
      this.attachmentType = null;
    }

    setTimeout(() => {
      this.loadingAttachment = false;
    }, 1000);
  }

  closeAttachmentPopup(): void {
    this.showAttachmentPopup = false;
    this.attachmentUrl = null;
    this.attachmentType = null;
  }
}
