import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginService } from '../../../services/authservice/login.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, NgxSpinnerModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router,
    private dialogRef: MatDialogRef<SignupComponent>,
    private loginService: LoginService,
    private ngxloaderService: NgxSpinnerService
  ) { }
  ngOnInit(): void { }

  onSubmit(signupForm: any) {
    this.ngxloaderService.show();
    if (this.username && this.email && this.password.length >= 6) {
      this.registerUser();
    } else {
      alert('Please fill in all fields and ensure a password length of at least 6 characters.');
    }
  }


  registerUser() {
    this.loginService.registerUser({ username: this.username, email: this.email, password: this.password }).subscribe(
      (response) => {
        this.ngxloaderService.hide();
        console.log('User registered successfully:', response);
        this.onCloseClick()
      },
      (error) => {
        this.ngxloaderService.hide();
        console.error('Error registering user:', error);
      }
    )
  }

  onCloseClick() {
    this.dialogRef.close();
  }

}
