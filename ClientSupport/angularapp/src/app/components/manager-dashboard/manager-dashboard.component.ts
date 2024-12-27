import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent implements OnInit {

  tickets: any[] = [];
  happyClientsCount = 0;
  unhappyClientsCount = 0;

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.fetchTickets();
  }

  fetchTickets(): void {
    this.ticketService.getAllTickets().subscribe(
      (response: any[]) => {
        this.tickets = response;
        this.happyClientsCount = this.tickets.filter((ticket) => ticket.satisfied === true).length;
        this.unhappyClientsCount = this.tickets.filter((ticket) => ticket.satisfied === false).length;
      },
      (error) => {
        console.error('Error fetching tickets:', error);
      }
    );
  }
}