import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { TicketService } from 'src/app/services/ticket.service';
import { SupportAgentService } from 'src/app/services/support-agent.service';
import { Ticket } from 'src/app/models/ticket.model';
import { SupportAgent } from 'src/app/models/support-agent.model';

@Component({
  selector: 'app-manager-view-tickets',
  templateUrl: './manager-view-tickets.component.html',
  styleUrls: ['./manager-view-tickets.component.css']
})
export class ManagerViewTicketsComponent implements OnInit {

  availableTickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];
  allAgents: SupportAgent[] = [];
  searchField: string = '';
  searchAgentField: string = ''; // For searching agents in modal
  showModal: boolean = false;
  selectedTicket: Ticket | null = null;

  constructor(
    private router: Router,
    private ticketService: TicketService,
    private agentService: SupportAgentService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    forkJoin({
      allTickets: this.ticketService.getAllTickets(),
      allAgents: this.agentService.getAllAgents(),
    }).subscribe(
      ({ allTickets, allAgents }) => {
        console.log(allTickets);
        
        this.availableTickets = allTickets.map((ticket: any) => {
          return {
            ...ticket,
            agentId: ticket.agent?.agentId || null, // Extract agentId from agent
          };
        });
        this.filteredTickets = this.availableTickets;
        this.allAgents = allAgents.filter((agent) => agent.status === 'Available'); // Filter available agents only
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  handleSearchChange(searchValue: string): void {
    this.searchField = searchValue;
    this.filteredTickets = this.filterTickets(searchValue);
  }

  filterTickets(search: string): Ticket[] {
    const searchLower = search.toLowerCase();
    return this.availableTickets.filter(
      (ticket) =>
        ticket.title.toLowerCase().includes(searchLower) ||
        ticket.issueCategory.toLowerCase().includes(searchLower)
    );
  }

  openAssignAgentModal(ticket: Ticket): void {
    this.selectedTicket = ticket;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedTicket = null;
    this.searchAgentField = ''; // Reset the agent search field when closing the modal
  }

  assignAgent(ticket: Ticket, agent: SupportAgent): void {
    const updatedTicket = {
      ...ticket,
      supportAgent: { agentId: agent.agentId }, // Include the nested agent object for backend
    };

    console.log(updatedTicket);
    
    this.ticketService.updateTicket(ticket.ticketId!, updatedTicket).subscribe(
      () => {
        this.fetchData(); // Refresh data to update the view
        this.closeModal();
      },
      (error) => {
        console.error('Error assigning agent:', error);
      }
    );
  }

  getAvailableAgents(): SupportAgent[] {
    // Filter agents based on search input
    const searchLower = this.searchAgentField.toLowerCase();
    return this.allAgents
      .filter(
        (agent) =>
          !this.availableTickets.some(
            (ticket) => ticket.agentId === agent.agentId
          )
      )
      .filter(
        (agent) =>
          agent.name.toLowerCase().includes(searchLower) ||
          agent.expertise.toLowerCase().includes(searchLower)
      );
  }

  getAgentName(ticket: Ticket): string {
    return ticket.supportAgent 
      ? `${ticket.supportAgent.name} (${ticket.supportAgent.expertise})`
      : 'Not Assigned';
  }
  
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
