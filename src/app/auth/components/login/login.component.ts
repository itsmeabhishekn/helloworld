import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  MatDialog,
} from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { LoginService } from '../../../services/authservice/login.service';
import { ToastService } from '../../../services/toast/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';
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
    private dialog: MatDialog,
    private loginService: LoginService,
    private toastService: ToastService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void { }

  onSubmit(loginForm: any) {
    this.spinner.show();
    const user = {
      email: this.username,
      password: this.password
    };
    this.onLogin(user);
  }

  onLogin(user: any) {
    this.loginService.loginUser(user).subscribe(
      response => {
        this.toastService.showSuccess('Login Successful');
        localStorage.setItem('token', response.token);
        this.spinner.hide();
        this.router.navigate(['/home']);
      },
      error => {
        this.spinner.hide();
        this.toastService.showError('Login Failed', 'Error');
        console.error('Login error:', error);
      }
    );
  }


  openSignupModal() {
    const dialogRef = this.dialog.open(SignupComponent, {
      width: '60%',
      height: '60%',
    });
  }
}
