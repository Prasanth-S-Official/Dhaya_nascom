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
import { DriverManagementComponent } from './components/driver-management/driver-management.component';
import { AdminViewDriversComponent } from './components/admin-view-drivers/admin-view-drivers.component';
import { CustomerviewdriverComponent } from './components/customerviewdriver/customerviewdriver.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'error', component: ErrorComponent },

  { path: 'admin/add/driver', component: DriverManagementComponent, canActivate: [AuthGuard] },
  { path: 'admin/edit/driver/:id', component: DriverManagementComponent, canActivate: [AuthGuard] },
  { path: 'admin/view/drivers', component: AdminViewDriversComponent, canActivate: [AuthGuard] },
  { path: 'manager/view/requirements', component: ManagerViewRequirementsComponent, canActivate: [AuthGuard] },
  { path: 'manager/view/trainer/:trainerId', component: TrainerDetailsComponent, canActivate: [AuthGuard] },
  
  
  { path: 'manager/add/requirement', component: ManagerRequirementComponent, canActivate: [AuthGuard] },
  { path: 'manager/edit/requirement/:id', component: ManagerRequirementComponent, canActivate: [AuthGuard] },
  { path: 'manager/view/trainers', component: SelectedTrainersComponent, canActivate: [AuthGuard] },
  { path: 'manager/view/requirements', component: ManagerViewRequirementsComponent, canActivate: [AuthGuard] },
  { path: 'manager/view/trainer/:trainerId', component: TrainerDetailsComponent, canActivate: [AuthGuard] },


  { path: 'coordinator/add/trainer', component: TrainerManagementComponent, canActivate: [AuthGuard] },
  { path: 'coordinator/edit/trainer/:id', component: TrainerManagementComponent, canActivate: [AuthGuard] },
  { path: 'coordinator/view/requirements', component: CoordinatorViewRequirementsComponent, canActivate: [AuthGuard] },
  { path: 'customer/view/drivers', component: CustomerviewdriverComponent, canActivate: [AuthGuard] },

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
