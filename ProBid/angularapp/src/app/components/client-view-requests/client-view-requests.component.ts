import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { BidService } from 'src/app/services/bid.service';
import { Router } from '@angular/router';

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

  constructor(private projectService: ProjectService, private bidService: BidService , private router : Router) {}

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(): void {
    this.projectService.getAllProjects().subscribe(
      (projects: any[]) => {
        this.projects = projects.map(project => ({
          ...project,
          bids: [],
          hasUndo: false // Tracks if undo is available for the project
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

  acceptBid(selectedBid: any): void {
    this.displayedBids.forEach(bid => {
      if (bid.bidId !== selectedBid.bidId && bid.status === 'Pending') {
        bid.previousStatus = bid.status;
        bid.status = 'Rejected';
        this.updateBidStatus(bid, 'Rejected');
      }
    });

    selectedBid.previousStatus = selectedBid.status;
    selectedBid.status = 'Accepted';
    this.updateBidStatus(selectedBid, 'Accepted');

    this.selectedProject.hasUndo = true; // Enable undo for the project
  }

  rejectBid(bid: any): void {
    bid.previousStatus = bid.status;
    bid.status = 'Rejected';
    this.updateBidStatus(bid, 'Rejected');

    this.selectedProject.hasUndo = true; // Enable undo for the project
  }

  undoAllBids(): void {
    this.displayedBids.forEach(bid => {
      if (bid.previousStatus) {
        bid.status = bid.previousStatus;
        delete bid.previousStatus;
        this.updateBidStatus(bid, bid.status);
      }
    });

    this.selectedProject.hasUndo = false; // Disable undo for the project
  }

  updateBidStatus(bid: any, status: string): void {
    this.bidService.updateBid(bid.bidId, bid).subscribe(
      () => console.log('Bid status updated successfully'),
      error => console.error('Error updating bid status:', error)
    );
  }

  writeReview(userId: number): void {
    this.router.navigate(['/client/add/review', userId]);
  }
}
