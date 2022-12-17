import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { SeniorCitizenService } from 'src/app/services/senior-citizen.service';

@Component({
  selector: 'app-incoming-meeting',
  templateUrl: './incoming-meeting.component.html',
  styleUrls: ['./incoming-meeting.component.css'],
})
export class IncomingMeetingComponent implements OnInit {
  incomingRequests: any = [];
  user_profile: any = {};
  constructor(
    private _loginService: LoginService,
    private _service: SeniorCitizenService
  ) {}

  getUserData() {
    this.user_profile = this._loginService.getUserData();
  }

  updateRequest(meetingRequest: any, status: string) {
    let meeting = meetingRequest['data'];

    meeting['status'] = status;
    this._service.putMeetingUpdate(meeting).subscribe((response) => {
      this.getIncomingRequests();
      console.log('A request is ' + status);
      console.log(
        new Date().getHours() +
          ':' +
          new Date().getMinutes() +
          ':' +
          new Date().getSeconds()
      );
    });
  }

  getIncomingRequests() {
    this._service
      .getIncomingMeetings(this.user_profile)
      .subscribe((response) => {
        this.incomingRequests = response;
      });
  }
  ngOnInit(): void {
    console.log('Reached incoming meeting for senior citizen');
    console.log(
      new Date().getHours() +
        ':' +
        new Date().getMinutes() +
        ':' +
        new Date().getSeconds()
    );
    this.getUserData();
    this.getIncomingRequests();
  }
}
