import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './components/authguard/auth.guard';
import { SignupComponent } from './components/signup/signup.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { AdminviewproductComponent } from './components/adminviewproduct/adminviewproduct.component';
import { UserviewproductComponent } from './components/userviewproduct/userviewproduct.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MyorderComponent } from './components/myorder/myorder.component';
import { ReviewComponent } from './components/review/review.component';
import { MyreviewComponent } from './components/myreview/myreview.component';
import { OrderplacedComponent } from './components/orderplaced/orderplaced.component';
import { AdminviewreviewsComponent } from './components/adminviewreviews/adminviewreviews.component';

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
  { path: 'user/myorders', component: MyorderComponent,canActivate: [AuthGuard]},
  { path: 'user/review/:productId', component: ReviewComponent,canActivate: [AuthGuard]},
  {path :'user/myreview', component: MyreviewComponent, canActivate: [AuthGuard]},
  {path :'admin/orderplaced', component: OrderplacedComponent, canActivate: [AuthGuard]},
  {path :'admin/view/reviews', component: AdminviewreviewsComponent, canActivate: [AuthGuard]},

  //---------------------------------
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
