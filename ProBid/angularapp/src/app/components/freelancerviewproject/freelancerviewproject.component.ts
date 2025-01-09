import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { BidService } from 'src/app/services/bid.service';

@Component({
  selector: 'app-freelancerviewproject',
  templateUrl: './freelancerviewproject.component.html',
  styleUrls: ['./freelancerviewproject.component.css'],
})
export class FreelancerviewprojectComponent implements OnInit {
  availableProjects: Project[] = [];
  filteredProjects: Project[] = [];
  placedBids: any[] = [];
  searchField: string = '';

  constructor(
    private router: Router,
    private projectService: ProjectService,
    private bidService: BidService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    const userId = Number(localStorage.getItem('userId'));

    forkJoin({
      placedBids: this.bidService.getBidsByUserId(userId),
      allProjects: this.projectService.getAllProjects(),
    }).subscribe(
      ({ placedBids, allProjects }) => {
        this.placedBids = placedBids || [];
        this.availableProjects = allProjects;
        this.filteredProjects = this.availableProjects;
        console.log('Placed bids:', this.placedBids);
        console.log('Available projects:', this.availableProjects);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  handleSearchChange(searchValue: string): void {
    this.searchField = searchValue;
    this.filteredProjects = this.filterProjects(searchValue);
  }

  filterProjects(search: string): Project[] {
    const searchLower = search.toLowerCase();
    return this.availableProjects.filter(
      (project) =>
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.category.toLowerCase().includes(searchLower) ||
        project.skillsRequired.toLowerCase().includes(searchLower)
    );
  }

  handleBidClick(project: Project): void {
    if (this.isProjectBid(project)) {
      alert('You have already placed a bid on this project.');
    } else {
      localStorage.setItem('projectId', project.projectId.toString());
      this.router.navigate(['/freelancer/add/bid']);
    }
  }

  isProjectBid(project: Project): boolean {
    if (!this.placedBids) return false;

    return this.placedBids.some(
      (bid) => bid.project.projectId === project.projectId
    );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
