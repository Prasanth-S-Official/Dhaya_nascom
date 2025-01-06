import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './components/authguard/auth.guard';

import { HomePageComponent } from './components/home-page/home-page.component';
import { SignupComponent } from './components/signup/signup.component';
import { DriverManagementComponent } from './components/driver-management/driver-management.component';
import { AdminViewDriversComponent } from './components/admin-view-drivers/admin-view-drivers.component';
import { CustomerviewdriverComponent } from './components/customerviewdriver/customerviewdriver.component';
import { CustomerRequestComponent } from './components/customer-request/customer-request.component';
import { CustomerviewrequestedComponent } from './components/customerviewrequested/customerviewrequested.component';
import { AdminviewrequestsComponent } from './components/adminviewrequests/adminviewrequests.component';
import { CustomerpostfeedbackComponent } from './components/customerpostfeedback/customerpostfeedback.component';
import { CustomerviewfeedbackComponent } from './components/customerviewfeedback/customerviewfeedback.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'error', component: ErrorComponent },

  { path: 'admin/add/driver', component: DriverManagementComponent, canActivate: [AuthGuard] },
  { path: 'admin/edit/driver/:id', component: DriverManagementComponent, canActivate: [AuthGuard] },
  { path: 'admin/view/drivers', component: AdminViewDriversComponent, canActivate: [AuthGuard] },
  { path: 'admin/view/requests', component: AdminviewrequestsComponent, canActivate: [AuthGuard] },
  { path: 'admin/view/feedback', component: AdminviewfeedbackComponent, canActivate: [AuthGuard] },
  { path: 'customer/add/request', component: CustomerRequestComponent, canActivate: [AuthGuard] },
  { path: 'customer/edit/request/:id', component: CustomerRequestComponent, canActivate: [AuthGuard] },
  { path: 'customer/my/requests', component: CustomerviewrequestedComponent, canActivate: [AuthGuard] },
  { path: 'customer/view/drivers', component: CustomerviewdriverComponent, canActivate: [AuthGuard] },
  { path: 'customer/add/feedback/:driverId', component: CustomerpostfeedbackComponent, canActivate: [AuthGuard] },
  { path: 'customer/feedback', component: CustomerviewfeedbackComponent, canActivate: [AuthGuard] },

  // Redirect to error for unknown routes
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
