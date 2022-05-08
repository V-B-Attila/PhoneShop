import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./shared/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PhoneShop';
  loggedIn: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
    const user = localStorage.getItem('user');
    this.loggedIn = user !== 'null';

    if (user === null) {
      this.loggedIn = false;
    }
  }

  ngOnInit() {
    this.authService.isUserLoggedIn().subscribe((user: any | null | undefined) => {
      localStorage.setItem('user', JSON.stringify(user));
    }, (error: any) => {
      console.log(error);
      localStorage.setItem('user', JSON.stringify('null'))
    });
  }

  logout() {
    this.authService.logout()
      .then(_ => {
        console.log('Logout ok!')
        location.reload();
      }).catch(error => {
      console.log('Error occurred on logout');
      console.log(error);
    });
  }

  toggleSidenav(isOpen: boolean, drawer: any) {
    console.log("app-root from child! " + isOpen)
    drawer.toggle();
  }
}
