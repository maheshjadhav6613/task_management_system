import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoogleApiService {
  private API_URL = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';
  private API_KEY = 'AIzaSyBWPT3Z6aTk4MYY1rK0xlxlQ_GUufwPLj0';  // Use your API Key
  private ACCESS_TOKEN = '266761407655-2ph6jvhfdm85hpgb9uejd5m2ku5o75l8.apps.googleusercontent.com'; // The access token after OAuth login

  constructor(private http: HttpClient) {}

  // Fetch the calendar events
  getCalendarEvents(): Observable<any> {
    const headers = { Authorization: `Bearer ${this.ACCESS_TOKEN}` }; // Set authorization header
    return this.http.get<any>(`${this.API_URL}?key=${this.API_KEY}`, { headers });
  }
}
