import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './components/authguard/auth.guard';

import { AdminviewappliedrequestComponent } from './components/adminviewappliedrequest/adminviewappliedrequest.component';
import { UseraddrequestComponent } from './components/useraddrequest/useraddrequest.component';
import { UserviewappliedrequestComponent } from './components/userviewappliedrequest/userviewappliedrequest.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminWifiSchemeComponent } from './components/admin-wifi-scheme/admin-wifi-scheme.component';
import { AdminViewSchemeComponent } from './components/admin-view-scheme/admin-view-scheme.component';
import { UserViewSchemeComponent } from './components/user-view-scheme/user-view-scheme.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminMaterialComponent } from './components/admin-material/admin-material.component';
import { AdminViewMaterialComponent } from './components/admin-view-material/admin-view-material.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'error', component: ErrorComponent },



  { path: 'admin/add/material', component: AdminMaterialComponent, canActivate: [AuthGuard] },
  { path: 'admin/edit/material/:id', component: AdminWifiSchemeComponent, canActivate: [AuthGuard] },
  { path: 'admin/view/applied-requests', component: AdminviewappliedrequestComponent, canActivate: [AuthGuard] },
  { path: 'admin/view/materials', component: AdminViewMaterialComponent, canActivate: [AuthGuard] },
  { path: 'admin/view/feedback', component: AdminviewfeedbackComponent, canActivate: [AuthGuard] },

  // Admin Routes
  { path: 'admin/view/applied-requests', component: AdminviewappliedrequestComponent, canActivate: [AuthGuard] },
  { path: 'admin/view/feedback', component: AdminviewfeedbackComponent, canActivate: [AuthGuard] },

  // User Routes
  { path: 'user/view/schemes', component: UserViewSchemeComponent, canActivate: [AuthGuard] },
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
