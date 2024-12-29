import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './components/authguard/auth.guard';

import { HomePageComponent } from './components/home-page/home-page.component';
import { SignupComponent } from './components/signup/signup.component';
import { ManagerviewfeedbackComponent } from './components/managerviewfeedback/managerviewfeedback.component';

import { TicketManagementComponent } from './components/ticket-management/ticket-management.component';
import { ClientViewTicketsComponent } from './components/client-view-tickets/client-view-tickets.component';
import { SupportAgentManagementComponent } from './components/support-agent-management/support-agent-management.component';
import { ManagerViewAgentsComponent } from './components/manager-view-agents/manager-view-agents.component';
import { ManagerViewTicketsComponent } from './components/manager-view-tickets/manager-view-tickets.component';
import { TicketDetailsComponent } from './components/ticket-details/ticket-details.component';
import { SupportedAgentsComponent } from './components/supported-agents/supported-agents.component';
import { ClientpostfeedbackComponent } from './components/clientpostfeedback/clientpostfeedback.component';
import { ClientviewfeedbackComponent } from './components/clientviewfeedback/clientviewfeedback.component';
import { ManagerDashboardComponent } from './components/manager-dashboard/manager-dashboard.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'error', component: ErrorComponent },

  { path: 'manager/add/agent', component: SupportAgentManagementComponent, canActivate: [AuthGuard] },
  { path: 'manager/edit/agent/:id', component: SupportAgentManagementComponent, canActivate: [AuthGuard] },
  { path: 'manager/view/agents', component: ManagerViewAgentsComponent, canActivate: [AuthGuard] },
  { path: 'manager/view/tickets', component: ManagerViewTicketsComponent, canActivate: [AuthGuard] },

  
  { path: 'client/add/ticket', component: TicketManagementComponent, canActivate: [AuthGuard] },
  { path: 'client/edit/ticket/:id', component: TicketManagementComponent, canActivate: [AuthGuard] },
  { path: 'client/view/agents', component: SupportedAgentsComponent, canActivate: [AuthGuard] },
  { path: 'client/view/ticket', component: ClientViewTicketsComponent, canActivate: [AuthGuard] },
  { path: 'client/ticket-details/:ticketId', component: TicketDetailsComponent, canActivate: [AuthGuard] },
  { path: 'client/add/feedback', component: ClientpostfeedbackComponent, canActivate: [AuthGuard] },

  { path: 'manager/view/feedback', component: ManagerviewfeedbackComponent, canActivate: [AuthGuard] },
  { path: 'client/view/feedback', component: ClientviewfeedbackComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: ManagerDashboardComponent, canActivate: [AuthGuard] },

  // Redirect to error for unknown routes
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
