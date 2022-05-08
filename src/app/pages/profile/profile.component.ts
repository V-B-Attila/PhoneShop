import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/model/User";
import {UserService} from "../../shared/services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User | undefined;

  constructor(private userService: UserService) {
    const value = localStorage.getItem('user');
    if (value === null) return;
    const _user = JSON.parse(value) as User;
    const uid = _user.uid;

    // Firestore: Read
    userService.getById(uid).subscribe(user => {
      this.user = user;
    });
  }


  ngOnInit(): void {
  }

}
