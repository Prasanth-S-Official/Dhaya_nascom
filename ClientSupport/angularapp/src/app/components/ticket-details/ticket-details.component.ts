import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';
import { SupportAgentService } from 'src/app/services/support-agent.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {
  ticket: any = null;
  agent: any = null;
  isLoading: boolean = true;
  errorMessage: string = '';
  resolutionSummary: string = '';
  satisfied: boolean | null = null;
  notificationMessage: string = '';
  showSummaryModal: boolean = false;
  showConfirmPopupModal: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService,
    private agentService: SupportAgentService
  ) {}

  ngOnInit(): void {
    const ticketId = this.route.snapshot.paramMap.get('ticketId');
    if (ticketId) {
      this.fetchTicketDetails(Number(ticketId));
    } else {
      this.errorMessage = 'Invalid ticket ID';
      this.isLoading = false;
    }
  }

  fetchTicketDetails(ticketId: number): void {
    this.ticketService.getTicketById(ticketId).subscribe(
      (data: any) => {
        this.ticket = data;
        if (data.supportAgent) {
          this.fetchAgentDetails(data.supportAgent.agentId);
        }
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load ticket details.';
        this.isLoading = false;
      }
    );
  }

  fetchAgentDetails(agentId: number): void {
    this.agentService.getAgentById(agentId).subscribe(
      (data: any) => {
        this.agent = data;
      },
      (error) => {
        console.error('Failed to load agent details:', error);
      }
    );
  }

  toggleSummaryModal(): void {
    this.showSummaryModal = !this.showSummaryModal;
    if (this.ticket.status === 'Resolved') {
      this.resolutionSummary = this.ticket.resolutionSummary;
      this.satisfied = this.ticket.satisfied;
    }
  }

  closeSummaryModal(): void {
    this.showSummaryModal = false;
  }

  showConfirmPopup(): void {
    if (!this.resolutionSummary || this.satisfied === null) {
      this.showNotification('Please provide a resolution summary and select satisfaction status.');
      return;
    }
    this.showConfirmPopupModal = true;
  }

  closeConfirmPopup(): void {
    this.showConfirmPopupModal = false;
  }

  confirmSummary(): void {
    if (!this.resolutionSummary || this.satisfied === null) {
      this.showNotification('Please provide a resolution summary and select satisfaction status.');
      return;
    }
  
    // Update the ticket object with the provided resolution details
    const updatedTicket = {
      ...this.ticket,
      resolutionSummary: this.resolutionSummary,
      satisfied: this.satisfied,
    };
  
    // Call the backend to update the ticket
    this.ticketService.updateTicket(this.ticket.ticketId, updatedTicket).subscribe(
      (response: any) => {
        console.log(response);
        
        this.ticket = response; // Update the local ticket object with the response
        this.closeSummaryModal();
        this.closeConfirmPopup();
        this.showNotification('Resolution summary successfully updated.');
      },
      (error) => {
        console.error('Error updating resolution summary:', error);
        this.showNotification('Failed to update resolution summary. Please try again.');
      }
    );
  }
  
  resolveTicket(): void {
    if (!this.ticket.resolutionSummary || this.ticket.satisfied === null) {
      this.showNotification('Please provide resolution details before marking resolve.');
      return;
    }

    const updatedTicket = {
      ...this.ticket,
      status: 'Resolved',
      resolutionDate: new Date().toISOString()
    };

    this.ticketService.updateTicket(this.ticket.ticketId, updatedTicket).subscribe(
      () => {
        this.router.navigate(['/client/view/ticket']);
      },
      (error) => {
        console.error('Error resolving ticket:', error);
      }
    );
  }

  showNotification(message: string): void {
    this.notificationMessage = message;
    setTimeout(() => {
      this.notificationMessage = '';
    }, 3000);
  }

  goBack(): void {
    // Use Angular's Location service or Router to navigate back
    history.back(); // Simple browser back navigation
  }
  
}
