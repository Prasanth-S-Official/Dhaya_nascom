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
import { AdminbookComponent } from './components/adminbook/adminbook.component';
import { AdminviewbookComponent } from './components/adminviewbook/adminviewbook.component';
import { UserviewbooksComponent } from './components/userviewbooks/userviewbooks.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'error', component: ErrorComponent },


  { path: 'admin/add/book', component: AdminbookComponent, canActivate: [AuthGuard] },
  { path: 'admin/view/books', component: AdminviewbookComponent, canActivate: [AuthGuard] },
  { path: 'admin/edit/book/:id', component: AdminbookComponent, canActivate: [AuthGuard] },
  { path: 'user/view/books', component: UserviewbooksComponent, canActivate: [AuthGuard] },
  { path: 'admin/view/rental-requests', component: AdminviewappliedrequestComponent, canActivate: [AuthGuard] },
  { path: 'admin/view/feedback', component: AdminviewfeedbackComponent, canActivate: [AuthGuard] },

  { path: 'user/add/rental', component: UseraddrequestComponent, canActivate: [AuthGuard] },
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
