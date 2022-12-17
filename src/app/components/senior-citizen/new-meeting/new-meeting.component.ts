import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { LoginService } from 'src/app/services/login.service';
import { SeniorCitizenService } from 'src/app/services/senior-citizen.service';
@Component({
  selector: 'app-new-meeting',
  templateUrl: './new-meeting.component.html',
  styleUrls: ['./new-meeting.component.css'],
})
export class NewMeetingComponent implements OnInit {
  topy_locations: any = [];
  includePet: any = true;
  activities: any = [];
  childrenList: any = [];
  petList: any = [];
  user_profile: any = {};
  selectedChild: any = null;
  selectedPet: any = { pet_id: null };
  meetingForm = new FormGroup({
    date: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
  });
  genders: any = [
    { name: 'Male', value: 'M' },
    { name: 'Female', value: 'F' },
  ];

  recommendationList: any = [];
  senior_citizen_object: any = {
    name: '',
    gender: '',
    birthday: '',
    want_pet: true,
    want_child: true,
    about_me: '',
    emergency_contact: '',
    user_type: 1,
    user: 1,
    activity_pref: [],
  };
  senior_citizen_form = new FormGroup({
    name: new FormControl(this.senior_citizen_object.name, [
      Validators.required,
    ]),
    gender: new FormControl(this.senior_citizen_object.gender, [
      Validators.required,
    ]),
    birthday: new FormControl(this.senior_citizen_object.birthday, [
      Validators.required,
    ]),
    about_me: new FormControl(this.senior_citizen_object.about_me),
    emergency_contact: new FormControl(
      this.senior_citizen_object.emergency_contact
    ),
    activity_pref: new FormControl(this.senior_citizen_object.activity_pref),
  });

  editSeniorCitizen() {
    let details = {
      senior_citizen_id: this.senior_citizen_object['senior_citizen_id'],
      name: this.senior_citizen_form.get('name')?.value,
      gender: this.senior_citizen_form.get('gender')?.value,
      birthday: moment(this.senior_citizen_form.get('birthday')?.value).format(
        'YYYY-MM-DD'
      ),
      want_pet: true,
      want_child: true,
      about_me: this.senior_citizen_form.get('about_me')?.value,
      emergency_contact: this.senior_citizen_form.value.emergency_contact,
      user_type: 1,
      user: this.senior_citizen_object['user'],
      activity_pref: this.senior_citizen_form.value.activity_pref,
    };

    this._service.putSeniorCitizenDetails(details).subscribe((response) => {
      console.log('Senior Citizen Details edited successfully');
      this._snackBar.open('Request successfully sent!', 'Okay');
    });
  }
  getUserData() {
    this.user_profile = this._loginService.getUserData();
  }

  getActivities() {
    this._loginService.getChildActivities().subscribe((response) => {
      this.activities = response;
    });
  }

  getAllChildren() {
    this._service.getAllChildren().subscribe((response) => {
      this.childrenList = response;
    });
  }

  getAllPet() {
    const user_id = this.selectedChild['user'];
    this._service.getPetsList(user_id).subscribe((response) => {
      this.petList = response;
    });
  }
  selectChild(child: any) {
    console.log('A child is selected for meeting request');
    console.log(
      new Date().getHours() +
        ':' +
        new Date().getMinutes() +
        ':' +
        new Date().getSeconds()
    );
    this.selectedChild = child;
    this.getAllPet();
  }

  selectPet(pet: any) {
    if (this.includePet == true) {
      console.log('A pet is selected for meeting request');
      console.log(
        new Date().getHours() +
          ':' +
          new Date().getMinutes() +
          ':' +
          new Date().getSeconds()
      );
      this.selectedPet = pet;
    } else {
      console.log('No pet is selected for meeting request');
      console.log(
        new Date().getHours() +
          ':' +
          new Date().getMinutes() +
          ':' +
          new Date().getSeconds()
      );
      this.selectedPet = { pet_id: null };
    }
  }

  getTOPYLocations() {
    this._loginService.getTOPYLocations().subscribe((response) => {
      this.topy_locations = response;
    });
  }

  getRecommendations() {
    this._service
      .getRecommendationSeniorCitizen(this.senior_citizen_object)
      .subscribe((response) => {
        this.recommendationList = response;
      });
  }
  sendRequest() {
    this.meetingForm.value.date = moment(this.meetingForm.value.date).format(
      'YYYY-MM-DD'
    );
    const meeting = {
      date: this.meetingForm.value.date,
      time: this.meetingForm.value.time,
      status: 'Pending',
      initiator_type: 1,
      pet: this.selectedPet['pet_id'],
      child: this.selectedChild['child_id'],
      topy_location: this.meetingForm.value.location,
      senior_citizen: this.senior_citizen_object['senior_citizen_id'],
    };
    this._loginService.addNewMeeting(meeting).subscribe((response) => {
      if ('match_id' in response) {
        this._snackBar.open('Request successfully sent!', 'Okay');
        console.log(
          'A new request has been initiated from senior citizen to a parent'
        );
        console.log(
          new Date().getHours() +
            ':' +
            new Date().getMinutes() +
            ':' +
            new Date().getSeconds()
        );
        this.router.navigateByUrl('/senior-citizen/dashboard');
      } else {
        console.log('Meeting request failed');
        console.log(
          new Date().getHours() +
            ':' +
            new Date().getMinutes() +
            ':' +
            new Date().getSeconds()
        );
        this._snackBar.open('Request not sent!', 'Okay');
      }
    });
  }
  constructor(
    private _formBuilder: FormBuilder,
    private _loginService: LoginService,
    private _service: SeniorCitizenService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}
  ngOnInit(): void {
    console.log('Reached Senior Citizen create new meeting request page');
    console.log(
      new Date().getHours() +
        ':' +
        new Date().getMinutes() +
        ':' +
        new Date().getSeconds()
    );
    this.getActivities();
    this.getUserData();
    this.senior_citizen_object = this._service.sendSeniorCitizenData();
    this.getAllChildren();
    this.getTOPYLocations();
    this.getRecommendations();
  }
}
