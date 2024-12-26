import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supported-agents',
  templateUrl: './supported-agents.component.html',
  styleUrls: ['./supported-agents.component.css'],
})
export class SupportedAgentsComponent implements OnInit {
  supportedAgents: any[] = [];
  modalTickets: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  userId: number = Number(localStorage.getItem('userId'));
  showTicketsModal: boolean = false;

  constructor(private ticketService: TicketService, private router: Router) {}

  ngOnInit(): void {
    this.fetchSupportedAgents();
  }

  fetchSupportedAgents(): void {
    this.ticketService.getTicketsByUserId(this.userId).subscribe(
      (tickets: any[]) => {
        console.log('Fetched tickets:', tickets);
        const agents = tickets
          .filter((ticket) => ticket.supportAgent) // Ensure agent exists
          .map((ticket) => ticket.supportAgent);

        // Remove duplicates by agentId
        this.supportedAgents = agents.filter(
          (agent, index, self) => self.findIndex((a) => a.agentId === agent.agentId) === index
        );
        console.log('Supported Agents:', this.supportedAgents);
        this.isLoading = false;
      },
      (error) => {
        console.error('Failed to fetch tickets:', error);
        this.errorMessage = 'Failed to load supported agents.';
        this.isLoading = false;
      }
    );
  }

  viewTickets(agentId: number): void {
    console.log('View Tickets called for agentId:', agentId);
    this.modalTickets = [];
    this.showTicketsModal = true;

    this.ticketService.getTicketsByUserId(this.userId).subscribe(
      (tickets: any[]) => {
        this.modalTickets = tickets.filter((ticket) => ticket.supportAgent?.agentId === agentId);
        console.log('Filtered Tickets:', this.modalTickets);
      },
      (error) => {
        console.error('Failed to fetch tickets for agent:', error);
      }
    );
  }

  closeTicketsModal(): void {
    this.showTicketsModal = false;
  }

  writeReview(agentId: number): void {
    this.router.navigate(['/client/add/feedback'], { queryParams: { agentId } });
  }
}
