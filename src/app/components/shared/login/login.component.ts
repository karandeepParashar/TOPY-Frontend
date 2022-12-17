import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { zip } from 'rxjs';
import { DateAdapter } from '@angular/material/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    user_type: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  registerForm = new FormGroup(
    {
      user_type: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      zip_code: new FormControl('', [Validators.required]),
    },
    [this.checkPassword]
  );

  constructor(
    private snackBar: MatSnackBar,
    private loginService: LoginService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  login() {
    this.loginService.login(this.loginForm.value).subscribe((response) => {
      localStorage.setItem('USER-ID', response[0]['user_id']);
      let password = this.loginForm.get('password')?.value;
      this.loginService.setUserData(response[0]);
      if (password == response[0]['password']) {
        if (this.loginForm.get('user_type')?.value == '1') {
          this.router.navigateByUrl('senior-citizen/dashboard');
          console.log('Successfully Logged in: User Type - Senior Citizen');
        } else {
          this.router.navigateByUrl('parent/dashboard');
          console.log('Successfully Logged in: User Type - Senior Citizen');
        }
      }
    });
  }
  register() {
    let registerRequest = {
      name: this.registerForm.get('name')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      zip_code: this.registerForm.get('zip_code')?.value,
      user_type: this.registerForm.get('user_type')?.value,
      address1: '',
      address2: '',
      city: '',
      birthday: null,
      gender: '',
      phone: '',
    };

    this.loginService
      .registerUser(registerRequest)
      .toPromise()
      .then((data: any) => {
        this._snackBar.open('Request successfully sent!', 'Okay');
        console.log('Successfully registered');
        console.log(
          new Date().getHours() +
            ':' +
            new Date().getMinutes() +
            ':' +
            new Date().getSeconds()
        );
      });
    this.router.navigateByUrl('/login');
  }

  checkPassword(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (password != confirmPassword) {
      return {
        mismatchPassword: true,
      };
    }
    return null;
  }

  ngOnInit(): void {
    console.log('Login/Registeration Page');
    console.log(
      new Date().getHours() +
        ':' +
        new Date().getMinutes() +
        ':' +
        new Date().getSeconds()
    );
  }
}
