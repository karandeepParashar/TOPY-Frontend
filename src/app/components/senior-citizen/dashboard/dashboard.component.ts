import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { SeniorCitizenService } from 'src/app/services/senior-citizen.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user_profile: any = {};
  currentMeetingRequests = [];
  pastMeetingRequests = [];
  displayedColumns: string[] = [
    'Match Id',
    'Status',
    'Pet',
    'Child',
    'Date',
    'Time',
  ];
  getUserData() {
    this.user_profile = this._loginService.getUserData();
  }

  constructor(
    private _loginService: LoginService,
    private _service: SeniorCitizenService
  ) {}
  getCurrentMeetingRequests() {
    this._service
      .getCurrentMeetingRequests(this.user_profile)
      .subscribe((response) => {
        this.currentMeetingRequests = response;
      });
  }
  getPastMeetingRequests() {
    this._service
      .getPastMeetingRequests(this.user_profile)
      .subscribe((response) => {
        this.pastMeetingRequests = response;
      });
  }
  ngOnInit(): void {
    console.log('Reached Senior Citizen Dashboard');
    console.log(
      new Date().getHours() +
        ':' +
        new Date().getMinutes() +
        ':' +
        new Date().getSeconds()
    );
    this.getUserData();
    this.getCurrentMeetingRequests();
    this.getPastMeetingRequests();
    this._service.getSeniorCitizen(this.user_profile);
  }
}
