import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
// import { RegistrationComponent } from './components/registration/registration.component';

import { AuthGuard } from './components/authguard/auth.guard';

import { AdminaddworkoutComponent } from './components/adminaddworkout/adminaddworkout.component';
import { AdminviewworkoutComponent } from './components/adminviewworkout/adminviewworkout.component';
import { AdmineditworkoutComponent } from './components/admineditworkout/admineditworkout.component';
import { UserviewworkoutComponent } from './components/userviewworkout/userviewworkout.component';
import { UserworkoutformComponent } from './components/userworkoutform/userworkoutform.component';
import { RequestedworkoutComponent } from './components/requestedworkout/requestedworkout.component';
import { UserappliedworkoutComponent } from './components/userappliedworkout/userappliedworkout.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomePageComponent } from './components/home-page/home-page.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  {path: 'login', component: LoginComponent },
  {path: 'signup', component: SignupComponent },
  {path: 'error', component: ErrorComponent },

  {path: 'admin/add/workout', component: AdminaddworkoutComponent},
  {path: 'admin/view/workout', component: AdminviewworkoutComponent},
  {path: 'admin/editworkout/:id', component: AdmineditworkoutComponent},
  {path: 'admin/view/requestedworkout', component: RequestedworkoutComponent},
  {path :'user/view/workout', component: UserviewworkoutComponent, canActivate: [AuthGuard]},
  {path: 'user/apply/workout', component: UserworkoutformComponent , canActivate: [AuthGuard]},
  {path: 'user/view/workoutplan', component: UserappliedworkoutComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'error' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
