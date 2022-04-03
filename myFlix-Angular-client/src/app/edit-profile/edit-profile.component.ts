import { Component, Input, OnInit } from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FetchApiDataServices } from '../fetch-api-data.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  /**
   * Required fields tp update user info
   */
   @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataServices,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    public snackBar: MatSnackBar,
    public router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Updates user details
   */
   editUserProfile(): void {
    this.fetchApiData.editUserProfile(this.userData).subscribe((res) => {
      this.dialogRef.close();
      localStorage.setItem('username', res.Username)
      console.log(res)
      this.snackBar.open(this.userData.Username, 'Successfully updated user details!', {
        duration: 3000
      });
    }, (res) => {
      this.snackBar.open(res, 'OK', {
        duration: 3000
      });
      setTimeout(function () {
        window.location.reload();
      }, 3500);
    })
  }
}
