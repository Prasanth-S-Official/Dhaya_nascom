import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateloanComponent } from './components/createloan/createloan.component';
import { RequestedloanComponent } from './components/requestedloan/requestedloan.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ViewloanComponent } from './components/viewloan/viewloan.component';
import { UserviewloanComponent } from './components/userviewloan/userviewloan.component';
import { UserappliedloanComponent } from './components/userappliedloan/userappliedloan.component';
import { CommonModule } from '@angular/common';
import { AdmineditloanComponent } from './components/admineditloan/admineditloan.component';
import { LoanformComponent } from './components/loanform/loanform.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { AdminviewproductComponent } from './components/adminviewproduct/adminviewproduct.component';
import { UserviewproductComponent } from './components/userviewproduct/userviewproduct.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MyorderComponent } from './components/myorder/myorder.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // RegistrationComponent,
    SignupComponent,
    HomePageComponent,
    ErrorComponent,
    CreateloanComponent,
    NavbarComponent,
    RequestedloanComponent,
    ViewloanComponent,
    UserviewloanComponent,
    UserappliedloanComponent,
    AdmineditloanComponent,
    LoanformComponent,
    AdminviewfeedbackComponent,
    UserviewfeedbackComponent,
    UseraddfeedbackComponent,
    AdminnavComponent,
    UsernavComponent,
    ProductCreateComponent,
    AdminviewproductComponent,
    UserviewproductComponent,
    CheckoutComponent,
    MyorderComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    NoopAnimationsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
