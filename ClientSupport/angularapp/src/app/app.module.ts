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
import { ManagernavComponent } from './components/managernav/managernav.component';

import { ManagerviewfeedbackComponent } from './components/managerviewfeedback/managerviewfeedback.component';
import { ClientnavComponent } from './components/clientnav/clientnav.component';
import { TicketManagementComponent } from './components/ticket-management/ticket-management.component';
import { ClientViewTicketsComponent } from './components/client-view-tickets/client-view-tickets.component';
import { SupportAgentManagementComponent } from './components/support-agent-management/support-agent-management.component';
import { ManagerViewAgentsComponent } from './components/manager-view-agents/manager-view-agents.component';
import { ManagerViewTicketsComponent } from './components/manager-view-tickets/manager-view-tickets.component';
import { TicketDetailsComponent } from './components/ticket-details/ticket-details.component';
import { SupportedAgentsComponent } from './components/supported-agents/supported-agents.component';
import { ClientpostfeedbackComponent } from './components/clientpostfeedback/clientpostfeedback.component';
import { ClientviewfeedbackComponent } from './components/clientviewfeedback/clientviewfeedback.component';
import { ManagerDashboardComponent } from './components/manager-dashboard/manager-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // RegistrationComponent,
    SignupComponent,
    HomePageComponent,
    ErrorComponent,
    ManagernavComponent,
    ManagerviewfeedbackComponent,
    ClientnavComponent,
    TicketManagementComponent,
    ClientViewTicketsComponent,
    SupportAgentManagementComponent,
    ManagerViewAgentsComponent,
    ManagerViewTicketsComponent,
    TicketDetailsComponent,
    SupportedAgentsComponent,
    ClientpostfeedbackComponent,
    ClientviewfeedbackComponent,
    ManagerDashboardComponent,
  

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




