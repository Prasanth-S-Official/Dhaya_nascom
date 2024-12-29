// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { forkJoin } from 'rxjs';
// import { TicketService } from 'src/app/services/ticket.service';
// import { SupportAgentService } from 'src/app/services/support-agent.service';
// import { Ticket } from 'src/app/models/ticket.model';
// import { SupportAgent } from 'src/app/models/support-agent.model';

// @Component({
//   selector: 'app-manager-view-tickets',
//   templateUrl: './manager-view-tickets.component.html',
//   styleUrls: ['./manager-view-tickets.component.css']
// })
// export class ManagerViewTicketsComponent implements OnInit {

//   availableTickets: Ticket[] = [];
//   filteredTickets: Ticket[] = [];
//   allAgents: SupportAgent[] = [];
//   searchField: string = '';
//   searchAgentField: string = ''; 
//   showModal: boolean = false;
//   selectedTicket: Ticket | null = null;
//   suggestedAgents: SupportAgent[] = [];

//   constructor(
//     private router: Router,
//     private ticketService: TicketService,
//     private agentService: SupportAgentService
//   ) {}

//   ngOnInit(): void {
//     this.fetchData();
//   }

//   fetchData(): void {
//     forkJoin({
//       allTickets: this.ticketService.getAllTickets(),
//       allAgents: this.agentService.getAllAgents(),
//     }).subscribe(
//       ({ allTickets, allAgents }) => {
//         this.availableTickets = allTickets.map((ticket: any) => {
//           return {
//             ...ticket,
//             agentId: ticket.agent?.agentId || null, // Extract agentId from agent
//           };
//         });
//         console.log("Tickets",allTickets);
//         console.log("Agents" , allAgents);
        
        
//         this.filteredTickets = this.availableTickets;
//         this.allAgents = allAgents.filter((agent) => agent.status === 'Available'); // Filter available agents only
//       },
//       (error) => {
//         console.error('Error fetching data:', error);
//       }
//     );
//   }

//   handleSearchChange(searchValue: string): void {
//     this.searchField = searchValue;
//     this.filteredTickets = this.filterTickets(searchValue);
//   }

//   filterTickets(search: string): Ticket[] {
//     const searchLower = search.toLowerCase();
//     return this.availableTickets.filter(
//       (ticket) =>
//         ticket.title.toLowerCase().includes(searchLower) ||
//         ticket.issueCategory.toLowerCase().includes(searchLower)
//     );
//   }

//   openAssignAgentModal(ticket: Ticket): void {
//     this.selectedTicket = ticket;
//     this.showModal = true;
//   }

//   closeModal(): void {
//     this.showModal = false;
//     this.selectedTicket = null;
//     this.searchAgentField = ''; // Reset the agent search field when closing the modal
//   }

//   assignAgent(ticket: Ticket, agent: SupportAgent): void {
//     const updatedTicket = {
//       ...ticket,
//       supportAgent: { agentId: agent.agentId }, // Include the nested agent object for backend
//     };

//     this.ticketService.updateTicket(ticket.ticketId!, updatedTicket).subscribe(
//       () => {
//         this.fetchData(); // Refresh data to update the view
//         this.closeModal();
//       },
//       (error) => {
//         console.error('Error assigning agent:', error);
//       }
//     );
//   }

//   closeTicket(ticket: Ticket): void {
//     const updatedTicket = {
//       ...ticket,
//       status: 'Closed', // Update status to Closed
//     };

//     this.ticketService.updateTicket(ticket.ticketId!, updatedTicket).subscribe(
//       () => {
//         this.fetchData(); // Refresh data to update the view
//       },
//       (error) => {
//         console.error('Error closing ticket:', error);
//       }
//     );
//   }

//   getAvailableAgents(): SupportAgent[] {
//     // Filter agents based on search input
//     const searchLower = this.searchAgentField.toLowerCase();
//     return this.allAgents
//       .filter(
//         (agent) =>
//           !this.availableTickets.some(
//             (ticket) => ticket.agentId === agent.agentId
//           )
//       )
//       .filter(
//         (agent) =>
//           agent.name.toLowerCase().includes(searchLower) ||
//           agent.expertise.toLowerCase().includes(searchLower)
//       );
//   }

//   getAgentName(ticket: Ticket): string {
//     return (ticket as any).supportAgent
//       ? `${(ticket as any).supportAgent.name} (${(ticket as any).supportAgent.expertise})`
//       : 'Not Assigned';
//   }

//   logout(): void {
//     localStorage.clear();
//     this.router.navigate(['/login']);
//   }
// }
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
  suggestedAgents: SupportAgent[] = [];
  searchField: string = '';
  searchAgentField: string = '';
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
        this.availableTickets = allTickets.map((ticket: any) => ({
          ...ticket,
          agentId: ticket.agent?.agentId || null,
        }));
        this.filteredTickets = this.availableTickets;
        this.allAgents = allAgents.filter((agent) => agent.status === 'Available');
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
    this.searchAgentField = '';
    this.suggestedAgents = this.getSuggestedAgents(ticket);
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedTicket = null;
    this.searchAgentField = '';
  }

  assignAgent(ticket: Ticket, agent: SupportAgent): void {
    const updatedTicket = {
      ...ticket,
      supportAgent: { agentId: agent.agentId },
    };

    this.ticketService.updateTicket(ticket.ticketId!, updatedTicket).subscribe(
      () => {
        this.fetchData();
        this.closeModal();
      },
      (error) => {
        console.error('Error assigning agent:', error);
      }
    );
  }

  closeTicket(ticket: Ticket): void {
    const updatedTicket = {
      ...ticket,
      status: 'Closed',
    };

    this.ticketService.updateTicket(ticket.ticketId!, updatedTicket).subscribe(
      () => {
        this.fetchData();
      },
      (error) => {
        console.error('Error closing ticket:', error);
      }
    );
  }

  getSuggestedAgents(ticket: Ticket): SupportAgent[] {
    const issueToExpertiseMap: { [key: string]: string } = {
      'Hardware': 'Hardware Specialist',
      'Software': 'Software Specialist',
      'Network': 'Network Engineer',
      'Account': 'Account Manager',
      'Security': 'Security Specialist',
      'Tech Stacks': 'Tech Stack Expert',
      'Platform Bug': 'Platform Support Engineer',
      'Content Issue': 'Content Manager',
      'Integration Issue': 'Integration Specialist',
      'Performance': 'Performance Analyst',
      'UI/UX': 'UI/UX Designer',
      'Database': 'Database Administrator',
      'Deployment': 'Deployment Specialist',
      'API Issue': 'API Integration Specialist',
      'Configuration': 'Configuration Engineer',
      'Permissions': 'Permissions Manager',
      'Connectivity': 'Connectivity Specialist',
      'Documentation': 'Documentation Expert',
      'Billing/Payment': 'Billing/Payment Support',
      'Other': 'General IT Support',
    };

    const requiredExpertise = issueToExpertiseMap[ticket.issueCategory];
    return this.allAgents.filter((agent) =>
      agent.expertise.toLowerCase().includes(requiredExpertise.toLowerCase())
    );
  }

  getAvailableAgents(): SupportAgent[] {
    const searchLower = this.searchAgentField.toLowerCase();
    return this.allAgents
      .filter((agent) =>
        agent.name.toLowerCase().includes(searchLower) ||
        agent.expertise.toLowerCase().includes(searchLower)
      );
  }

  getAgentName(ticket: Ticket): string {
    return (ticket as any).supportAgent
      ? `${(ticket as any).supportAgent.name} (${(ticket as any).supportAgent.expertise})`
      : 'Not Assigned';
  }

  isManualSelect: boolean = false; // Flag to toggle manual select visibility

toggleManualSelect(): void {
  this.isManualSelect = !this.isManualSelect;
}

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
