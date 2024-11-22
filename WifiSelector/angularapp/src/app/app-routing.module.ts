import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './components/authguard/auth.guard';

import { AdminaddtrainingComponent } from './components/adminaddtraining/adminaddtraining.component';
import { AdminedittrainingComponent } from './components/adminedittraining/adminedittraining.component';
import { AdminviewappliedrequestComponent } from './components/adminviewappliedrequest/adminviewappliedrequest.component';
import { AdminviewtrainingComponent } from './components/adminviewtraining/adminviewtraining.component';

import { UserviewtrainingComponent } from './components/userviewtraining/userviewtraining.component';
import { UseraddrequestComponent } from './components/useraddrequest/useraddrequest.component';
import { UserviewappliedrequestComponent } from './components/userviewappliedrequest/userviewappliedrequest.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminWifiSchemeComponent } from './components/admin-wifi-scheme/admin-wifi-scheme.component';
import { AdminViewSchemeComponent } from './components/admin-view-scheme/admin-view-scheme.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'error', component: ErrorComponent },


  { path: 'admin/add/scheme', component: AdminWifiSchemeComponent, canActivate: [AuthGuard] },
  { path: 'admin/edit/scheme/:id', component: AdminWifiSchemeComponent, canActivate: [AuthGuard] },
  { path: 'admin/view/applied-requests', component: AdminviewappliedrequestComponent, canActivate: [AuthGuard] },
  { path: 'admin/view/schemes', component: AdminViewSchemeComponent, canActivate: [AuthGuard] },
  { path: 'admin/view/feedback', component: AdminviewfeedbackComponent, canActivate: [AuthGuard] },

  // Admin Routes
  { path: 'admin/add/training', component: AdminaddtrainingComponent, canActivate: [AuthGuard] },
  { path: 'admin/edit/training/:id', component: AdminedittrainingComponent, canActivate: [AuthGuard] },
  { path: 'admin/view/applied-requests', component: AdminviewappliedrequestComponent, canActivate: [AuthGuard] },
  { path: 'admin/view/trainings', component: AdminviewtrainingComponent, canActivate: [AuthGuard] },
  { path: 'admin/view/feedback', component: AdminviewfeedbackComponent, canActivate: [AuthGuard] },

  // User Routes
  { path: 'user/view/trainings', component: UserviewtrainingComponent, canActivate: [AuthGuard] },
  { path: 'user/add/request', component: UseraddrequestComponent, canActivate: [AuthGuard] },
  { path: 'user/view/applied-requests', component: UserviewappliedrequestComponent, canActivate: [AuthGuard] },
  { path: 'user/add/feedback', component: UseraddfeedbackComponent, canActivate: [AuthGuard] },
  { path: 'user/view/feedback', component: UserviewfeedbackComponent, canActivate: [AuthGuard] },

  // Redirect to error for unknown routes
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
