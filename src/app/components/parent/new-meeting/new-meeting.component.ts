import { Component, ComponentRef, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { AddChildComponent } from '../add-child/add-child.component';
import { AddPetComponent } from '../add-pet/add-pet.component';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-meeting',
  templateUrl: './new-meeting.component.html',
  styleUrls: ['./new-meeting.component.css'],
})
export class NewMeetingComponent implements OnInit {
  includePet: boolean = true;
  childrenList: any = [];
  petList: any = [];
  userData = {};
  seniorCitizenList = [];
  topy_locations: any = [];
  selectedPet: any = { pet_id: null };

  senior_citizen_list: any[] = [];
  displayedColumns: string[] = [
    'name',
    'gender',
    'birthday',
    'activities',
    'about_me',
    'emergency_contact',
  ];

  meetingForm = new FormGroup({
    date: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
  });

  openAddChildDialog() {
    console.log('Add Child dialog box is opened');
    console.log(
      new Date().getHours() +
        ':' +
        new Date().getMinutes() +
        ':' +
        new Date().getSeconds()
    );
    const dialogRef = this.dialog.open(AddChildComponent, {
      height: '580px',
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllChildren();
    });
  }

  getAllChildren() {
    this.childrenList = [
      {
        child_id: 1,
        name: 'David Clinton',
        gender: 'M',
        birthday: '1995-04-03',
        want_pet: true,
        about_me: 'Like board games',
        emergency_contact: '+14188548458',
        user: 10,
        activity_pref: ['Chess', 'Board games'],
      },
      {
        child_id: 2,
        name: 'Bella Clinton',
        gender: 'F',
        birthday: '1995-04-03',
        want_pet: true,
        about_me: 'Like board games',
        emergency_contact: '+14188548458',
        user: 10,
        activity_pref: ['Chess', 'Cricket'],
      },
    ];
    this.service.getAllChildren().subscribe((response) => {
      console.log(response);
      this.childrenList = response;
    });
  }

  selectChild(child: any) {
    this.selectedChild = child;
    this.getRecommendations();
    console.log('A child is selected');
    console.log(
      new Date().getHours() +
        ':' +
        new Date().getMinutes() +
        ':' +
        new Date().getSeconds()
    );
  }
  deleteChild(child: any) {}

  openAddPetDialog() {
    console.log('Add Pet dialog box is opened');
    console.log(
      new Date().getHours() +
        ':' +
        new Date().getMinutes() +
        ':' +
        new Date().getSeconds()
    );
    const dialogRef = this.dialog.open(AddPetComponent, {
      height: '600px',
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllPets();
    });
  }

  getAllPets() {
    this.service.getAllPet().subscribe((response) => {
      this.petList = response;
    });
  }

  selectPet(pet: any) {
    if (this.includePet == true) {
      console.log('A pet is selected');
      console.log(
        new Date().getHours() +
          ':' +
          new Date().getMinutes() +
          ':' +
          new Date().getSeconds()
      );
      this.selectedPet = pet;
    } else {
      console.log('No pet is selected');
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
  deletePet(pet: any) {}

  selectedSeniorCitizen: any = {};
  selectedChild: any = {};
  selectedRowIndex = -1;

  selectSeniorCitizen(selectedObject: any) {
    console.log('A senior citizen is selected');
    console.log(
      new Date().getHours() +
        ':' +
        new Date().getMinutes() +
        ':' +
        new Date().getSeconds()
    );
    this.selectedSeniorCitizen = selectedObject;
  }

  getAllSeniorCitizen() {
    this.senior_citizen_list = [];
    this.service.getAllSeniorCitizens().subscribe((response) => {
      this.senior_citizen_list = response;
    });
  }

  getRecommendations() {
    this.service
      .getRecommendationsParent(this.selectedChild)
      .subscribe((response) => {
        console.log(response);

        this.seniorCitizenList = response;
      });
  }

  getTOPYLocations() {
    this.service.getTOPYLocations().subscribe((response) => {
      this.topy_locations = response;
    });
  }

  getUserData() {
    this.userData = this.service.getUserData();
  }
  meetingRequest: any = {};

  sendRequest() {
    this.meetingForm.value.date = moment(this.meetingForm.value.date).format(
      'YYYY-MM-DD'
    );
    const meeting = {
      date: this.meetingForm.value.date,
      time: this.meetingForm.value.time,
      status: 'Pending',
      initiator_type: 2,
      pet: this.selectedPet['pet_id'],
      child: this.selectedChild['child_id'],
      topy_location: this.meetingForm.value.location,
      senior_citizen: this.selectedSeniorCitizen['senior_citizen_id'],
    };
    this.service.addNewMeeting(meeting).subscribe((response) => {
      if ('match_id' in response) {
        this._snackBar.open('Request successfully sent!', 'Okay');
        console.log('A meeting request is sent');
        console.log(
          new Date().getHours() +
            ':' +
            new Date().getMinutes() +
            ':' +
            new Date().getSeconds()
        );
        this.router.navigateByUrl('/parent/dashboard');
      } else {
        this._snackBar.open('Request not sent!', 'Okay');
        console.log('A meeting request is not sent');
        console.log(
          new Date().getHours() +
            ':' +
            new Date().getMinutes() +
            ':' +
            new Date().getSeconds()
        );
      }
    });
  }
  ngOnInit(): void {
    console.log('Reached Parent Set Up a meeting page');
    console.log(
      new Date().getHours() +
        ':' +
        new Date().getMinutes() +
        ':' +
        new Date().getSeconds()
    );
    this.getUserData();
    this.getAllChildren();
    this.getAllPets();
    this.getAllSeniorCitizen();
    this.getTOPYLocations();
  }
  constructor(
    private _formBuilder: FormBuilder,
    private service: LoginService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}
  onChange() {
    console.log('On Focus');

    this.getAllChildren();
    this.getAllPets();
  }
}
