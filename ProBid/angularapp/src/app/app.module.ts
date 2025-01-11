import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


import { SignupComponent } from './components/signup/signup.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ClientnavComponent } from './components/clientnav/clientnav.component';
import { ProjectManagementComponent } from './components/project-management/project-management.component';
import { ClientViewProjectsComponent } from './components/client-view-projects/client-view-projects.component';
import { FreelancernavComponent } from './components/freelancernav/freelancernav.component';
import { FreelancerviewprojectComponent } from './components/freelancerviewproject/freelancerviewproject.component';
import { BidRequestComponent } from './components/bid-request/bid-request.component';
import { FreelancerViewRequestedComponent } from './components/freelancer-view-requested/freelancer-view-requested.component';
import { ClientViewRequestsComponent } from './components/client-view-requests/client-view-requests.component';
import { ClientaddfeedbackComponent } from './components/clientaddfeedback/clientaddfeedback.component';
import { ClientviewfeedbackComponent } from './components/clientviewfeedback/clientviewfeedback.component';
import { FreelancerviewfeedbackComponent } from './components/freelancerviewfeedback/freelancerviewfeedback.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // RegistrationComponent,
    SignupComponent,
    HomePageComponent,
    ErrorComponent,
    ClientnavComponent,
    ProjectManagementComponent,
    ClientViewProjectsComponent,
    FreelancernavComponent,
    FreelancerviewprojectComponent,
    BidRequestComponent,
    FreelancerViewRequestedComponent,
    ClientViewRequestsComponent,
    ClientaddfeedbackComponent,
    ClientviewfeedbackComponent,
    FreelancerviewfeedbackComponent,
  

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




