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
import { AdminviewappliedrequestComponent } from './components/adminviewappliedrequest/adminviewappliedrequest.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AdminMaterialComponent } from './components/admin-material/admin-material.component';
import { AdminViewMaterialComponent } from './components/admin-view-material/admin-view-material.component';
import { UserviewmaterialComponent } from './components/userviewmaterial/userviewmaterial.component';
import { AdminInsightsComponent } from './components/admin-insights/admin-insights.component';
import { ClientnavComponent } from './components/clientnav/clientnav.component';
import { ProjectManagementComponent } from './components/project-management/project-management.component';

import { ClientViewProjectsComponent } from './components/client-view-projects/client-view-projects.component';
import { FreelancernavComponent } from './components/freelancernav/freelancernav.component';
import { FreelancerviewprojectComponent } from './components/freelancerviewproject/freelancerviewproject.component';
import { BidRequestComponent } from './components/bid-request/bid-request.component';
import { FreelancerViewRequestedComponent } from './components/freelancer-view-requested/freelancer-view-requested.component';
import { ClientViewRequestsComponent } from './components/client-view-requests/client-view-requests.component';

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
    AdminviewappliedrequestComponent,
    AdminMaterialComponent,
    AdminViewMaterialComponent,
    UserviewmaterialComponent,
    AdminInsightsComponent,
    ClientnavComponent,
    ProjectManagementComponent,
    ClientViewProjectsComponent,
    FreelancernavComponent,
    FreelancerviewprojectComponent,
    BidRequestComponent,
    FreelancerViewRequestedComponent,
    ClientViewRequestsComponent,
  

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




