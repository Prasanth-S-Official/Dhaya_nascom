import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-supported-agents',
  templateUrl: './supported-agents.component.html',
  styleUrls: ['./supported-agents.component.css']
})
export class SupportedAgentsComponent implements OnInit {

  supportedAgents: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  userId: number;

  constructor(private ticketService: TicketService, private router: Router) {
    this.userId = Number(localStorage.getItem('userId'));
  }

  ngOnInit(): void {
    this.fetchSupportedAgents();
  }

  fetchSupportedAgents(): void {
    this.ticketService.getTicketsByUserId(this.userId).subscribe(
      (tickets: any[]) => {
        // Extract unique agents from the tickets
        const agents = tickets
          .filter((ticket) => ticket.supportAgent) // Ensure the ticket has a support agent
          .map((ticket) => ticket.supportAgent);

        // Remove duplicate agents
        this.supportedAgents = agents.filter(
          (agent, index, self) => self.findIndex((a) => a.agentId === agent.agentId) === index
        );
        this.isLoading = false;
      },
      (error) => {
        console.error('Failed to fetch tickets:', error);
        this.errorMessage = 'Failed to load supported agents.';
        this.isLoading = false;
      }
    );
  }

  writeReview(agentId: number): void {
    this.router.navigate(['/client/add/feedback'], { queryParams: { agentId } });
  }
}
