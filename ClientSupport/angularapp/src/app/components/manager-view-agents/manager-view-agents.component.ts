import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupportAgentService } from 'src/app/services/support-agent.service';

@Component({
  selector: 'app-manager-view-agents',
  templateUrl: './manager-view-agents.component.html',
  styleUrls: ['./manager-view-agents.component.css']
})
export class ManagerViewAgentsComponent implements OnInit {

  allAgents: any[] = [];
  filteredAgents: any[] = [];
  showDeletePopup = false;
  showProfilePopup = false;
  agentToDelete: number | null = null;
  selectedAgent: any | null = null;
  searchField = '';
  selectedStatus: string | null = null;
  status: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private agentService: SupportAgentService) {}

  ngOnInit(): void {
    this.fetchAgents();
  }

  fetchAgents() {
    this.status = 'loading';
    this.agentService.getAllAgents().subscribe(
      (data: any) => {
        this.allAgents = data;
        this.filteredAgents = data;
        this.status = this.filteredAgents.length === 0 ? 'noRecords' : '';
      },
      (error) => {
        console.error('Error fetching agents:', error);
        this.status = 'error';
      }
    );
  }

  handleDeleteClick(agentId: number) {
    this.agentToDelete = agentId;
    this.showDeletePopup = true;
  }

  handleConfirmDelete() {
    if (this.agentToDelete) {
      this.agentService.deleteAgent(this.agentToDelete).subscribe(
        () => {
          this.closeDeletePopup();
          this.fetchAgents();
          this.errorMessage = '';
        },
        (error) => {
          console.error('Error deleting agent:', error);
          this.errorMessage = error.error.message || 'Failed to delete agent';
        }
      );
    }
  }

  closeDeletePopup() {
    this.agentToDelete = null;
    this.showDeletePopup = false;
    this.errorMessage = '';
  }

  navigateToEditAgent(id: number) {
    this.router.navigate(['/manager/edit/agent', id]);
  }

  toggleAgentStatus(agent: any) {
    const updatedStatus = agent.status === 'Available' ? 'Unavailable' : 'Available';
    const updatedAgent = { ...agent, status: updatedStatus };

    this.agentService.updateAgent(agent.agentId, updatedAgent).subscribe(
      () => {
        agent.status = updatedStatus;
      },
      (error) => {
        console.error('Error updating agent status:', error);
      }
    );
  }

  viewProfile(agent: any) {
    this.selectedAgent = agent;
    this.showProfilePopup = true;
  }

  closeProfilePopup() {
    this.selectedAgent = null;
    this.showProfilePopup = false;
  }

  applyFilters(): void {
    this.filteredAgents = this.allAgents.filter((agent) => {
      const matchesSearch =
        agent.name.toLowerCase().includes(this.searchField.toLowerCase()) ||
        agent.expertise.toLowerCase().includes(this.searchField.toLowerCase());

      const matchesStatus = !this.selectedStatus || agent.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });

    this.status = this.filteredAgents.length === 0 ? 'noRecords' : '';
  }
}
