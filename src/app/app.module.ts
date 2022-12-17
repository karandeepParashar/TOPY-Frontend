import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/shared/login/login.component';
import { DashboardComponent } from './components/parent/dashboard/dashboard.component';
import { NewMeetingComponent } from './components/parent/new-meeting/new-meeting.component';
import { IncomingMeetingComponent } from './components/parent/incoming-meeting/incoming-meeting.component';
import { ParentHeaderComponent } from './components/parent/parent-header/parent-header.component';
import { SeniorCitizentHeaderComponent } from './components/senior-citizen/senior-citizent-header/senior-citizent-header.component';
import { DashboardComponent as seniorDashboard } from './components/senior-citizen/dashboard/dashboard.component';
import { NewMeetingComponent as seniorNewMeeting } from './components/senior-citizen/new-meeting/new-meeting.component';
import { IncomingMeetingComponent as seniorIncomingMeeting } from './components/senior-citizen/incoming-meeting/incoming-meeting.component';
import { AddChildComponent } from './components/parent/add-child/add-child.component';
import { AddPetComponent } from './components/parent/add-pet/add-pet.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NewMeetingComponent,
    IncomingMeetingComponent,
    ParentHeaderComponent,
    SeniorCitizentHeaderComponent,
    seniorDashboard,
    seniorNewMeeting,
    seniorIncomingMeeting,
    AddChildComponent,
    AddPetComponent,
  ],
  entryComponents: [AddChildComponent, AddPetComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
