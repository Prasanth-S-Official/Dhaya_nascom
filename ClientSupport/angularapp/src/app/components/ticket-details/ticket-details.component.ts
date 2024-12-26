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
  satisfied: boolean = false;

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

  submitFeedback(): void {
    if (!this.resolutionSummary.trim()) {
      alert('Resolution summary is required.');
      return;
    }

    const updatedTicket = {
      ...this.ticket,
      resolutionSummary: this.resolutionSummary,
      satisfied: this.satisfied
    };

    this.ticketService.updateTicket(this.ticket.ticketId, updatedTicket).subscribe(
      () => {
        alert('Feedback submitted successfully.');
        this.router.navigate(['/client/view/tickets']);
      },
      (error) => {
        console.error('Error submitting feedback:', error);
        alert('Failed to submit feedback.');
      }
    );
  }
}
