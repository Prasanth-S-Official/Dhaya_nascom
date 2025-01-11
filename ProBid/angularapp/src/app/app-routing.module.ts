import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './components/authguard/auth.guard';

import { HomePageComponent } from './components/home-page/home-page.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProjectManagementComponent } from './components/project-management/project-management.component';
import { ClientViewProjectsComponent } from './components/client-view-projects/client-view-projects.component';
import { FreelancerviewprojectComponent } from './components/freelancerviewproject/freelancerviewproject.component';
import { BidRequestComponent } from './components/bid-request/bid-request.component';
import { FreelancerViewRequestedComponent } from './components/freelancer-view-requested/freelancer-view-requested.component';
import { ClientViewRequestsComponent } from './components/client-view-requests/client-view-requests.component';
import { ClientaddfeedbackComponent } from './components/clientaddfeedback/clientaddfeedback.component';
import { ClientviewfeedbackComponent } from './components/clientviewfeedback/clientviewfeedback.component';
import { FreelancerviewfeedbackComponent } from './components/freelancerviewfeedback/freelancerviewfeedback.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'error', component: ErrorComponent },

  { path: 'client/add/project', component: ProjectManagementComponent, canActivate: [AuthGuard] },
  { path: 'client/edit/project/:id', component: ProjectManagementComponent, canActivate: [AuthGuard] },
  { path: 'client/view/bids', component: ClientViewRequestsComponent, canActivate: [AuthGuard] },
  { path: 'client/view/projects', component: ClientViewProjectsComponent, canActivate: [AuthGuard] },
  { path: 'client/add/feedback', component: ClientaddfeedbackComponent, canActivate: [AuthGuard] },
  { path: 'client/view/feedbacks', component: ClientviewfeedbackComponent, canActivate: [AuthGuard] },
  
  { path: 'freelancer/view/projects', component: FreelancerviewprojectComponent, canActivate: [AuthGuard] },
  { path: 'freelancer/add/bid', component: BidRequestComponent, canActivate: [AuthGuard] },
  { path: 'freelancer/edit/bid/:id', component: BidRequestComponent, canActivate: [AuthGuard] },
  { path: 'freelancer/view/my-bids', component: FreelancerViewRequestedComponent, canActivate: [AuthGuard] },
  { path: 'freelancer/view/feedback', component: FreelancerviewfeedbackComponent, canActivate: [AuthGuard] },

  // Redirect to error for unknown routes
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
