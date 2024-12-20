import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4000/api/users'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}


  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post(`${this.apiUrl}/login`, loginData);
  }

  getCurrentUser() {
    // Retrieve user from local storage or session storage
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  setCurrentUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }
}
