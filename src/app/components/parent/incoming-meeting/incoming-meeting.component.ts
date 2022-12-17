import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-incoming-meeting',
  templateUrl: './incoming-meeting.component.html',
  styleUrls: ['./incoming-meeting.component.css'],
})
export class IncomingMeetingComponent implements OnInit {
  incomingRequests: any = [];

  constructor(private _service: LoginService) {}

  getIncomingRequests() {
    this._service.getIncomingRequest().subscribe((response) => {
      this.incomingRequests = response;
    });
  }

  updateMeetingRequest(meetingRequest: any, status: string) {
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

  ngOnInit(): void {
    console.log('Reache Parent Incoming Request page');
    console.log(
      new Date().getHours() +
        ':' +
        new Date().getMinutes() +
        ':' +
        new Date().getSeconds()
    );
    this.getIncomingRequests();
  }
}
