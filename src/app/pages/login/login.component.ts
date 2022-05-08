import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', [Validators.required]),
  });
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onLogin() {
    this.loading = true;

    if (this.loginForm.invalid) {
      console.error('Error occurred!')
      this.loading = false;
      return;
    }

    this.authService.login(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value)
      .then((cred: any) => {
        console.log('Login ok!');
        this.loading = false;
        this.router.navigateByUrl('/')
        location.reload();
      })
      .catch(error => {
        this.loading = false;
        console.error('Error occurred');
        console.error(error)
      });

  }
}
