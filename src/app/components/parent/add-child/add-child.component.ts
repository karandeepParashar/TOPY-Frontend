import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import * as moment from 'moment';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
@Component({
  selector: 'app-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.css'],
})
export class AddChildComponent implements OnInit {
  genders: any[] = [
    { name: 'Male', value: 'M' },
    { name: 'Female', value: 'F' },
  ];
  activities: any[] = [
    {
      activity_id: 2,
      name: 'Walking',
      user_type: 2,
    },
    {
      activity_id: 3,
      name: 'Stories',
      user_type: 2,
    },
  ];
  topyStations: string[] = [
    'TOPY Station 1',
    'TOPY Station 2',
    'TOPY Station 3',
  ];
  addChildForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    gender: new FormControl(''),
    birthday: new FormControl('', [Validators.required]),
    wantPet: new FormControl(true),
    about_me: new FormControl(''),
    activity_pref: new FormControl(''),
    emergency_contact: new FormControl('', [Validators.required]),
  });

  addChild() {
    this.addChildForm.value.birthday = moment(
      this.addChildForm.value.birthday
    ).format('YYYY-MM-DD');
    this.service
      .addChildDetails(this.addChildForm.value)
      .subscribe((response) => {
        console.log('Child details are submitted and dialog box closed');
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
    this.service.getChildActivities().subscribe((response) => {
      this.activities = response;
    });
  }
  constructor(
    private service: LoginService,
    public dialogRef: MatDialogRef<AddChildComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {}
}
