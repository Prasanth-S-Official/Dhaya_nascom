import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { BidService } from 'src/app/services/bid.service';

@Component({
  selector: 'app-client-view-requests',
  templateUrl: './client-view-requests.component.html',
  styleUrls: ['./client-view-requests.component.css']
})
export class ClientViewRequestsComponent implements OnInit {
  projects: any[] = [];
  totalBids = 0;
  totalProjectValue = 0;
  showBidsPopup = false;
  selectedProject: any = null;
  displayedBids: any[] = [];
  highlightedBid: any = null;

  constructor(private projectService: ProjectService, private bidService: BidService) {}

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(): void {
    this.projectService.getAllProjects().subscribe(
      (projects: any[]) => {
        this.projects = projects.map(project => ({
          ...project,
          bids: [] // Initialize empty bids array
        }));

        this.calculateDashboardMetrics();
        this.fetchBidsForProjects();
      },
      error => console.error('Error fetching projects:', error)
    );
  }

  fetchBidsForProjects(): void {
    this.projects.forEach(project => {
      this.bidService.getBidsByProjectId(project.projectId).subscribe(
        bids => {
          project.bids = bids;
          this.calculateDashboardMetrics();
        },
        error => console.error(`Error fetching bids for project ${project.projectId}:`, error)
      );
    });
  }

  calculateDashboardMetrics(): void {
    this.totalBids = this.projects.reduce((total, project) => total + project.bids.length, 0);
    this.totalProjectValue = this.projects.reduce((total, project) => total + project.budget, 0);
  }

  handleProjectClick(project: any): void {
    this.selectedProject = project;
    this.displayedBids = [...project.bids];
    this.showBidsPopup = true;

    // Highlight the least bid after 3 seconds
    setTimeout(() => {
      this.highlightedBid = this.displayedBids.reduce((prev, current) =>
        prev.bidAmount < current.bidAmount ? prev : current
      );
    }, 3000);
  }

  closeBidsPopup(): void {
    this.showBidsPopup = false;
    this.selectedProject = null;
  }

  updateBidStatus(bid: any, status: string): void {
    bid.status = status;
    this.bidService.updateBid(bid.bidId, bid).subscribe(
      () => console.log('Bid status updated successfully'),
      error => console.error('Error updating bid status:', error)
    );
  }
}
