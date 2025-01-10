import { Component, OnInit } from '@angular/core';
import { BidService } from 'src/app/services/bid.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-client-view-requests',
  templateUrl: './client-view-requests.component.html',
  styleUrls: ['./client-view-requests.component.css']
})
export class ClientViewRequestsComponent implements OnInit {
  projects: any[] = [];
  totalBids = 0;
  totalProjectValue = 0;
  selectedProject: any = null;
  displayedBids: any[] = [];
  highlightedBid: any = null;

  constructor(private projectService: ProjectService, private bidService: BidService) {}

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(): void {
    this.projectService.getAllProjects().subscribe(
      (projects) => {
        this.projects = projects;
        this.calculateDashboardMetrics();
      },
      (error) => console.error('Error fetching projects:', error)
    );
  }

  calculateDashboardMetrics(): void {
    this.totalBids = 0;
    this.totalProjectValue = 0;

    for (let project of this.projects) {
      this.totalProjectValue += project.budget;
      this.fetchBidsForProject(project);
    }
  }

  fetchBidsForProject(project: any): void {
    this.bidService.getBidsByProjectId(project.projectId).subscribe(
      (bids) => {
        project.bids = bids;
        this.totalBids += bids.length;
      },
      (error) => console.error('Error fetching bids:', error)
    );
  }

  handleProjectClick(project: any): void {
    this.selectedProject = project;
    this.displayedBids = [...project.bids];

    setTimeout(() => {
      this.reorderBids();
    }, 3000); // Transition after 3 seconds
  }

  reorderBids(): void {
    this.displayedBids.sort((a, b) => a.bidAmount - b.bidAmount);
    this.highlightedBid = this.displayedBids[0];

    setTimeout(() => {
      this.highlightedBid = null; // Remove highlight after a delay
    }, 5000);
  }
}
