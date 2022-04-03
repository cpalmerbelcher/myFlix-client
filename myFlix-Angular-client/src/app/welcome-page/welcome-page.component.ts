import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserLoginComponent } from '../user-login/user-login.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  // title = 'myFlix-Angular-client';

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  /**
   * opens registration dialog
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  /**
   * opens login dialog
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginComponent, {
      width: '500px'
    });
  }
}
