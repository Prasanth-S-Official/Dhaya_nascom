import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from 'src/app/models/ticket.model';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket-management',
  templateUrl: './ticket-management.component.html',
  styleUrls: ['./ticket-management.component.css']
})
export class TicketManagementComponent implements OnInit {


  ticketForm: FormGroup;
  successPopup = false;
  errorMessage = '';
  id: number | null = null;
  userId: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ticketService: TicketService
  ) {
    this.userId = Number(localStorage.getItem('userId'));
    this.ticketForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      issueCategory: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? Number(idParam) : null;
    if (this.id) {
      this.fetchTicket(this.id);
    }
  }

  fetchTicket(id: number): void {
    this.ticketService.getTicketById(id).subscribe(
      (response) => this.ticketForm.patchValue(response),
      () => this.router.navigate(['/error'])
    );
  }

  onSubmit(): void {
    if (this.ticketForm.valid) {
      const formData = this.ticketForm.value;

      const ticket: Ticket = {
        ...formData,
        createdDate: new Date(), // Set current date
        userId: this.userId, // Get userId from localStorage
        status: 'Open', // Status is Open by default
        ticketId: this.id || undefined, // For update or add
      };

      if (this.id) {
        this.ticketService.updateTicket(this.id, ticket).subscribe(
          () => this.showSuccessPopup('Ticket Updated Successfully!'),
          (error) => this.showErrorPopup('Error updating ticket: ' + error.message)
        );
      } else {
        this.ticketService.addTicket(ticket).subscribe(
          () => this.showSuccessPopup('Ticket Added Successfully!'),
          (error) => this.showErrorPopup('Error adding ticket: ' + error.message)
        );
      }
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }

  showSuccessPopup(message: string): void {
    this.successPopup = true;
    this.errorMessage = message;
  }

  showErrorPopup(message: string): void {
    this.errorMessage = message;
  }

  handleSuccessMessage(): void {
    this.successPopup = false;
    this.ticketForm.reset();
    this.router.navigate(['/manager/view/tickets']);
  }

  navigateBack(): void {
    this.router.navigate(['/manager/view/tickets']);
  }
}