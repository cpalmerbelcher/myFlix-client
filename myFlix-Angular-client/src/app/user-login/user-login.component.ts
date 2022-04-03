import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FetchApiDataServices } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  /**
   * Required fields for users to login
   */
   @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataServices,
    public router: Router,
    public dialogRef: MatDialogRef<UserLoginComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  /**
   * Send a request to login the user
   * Saves the token and username in localSotrage
   * Once logged in, re-route to movies page 
   */
   loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response: { token: string; user: { Username: string; }; }) => {
      this.dialogRef.close();
      console.log(response);
      localStorage.setItem('token', response.token);
      localStorage.setItem('username', response.user.Username);
      this.snackBar.open('User login successful!', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies']);
    }, (response: string) => {
      console.log(response);
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }
}
