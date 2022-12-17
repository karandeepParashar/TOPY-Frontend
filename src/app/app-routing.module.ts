import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent as parentDashboard } from './components/parent/dashboard/dashboard.component';
import { NewMeetingComponent as parentNewMeeting } from './components/parent/new-meeting/new-meeting.component';
import { IncomingMeetingComponent as parentIncomingMeeting } from './components/parent/incoming-meeting/incoming-meeting.component';
import { DashboardComponent as seniorDashboard } from './components/senior-citizen/dashboard/dashboard.component';
import { NewMeetingComponent as seniorNewMeeting } from './components/senior-citizen/new-meeting/new-meeting.component';
import { IncomingMeetingComponent as seniorIncomingMeeting } from './components/senior-citizen/incoming-meeting/incoming-meeting.component';
import { LoginComponent } from './components/shared/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'parent/dashboard',
    component: parentDashboard,
  },
  {
    path: 'parent/dashboard/new-meeting',
    component: parentNewMeeting,
  },
  {
    path: 'parent/dashboard/incoming-meeting',
    component: parentIncomingMeeting,
  },
  {
    path: 'senior-citizen/dashboard',
    component: seniorDashboard,
  },
  {
    path: 'senior-citizen/dashboard/new-meeting',
    component: seniorNewMeeting,
  },
  {
    path: 'senior-citizen/dashboard/incoming-meeting',
    component: seniorIncomingMeeting,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
