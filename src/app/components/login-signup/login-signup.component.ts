import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user/users.service';

@Component({
  selector: 'app-login-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.css'
})
export class LoginSignupComponent {
  isSignupOpen = false; // Controls the visibility of the sign-up modal
  loginData = { email: '', password: '' };
  signupData = { name: '', email: '', password: '' };

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Handles the login process
   */
  onLogin() {
    if (!this.loginData.email || !this.loginData.password) {
      alert('Please enter your email and password.');
      return;
    }

    this.http.post('http://localhost:4000/api/login', this.loginData).subscribe(
      (response: any) => {
        console.log('Login successful', response);
        localStorage.setItem('authToken', response.token); // Store token or relevant data
        this.router.navigate(['/nav/mainBody']); // Navigate to the main content
      },
      (error) => {
        console.error('Login failed', error);
        alert('Invalid login credentials');
      }
    );
  }

  /**
   * Handles the sign-up process
   */
  onSignup() {
    if (!this.signupData.name || !this.signupData.email || !this.signupData.password) {
      alert('Please fill out all the fields.');
      return;
    }

    this.http.post('http://localhost:4000/api/signup', this.signupData).subscribe(
      (response) => {
        console.log('Sign-Up successful', response);
        this.toggleSignup(); // Close Sign-Up modal
        alert('Sign-Up successful! Please log in.');
      },
      (error) => {
        console.error('Sign-Up failed', error);
        alert('Failed to sign up. Please try again.');
      }
    );
  }

  /**
   * Toggles the sign-up modal
   */
  toggleSignup() {
    this.isSignupOpen = !this.isSignupOpen;
  }

}
