import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  MatDialog,
} from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onSubmit(loginForm: any) {
    if (this.username === 'admin' && this.password === 'password') {
      this.router.navigate(['/']);
    } else {
      alert('Invalid username or password'); 
    }
  }

  openSignupModal() {
    const dialogRef = this.dialog.open(SignupComponent, {
      width: '60%', 
      height: '60%',
    });
  }
}
