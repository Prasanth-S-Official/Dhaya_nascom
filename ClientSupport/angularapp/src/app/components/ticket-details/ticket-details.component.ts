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
  showActionPopup: boolean = false;
  actionType: string = ''; // 'accept' or 'reject'
  popupMessage: string = '';

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

  showPopup(action: string): void {
    this.actionType = action;
    this.popupMessage = action === 'accept' 
      ? 'Are you sure you want to accept this agent?' 
      : 'Are you sure you want to reject this agent?';
    this.showActionPopup = true;
  }

  closePopup(): void {
    this.showActionPopup = false;
  }

  confirmAction(): void {
    if (this.actionType === 'accept') {
      this.acceptAgent();
    } else if (this.actionType === 'reject') {
      this.rejectAgent();
    }
  }

  acceptAgent(): void {
    const updatedTicket = { ...this.ticket, status: 'Resolved' };
    this.ticketService.updateTicket(this.ticket.ticketId, updatedTicket).subscribe(
      () => {
        this.router.navigate(['/manager/view/tickets']);
      },
      (error) => {
        console.error('Error accepting agent:', error);
      }
    );
  }

  rejectAgent(): void {
    const updatedTicket = { ...this.ticket, supportAgent: null };
    this.ticketService.updateTicket(this.ticket.ticketId, updatedTicket).subscribe(
      () => {
        this.router.navigate(['/manager/view/tickets']);
      },
      (error) => {
        console.error('Error rejecting agent:', error);
      }
    );
  }
}
