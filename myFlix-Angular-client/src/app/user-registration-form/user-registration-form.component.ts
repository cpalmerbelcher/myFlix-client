import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataServices } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataServices,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

//this is the function responsible for sending the form inputs to the backend
registerUser(): void {
  this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
    //logic for a successful user registration goes here (to be implimented)
  this.dialogRef.close(); //this will close the modal on success
  console.log(response);
  this.snackBar.open('user registration successfully!', 'OK', {
    duration: 2000
  });
  }, (response) => {
    console.log(response);
    this.snackBar.open(response, 'OK', {
      duration: 2000
    });
  });
}

}
