import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { CreateloanComponent } from './components/createloan/createloan.component';
import { RequestedloanComponent } from './components/requestedloan/requestedloan.component';
import { AuthGuard } from './components/authguard/auth.guard';
import { ViewloanComponent } from './components/viewloan/viewloan.component';
import { UserviewloanComponent } from './components/userviewloan/userviewloan.component';
import { UserappliedloanComponent } from './components/userappliedloan/userappliedloan.component';
import { AdmineditloanComponent } from './components/admineditloan/admineditloan.component';
import { LoanformComponent } from './components/loanform/loanform.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { AdminviewproductComponent } from './components/adminviewproduct/adminviewproduct.component';
import { UserviewproductComponent } from './components/userviewproduct/userviewproduct.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'home', component: HomePageComponent },
  {path: 'signup', component: SignupComponent },
  {path: 'error', component: ErrorComponent },

  // -------------------------------
  {path: 'admin/newproduct', component: ProductCreateComponent, canActivate: [AuthGuard]},
  {path: 'admin/newproduct/:id', component: ProductCreateComponent, canActivate: [AuthGuard]},
  {path: 'admin/products', component: AdminviewproductComponent, canActivate: [AuthGuard]},
  {path :'user/products', component: UserviewproductComponent, canActivate: [AuthGuard]},
  { path: 'checkout', component: CheckoutComponent,canActivate: [AuthGuard]},


  //---------------------------------

  {path: 'admin/add/newloan', component: CreateloanComponent, canActivate: [AuthGuard]},
  {path: 'admin/view/viewloan', component: ViewloanComponent, canActivate: [AuthGuard]},
  {path :'user/view/viewloan', component: UserviewloanComponent, canActivate: [AuthGuard]},
  {path: 'admin/editloan/:id', component: AdmineditloanComponent , canActivate: [AuthGuard]},
  {path: 'user/loanapplicationform', component: LoanformComponent , canActivate: [AuthGuard]},
  {path :'admin/view/feedback', component: AdminviewfeedbackComponent, canActivate: [AuthGuard]},
  {path :'user/view/feedback', component: UserviewfeedbackComponent, canActivate: [AuthGuard]},
  {path :'user/add/feedback', component: UseraddfeedbackComponent, canActivate: [AuthGuard]},
  {path: 'user/view/appliedloan', component: UserappliedloanComponent, canActivate: [AuthGuard]},
  {path: 'admin/view/requestedloan', component: RequestedloanComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
