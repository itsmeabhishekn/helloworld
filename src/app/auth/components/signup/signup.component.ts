import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router,
    private dialogRef: MatDialogRef<SignupComponent>
  ) { }
  ngOnInit(): void { }

  onSubmit(signupForm: any) {
    // Handle signup logic here (e.g., call a service to register user)
    console.log('Signup form submitted:', signupForm.value);

    // Simulate successful signup (replace with actual API call):
    if (this.username && this.email && this.password.length >= 6) {
      alert('Signup successful!');
      this.router.navigate(['/login']); // Redirect to login page on success
    } else {
      alert('Please fill in all fields and ensure a password length of at least 6 characters.');
    }
  }


  onCloseClick() {
    this.dialogRef.close(); // Close the modal dialog
  }

}
