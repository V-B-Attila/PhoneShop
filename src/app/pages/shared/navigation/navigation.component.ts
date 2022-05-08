import {Component, EventEmitter, OnChanges, OnInit, Output} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  loggedIn: boolean = false;
  @Output() isOpenEmit: EventEmitter<boolean> = new EventEmitter();
  isOpen = false;

  constructor(private authService: AuthService) {
    const user = localStorage.getItem('user');
    this.loggedIn = user !== 'null';

    if (user === null) {
      this.loggedIn = false;
    }
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

  ngOnInit(): void {

  }

  toggleDrawer() {
    this.isOpen = !this.isOpen;
    this.isOpenEmit.emit(this.isOpen);
  }
}
