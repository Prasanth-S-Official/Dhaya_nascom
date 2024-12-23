import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './components/authguard/auth.guard';

import { HomePageComponent } from './components/home-page/home-page.component';
import { SignupComponent } from './components/signup/signup.component';
import { ManagerRequirementComponent } from './components/manager-requirement/manager-requirement.component';
import { ManagerViewRequirementsComponent } from './components/manager-view-requirements/manager-view-requirements.component';
import { TrainerManagementComponent } from './components/trainer-management/trainer-management.component';
import { CoordinatorViewTrainersComponent } from './components/coordinator-view-trainers/coordinator-view-trainers.component';
import { CoordinatorViewRequirementsComponent } from './components/coordinator-view-requirements/coordinator-view-requirements.component';
import { TrainerDetailsComponent } from './components/trainer-details/trainer-details.component';
import { SelectedTrainersComponent } from './components/selected-trainers/selected-trainers.component';
import { ManagerpostfeedbackComponent } from './components/managerpostfeedback/managerpostfeedback.component';
import { ManagerviewfeedbackComponent } from './components/managerviewfeedback/managerviewfeedback.component';
import { CoordinatorviewfeedbackComponent } from './components/coordinatorviewfeedback/coordinatorviewfeedback.component';
import { TicketManagementComponent } from './components/ticket-management/ticket-management.component';
import { ClientViewTicketsComponent } from './components/client-view-tickets/client-view-tickets.component';
import { SupportAgentManagementComponent } from './components/support-agent-management/support-agent-management.component';
import { ManagerViewAgentsComponent } from './components/manager-view-agents/manager-view-agents.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'error', component: ErrorComponent },

  { path: 'manager/add/agent', component: SupportAgentManagementComponent, canActivate: [AuthGuard] },
  { path: 'manager/edit/agent/:id', component: SupportAgentManagementComponent, canActivate: [AuthGuard] },
  { path: 'manager/view/agents', component: ManagerViewAgentsComponent, canActivate: [AuthGuard] },
  { path: 'manager/view/trainer/:trainerId', component: TrainerDetailsComponent, canActivate: [AuthGuard] },
  
  { path: 'client/add/ticket', component: TicketManagementComponent, canActivate: [AuthGuard] },
  { path: 'client/edit/ticket/:id', component: TicketManagementComponent, canActivate: [AuthGuard] },
  { path: 'manager/view/trainers', component: SelectedTrainersComponent, canActivate: [AuthGuard] },
  { path: 'client/view/ticket', component: ClientViewTicketsComponent, canActivate: [AuthGuard] },
  { path: 'manager/view/trainer/:trainerId', component: TrainerDetailsComponent, canActivate: [AuthGuard] },

  { path: 'coordinator/add/trainer', component: TrainerManagementComponent, canActivate: [AuthGuard] },
  { path: 'coordinator/edit/trainer/:id', component: TrainerManagementComponent, canActivate: [AuthGuard] },
  { path: 'coordinator/view/requirements', component: CoordinatorViewRequirementsComponent, canActivate: [AuthGuard] },
  { path: 'coordinator/view/trainers', component: CoordinatorViewTrainersComponent, canActivate: [AuthGuard] },

  { path: 'coordinator/view/feedback', component: CoordinatorviewfeedbackComponent, canActivate: [AuthGuard] },

  { path: 'manager/add/feedback', component: ManagerpostfeedbackComponent, canActivate: [AuthGuard] },
  { path: 'manager/view/feedback', component: ManagerviewfeedbackComponent, canActivate: [AuthGuard] },

  // Redirect to error for unknown routes
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
