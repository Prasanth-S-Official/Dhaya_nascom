import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { BidService } from 'src/app/services/bid.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-view-requests',
  templateUrl: './client-view-requests.component.html',
  styleUrls: ['./client-view-requests.component.css'],
})
export class ClientViewRequestsComponent implements OnInit {
  projects: any[] = [];
  totalBids = 0;
  totalProjectValue = 0;
  showBidsPopup = false;
  showMorePopup = false;
  selectedProject: any = null;
  displayedBids: any[] = [];
  highlightedBid: any = null;
  showConfirmationPopup = false;
  currentAction = '';
  currentBid: any = null;

  constructor(private projectService: ProjectService, private bidService: BidService , private router : Router) {}

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(): void {
    this.projectService.getAllProjects().subscribe(
      (projects: any[]) => {
        this.projects = projects.map((project) => ({
          ...project,
          bids: [],
          hasUndo: false,
        }));

        this.calculateDashboardMetrics();
        this.fetchBidsForProjects();
      },
      (error) => console.error('Error fetching projects:', error)
    );
  }

  fetchBidsForProjects(): void {
    this.projects.forEach((project) => {
      this.bidService.getBidsByProjectId(project.projectId).subscribe(
        (bids) => {
          project.bids = bids.map((bid) => ({
            ...bid,
            resumeImage: bid.resumeImage || null,
          }));
          this.calculateDashboardMetrics();
        },
        (error) => console.error(`Error fetching bids for project ${project.projectId}:`, error)
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

  openShowMoreModal(bid: any): void {
    this.currentBid = bid;
    this.showMorePopup = true;
  }
  
  closeShowMoreModal(): void {
    this.showMorePopup = false;
    this.currentBid = null;
  }
  

  confirmAction(action: string, bid: any): void {
    this.currentAction = action;
    this.currentBid = bid;
    this.showConfirmationPopup = true;
  }

  cancelAction(): void {
    this.showConfirmationPopup = false;
    this.currentAction = '';
    this.currentBid = null;
  }

  performAction(): void {
    if (this.currentAction === 'accept') {
      this.acceptBid(this.currentBid);
    } else if (this.currentAction === 'reject') {
      this.rejectBid(this.currentBid);
    } else if (this.currentAction === 'undo') {
      this.undoAllBids();
    }
    this.showConfirmationPopup = false;
  }

  acceptBid(bid: any): void {
    bid.status = 'Accepted';
    this.updateBidStatus(bid);
    this.selectedProject.bids.forEach((otherBid) => {
      if (otherBid.bidId !== bid.bidId && otherBid.status === 'Pending') {
        otherBid.status = 'Rejected';
        this.updateBidStatus(otherBid);
      }
    });
    this.selectedProject.hasUndo = true;
  }

  rejectBid(bid: any): void {
    bid.status = 'Rejected';
    this.updateBidStatus(bid);
    this.selectedProject.hasUndo = true;
  }

  undoAllBids(): void {
    this.selectedProject.bids.forEach((bid) => {
      if (bid.status !== 'Pending') {
        bid.status = 'Pending';
        this.updateBidStatus(bid);
      }
    });
    this.selectedProject.hasUndo = false;
  }

  updateBidStatus(bid: any): void {
    this.bidService.updateBid(bid.bidId, bid).subscribe(
      () => console.log(`Bid ${bid.bidId} updated successfully`),
      (error) => console.error('Error updating bid status:', error)
    );
  }

  writeReview(projectId: number, bidId: number): void {
    this.router.navigate(['/write-review'], {
      queryParams: { projectId: projectId, bidId: bidId },
    });
  
}
}
