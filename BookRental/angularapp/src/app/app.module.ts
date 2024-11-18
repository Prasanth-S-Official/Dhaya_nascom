import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { UseraddrequestComponent } from './components/useraddrequest/useraddrequest.component';
import { UserviewappliedrequestComponent } from './components/userviewappliedrequest/userviewappliedrequest.component';
import { UserviewtrainingComponent } from './components/userviewtraining/userviewtraining.component';
import { AdminaddtrainingComponent } from './components/adminaddtraining/adminaddtraining.component';
import { AdminedittrainingComponent } from './components/adminedittraining/adminedittraining.component';
import { AdminviewappliedrequestComponent } from './components/adminviewappliedrequest/adminviewappliedrequest.component';
import { AdminviewtrainingComponent } from './components/adminviewtraining/adminviewtraining.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AdminbookComponent } from './components/adminbook/adminbook.component';
import { AdminviewbookComponent } from './components/adminviewbook/adminviewbook.component';
import { UserviewbooksComponent } from './components/userviewbooks/userviewbooks.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // RegistrationComponent,
    SignupComponent,
    HomePageComponent,
    ErrorComponent,
    AdminviewfeedbackComponent,
    UserviewfeedbackComponent,
    UseraddfeedbackComponent,
    AdminnavComponent,
    UsernavComponent,
    UseraddrequestComponent,
    UserviewappliedrequestComponent,
    UserviewtrainingComponent,
    AdminaddtrainingComponent,
    AdminedittrainingComponent,
    AdminviewappliedrequestComponent,
    AdminviewtrainingComponent,
    AdminbookComponent,
    AdminviewbookComponent,
    UserviewbooksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }




