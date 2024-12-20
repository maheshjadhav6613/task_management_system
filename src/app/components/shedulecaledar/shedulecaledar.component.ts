import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

declare const gapi: any;
declare const google: any;

const CLIENT_ID =
  '266761407655-2ph6jvhfdm85hpgb9uejd5m2ku5o75l8.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBWPT3Z6aTk4MYY1rK0xlxlQ_GUufwPLj0';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar';



@Component({
  selector: 'app-shedulecaledar',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './shedulecaledar.component.html',
  styleUrl: './shedulecaledar.component.css'
})
export class ShedulecaledarComponent{
  events: any[] = [];
  selectedEvent: any;
  eventForm!: FormGroup;
  tokenClient: any;
  gapiInited = false;
  gisInited = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.loadGoogleAPI();
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      appointmentTime: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required],
    });
  }

  // Load Google API client
  loadGoogleAPI() {
    gapi.load('client', this.initializeGapiClient.bind(this));
    this.tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: (resp: any) => this.tokenCallback(resp),
    });
  }

  // Initialize Google API client
  async initializeGapiClient() {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    this.gapiInited = true;
    this.listEvents(); // Fetch events on initialization
  }

  // Callback after OAuth token is received
  tokenCallback(resp: any) {
    if (resp.error) {
      console.error('Error obtaining OAuth token:', resp.error);
      return;
    }

    // Store the access token in the global scope
    gapi.client.setApiKey(API_KEY);
    gapi.auth.setToken({
      access_token: resp.access_token,
    });
    this.listEvents(); // Fetch events after successful authentication
  }

  // Fetch events
  listEvents() {
    gapi.client.calendar.events
      .list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 20,
        orderBy: 'startTime',
      })
      .then((response: any) => {
        this.events = response.result.items || [];
      })
      .catch((error: any) => {
        console.error('Error fetching events:', error);
      });
  }

  // Select an event to edit
  editEvent(event: any) {
    this.selectedEvent = event;
    this.eventForm.patchValue({
      title: event.summary,
      appointmentTime: event.start.dateTime,
      email: event.attendees ? event.attendees[0].email : '',
      description: event.description || '',
    });
  }

  // Update an event
  updateEvent() {
    if (this.eventForm.invalid) return;

    const updatedEvent = {
      summary: this.eventForm.value.title,
      location: '',
      description: this.eventForm.value.description,
      start: {
        dateTime: this.eventForm.value.appointmentTime,
        timeZone: 'Asia/Kolkata',
      },
      end: {
        dateTime: this.getEndTime(new Date(this.eventForm.value.appointmentTime)),
        timeZone: 'Asia/Kolkata',
      },
      attendees: [{ email: this.eventForm.value.email }],
    };

    const request = gapi.client.calendar.events.update({
      calendarId: 'primary',
      eventId: this.selectedEvent.id,
      resource: updatedEvent,
    });

    request.execute((event: any) => {
      if (event.htmlLink) {
        console.log('Event updated: ' + event.htmlLink);
        this.listEvents(); // Refresh events after update
      } else {
        console.error('Error updating event:', event);
      }
    });
  }

  // Delete an event
  deleteEvent(eventId: string) {
    const request = gapi.client.calendar.events.delete({
      calendarId: 'primary',
      eventId: eventId,
    });

    request.execute(() => {
      console.log('Event deleted successfully');
      this.listEvents(); // Refresh events list
    });
  }

  // Calculate end time (1 hour after start time)
  getEndTime(appointmentTime: Date) {
    const endTime = new Date(appointmentTime);
    endTime.setHours(endTime.getHours() + 1);
    return endTime.toISOString();
  }
}


//
//https://oauth2.googleapis.com/token
