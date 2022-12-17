import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { LoginService } from 'src/app/services/login.service';
import { AddChildComponent } from '../add-child/add-child.component';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css'],
})
export class AddPetComponent implements OnInit {
  genders: any[] = [
    { name: 'Male', value: 'M' },
    { name: 'Female', value: 'F' },
  ];
  activities: any[] = [];

  addPetForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    gender: new FormControl(''),
    pet_animal_type: new FormControl(''),
    pet_breed: new FormControl(''),
    birthday: new FormControl(''),
    about_me: new FormControl(''),
    activity_pref: new FormControl(''),
    emergency_contact: new FormControl('', [Validators.required]),
  });

  addPet() {
    this.addPetForm.value.birthday = moment(
      this.addPetForm.value.birthday
    ).format('YYYY-MM-DD');
    this.service.addPetDetails(this.addPetForm.value).subscribe((response) => {
      console.log('Pet details are submitted and dialog box is closed');
      console.log(
        new Date().getHours() +
          ':' +
          new Date().getMinutes() +
          ':' +
          new Date().getSeconds()
      );
    });
    this.dialogRef.close();
  }

  getActivities() {
    this.service.getPetActivities().subscribe((response) => {
      this.activities = response;
    });
  }
  constructor(
    private service: LoginService,
    public dialogRef: MatDialogRef<AddChildComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.getActivities();
  }
}
