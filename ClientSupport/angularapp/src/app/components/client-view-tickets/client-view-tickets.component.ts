import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';
import { Ticket } from 'src/app/models/ticket.model';

@Component({
  selector: 'app-client-view-tickets',
  templateUrl: './client-view-tickets.component.html',
  styleUrls: ['./client-view-tickets.component.css']
})
export class ClientViewTicketsComponent implements OnInit {

  allTickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];
  showDeletePopup = false;
  ticketToDelete: number | null = null;
  searchField = '';
  selectedPriority: string | null = null;
  status: string = '';
  errorMessage: string = '';
  userId: number;

  constructor(private router: Router, private ticketService: TicketService) {
    this.userId = Number(localStorage.getItem('userId'));
  }

  ngOnInit(): void {
    this.fetchTickets();
  }

  fetchTickets() {
    this.status = 'loading';
    this.ticketService.getTicketsByUserId(this.userId).subscribe(
      (data: Ticket[]) => {
        console.log(data);
        
        this.allTickets = data;
        this.filteredTickets = data;
        this.status = this.filteredTickets.length === 0 ? 'noRecords' : '';
      },
      (error) => {
        console.error('Error fetching tickets:', error);
        this.status = 'error';
      }
    );
  }

  handleDeleteClick(ticketId: number) {
    this.ticketToDelete = ticketId;
    this.showDeletePopup = true;
  }

  handleConfirmDelete() {
    if (this.ticketToDelete) {
      this.ticketService.deleteTicket(this.ticketToDelete).subscribe(
        () => {
          this.closeDeletePopup();
          this.fetchTickets();
          this.errorMessage = '';
        },
        (error) => {
          console.error('Error deleting ticket:', error);
          this.errorMessage = error.error.message || 'Failed to delete ticket';
        }
      );
    }
  }

  closeDeletePopup() {
    this.ticketToDelete = null;
    this.showDeletePopup = false;
    this.errorMessage = '';
  }

  navigateToEditTicket(ticketId: number) {
    this.router.navigate(['/client/edit/ticket', ticketId]);
  }

  navigateToTicketDetails(ticketId: number): void {
    this.router.navigate(['/client/ticket-details', ticketId]);
  }
  

  applyFilters(): void {
    this.filteredTickets = this.allTickets.filter((ticket) => {
      const matchesSearch =
        ticket.title.toLowerCase().includes(this.searchField.toLowerCase()) ||
        ticket.issueCategory.toLowerCase().includes(this.searchField.toLowerCase());

      const matchesPriority = !this.selectedPriority || ticket.priority === this.selectedPriority;

      return matchesSearch && matchesPriority;
    });

    this.status = this.filteredTickets.length === 0 ? 'noRecords' : '';
  }
}