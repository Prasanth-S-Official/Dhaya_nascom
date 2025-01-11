import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './components/authguard/auth.guard';

import { AdminviewappliedrequestComponent } from './components/adminviewappliedrequest/adminviewappliedrequest.component';
import { UseraddrequestComponent } from './components/useraddrequest/useraddrequest.component';
import { UserviewappliedrequestComponent } from './components/userviewappliedrequest/userviewappliedrequest.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminMaterialComponent } from './components/admin-material/admin-material.component';
import { AdminViewMaterialComponent } from './components/admin-view-material/admin-view-material.component';
import { UserviewmaterialComponent } from './components/userviewmaterial/userviewmaterial.component';
import { AdminInsightsComponent } from './components/admin-insights/admin-insights.component';
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
  { path: 'insights', component: AdminInsightsComponent },
  { path: 'error', component: ErrorComponent },

  { path: 'client/add/project', component: ProjectManagementComponent, canActivate: [AuthGuard] },
  { path: 'client/edit/project/:id', component: ProjectManagementComponent, canActivate: [AuthGuard] },
  { path: 'client/view/bids', component: ClientViewRequestsComponent, canActivate: [AuthGuard] },
  { path: 'client/view/projects', component: ClientViewProjectsComponent, canActivate: [AuthGuard] },
  { path: 'client/add/feedback', component: ClientaddfeedbackComponent, canActivate: [AuthGuard] },



  { path: 'admin/add/material', component: AdminMaterialComponent, canActivate: [AuthGuard] },
  { path: 'admin/edit/material/:id', component: AdminMaterialComponent, canActivate: [AuthGuard] },
  { path: 'admin/view/applied-requests', component: AdminviewappliedrequestComponent, canActivate: [AuthGuard] },
  { path: 'admin/view/materials', component: AdminViewMaterialComponent, canActivate: [AuthGuard] },
  { path: 'admin/view/feedback', component: AdminviewfeedbackComponent, canActivate: [AuthGuard] },

  // Admin Routes
  { path: 'admin/view/applied-requests', component: AdminviewappliedrequestComponent, canActivate: [AuthGuard] },
  { path: 'client/view/feedbacks', component: ClientviewfeedbackComponent, canActivate: [AuthGuard] },

  // User Routes
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
