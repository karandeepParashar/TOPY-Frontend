import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  currentMeetingRequests = [];
  pastMeetingRequests = [];

  displayedColumns: string[] = [
    'Match Id',
    'Status',
    'Pet',
    'Child',
    'SeniorCitizen',
    'Date',
    'Time',
  ];

  user_data = {
    name: '',
  };
  constructor(private loginService: LoginService) {}

  getCurrentMeetingRequests() {
    this.loginService
      .getCurrentMeetingRequests(this.user_data)
      .subscribe((response) => {
        this.currentMeetingRequests = response;
      });
  }
  getPastMeetingRequests() {
    this.loginService
      .getPastMeetingRequests(this.user_data)
      .subscribe((response) => {
        this.pastMeetingRequests = response;
      });
  }

  ngOnChange() {
    this.user_data = this.loginService.getUserData();
  }
  ngOnInit(): void {
    console.log('Reached Parent Dashboard');
    console.log(
      new Date().getHours() +
        ':' +
        new Date().getMinutes() +
        ':' +
        new Date().getSeconds()
    );
    this.user_data = this.loginService.getUserData();
    this.getCurrentMeetingRequests();
    this.getPastMeetingRequests();
  }
}
