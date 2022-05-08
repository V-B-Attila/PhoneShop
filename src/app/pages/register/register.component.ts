import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../shared/services/auth.service";
import {User} from "../../shared/model/User";
import firebase from "firebase/compat";
import UserInfo = firebase.UserInfo;
import {UserService} from "../../shared/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    passwordRe: new FormControl('', [Validators.required]),
  });
  loading: boolean = false;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
  }

  onRegister() {
    this.loading = true;

    if (this.registerForm.invalid) {
      console.error('Error occurred!')
      this.loading = false;
      return;
    }

    if (this.registerForm.controls['password'].value !== this.registerForm.controls['passwordRe'].value) {
      console.error('Passwords dont match!');
      return;
    }

    this.authService.register(this.registerForm.controls['email'].value, this.registerForm.controls['password'].value)
      .then((cred: any) => {
        const user: User = {
          uid: cred.user.uid,
          email: this.registerForm.controls['email'].value,
          name: this.registerForm.controls['name'].value,
        };

        this.userService.create(user).then(_ => {
          this.router.navigateByUrl('/');
          location.reload();
          this.loading = false;
        }).catch(error => {
          console.error(error);
          this.loading = false;
        });
        console.log('Registration successful!')
      })
      .catch(error => {
        console.error('Error occurred');
        console.error(error)
        this.loading = false;
      });
  }

}
