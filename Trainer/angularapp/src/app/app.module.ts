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
import { ManagernavComponent } from './components/managernav/managernav.component';
import { ManagerRequirementComponent } from './components/manager-requirement/manager-requirement.component';
import { ManagerViewRequirementsComponent } from './components/manager-view-requirements/manager-view-requirements.component';
import { CoordinatornavComponent } from './components/coordinatornav/coordinatornav.component';
import { TrainerManagementComponent } from './components/trainer-management/trainer-management.component';
import { CoordinatorViewTrainersComponent } from './components/coordinator-view-trainers/coordinator-view-trainers.component';
import { CoordinatorViewRequirementsComponent } from './components/coordinator-view-requirements/coordinator-view-requirements.component';
import { TrainerDetailsComponent } from './components/trainer-details/trainer-details.component';
import { SelectedTrainersComponent } from './components/selected-trainers/selected-trainers.component';
import { ManagerpostfeedbackComponent } from './components/managerpostfeedback/managerpostfeedback.component';
import { ManagerviewfeedbackComponent } from './components/managerviewfeedback/managerviewfeedback.component';

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
    ManagernavComponent,
    ManagerRequirementComponent,
    ManagerViewRequirementsComponent,
    CoordinatornavComponent,
    TrainerManagementComponent,
    CoordinatorViewTrainersComponent,
    CoordinatorViewRequirementsComponent,
    TrainerDetailsComponent,
    SelectedTrainersComponent,
    ManagerpostfeedbackComponent,
    ManagerviewfeedbackComponent,
  

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




