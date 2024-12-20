import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { BookingsComponent } from "../bookings/bookings.component";
import { ShedulecaledarComponent } from "../shedulecaledar/shedulecaledar.component";

declare const gapi: any;
declare const google: any;

const CLIENT_ID =
  '266761407655-2ph6jvhfdm85hpgb9uejd5m2ku5o75l8.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBWPT3Z6aTk4MYY1rK0xlxlQ_GUufwPLj0';
const DISCOVERY_DOC =
  'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar';




@Component({
  selector: 'app-calender',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, ShedulecaledarComponent],
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.css'
})
export class CalenderComponent {

  currentDate: Date = new Date();
  currentMonth: number;
  currentYear: number;
  currentDay: number;
  prevMonthDays: number[] = [];
  currentMonthDays: number[] = [];
  nextMonthDays: number[] = [];
  selectedDay: number = this.currentDate.getDate();
  selectedDayEvents: any[] = [];
  eventDay: string = '';
  eventDate: string = '';
  newEventName: string = '';
  newEventTimeFrom: string = '';
  newEventTimeTo: string = '';
  newEventDescription: string = '';  // Declare this property
  showAddEvent: boolean = false;
  gotoMonthYear: string = '';

  constructor(private fb: FormBuilder) {
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
    this.currentDay = this.currentDate.getDate();
    this.updateCalendar();
  }

  // Update the calendar days
  updateCalendar() {
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    const lastDateOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);
    const lastDayOfPrevMonth = new Date(this.currentYear, this.currentMonth, 0);

    this.prevMonthDays = [];
    this.currentMonthDays = [];
    this.nextMonthDays = [];

    // Previous month's last days
    for (let i = lastDayOfPrevMonth.getDate() - firstDayOfMonth.getDay() + 1; i <= lastDayOfPrevMonth.getDate(); i++) {
      this.prevMonthDays.push(i);
    }

    // Current month's days
    for (let i = 1; i <= lastDateOfMonth.getDate(); i++) {
      this.currentMonthDays.push(i);
    }

    // Next month's first days
    for (let i = 1; i <= (7 - (this.prevMonthDays.length + this.currentMonthDays.length) % 7); i++) {
      this.nextMonthDays.push(i);
    }

    this.eventDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date(this.currentYear, this.currentMonth, this.selectedDay).getDay()];
    this.eventDate = `${this.selectedDay} ${this.getMonthName()} ${this.currentYear}`;
  }

  // Get Month Name
  getMonthName(): string {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[this.currentMonth];
  }

  // Handle previous month click
  prevMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.updateCalendar();
  }

  // Handle next month click
  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.updateCalendar();
  }

  // Select a day
  selectDay(day: number) {
    this.selectedDay = day;
    this.selectedDayEvents = []; // Reset events for selected day (you can fetch them from a service or API)
    this.updateCalendar();
  }

  // Go to specific month
  goToMonth() {
    const [month, year] = this.gotoMonthYear.split('/');
    if (month && year) {
      this.currentMonth = parseInt(month) - 1;
      this.currentYear = parseInt(year);
      this.updateCalendar();
    }
  }

  // Show today's date
  today() {
    this.currentDate = new Date();
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
    this.currentDay = this.currentDate.getDate();
    this.updateCalendar();
  }

  // Toggle add event form
  toggleAddEvent() {
    this.showAddEvent = !this.showAddEvent;
  }

  // Add new event
  addEvent() {
    const event = {
      summary: this.newEventName,
      location: '',
      description: this.newEventDescription,  // Now using the newEventDescription
      start: {
        dateTime: this.newEventTimeFrom,
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: this.newEventTimeTo,
        timeZone: 'America/Los_Angeles',
      },
    };

    // Add the new event to the selected day
    this.selectedDayEvents.push(event);
    console.log('Event added:', event);  // For debugging

    // After adding the event, reset the form and hide the add event form
    this.newEventName = '';
    this.newEventTimeFrom = '';
    this.newEventTimeTo = '';
    this.newEventDescription = '';  // Reset the description
    this.showAddEvent = false;  // Hide the form after event is added
  }















  appointmentForm!: FormGroup;
  events: any[] = []; // Array to hold fetched events
  tokenClient: any;
  gapiInited = false;
  gisInited = false;



  ngOnInit() {
    this.appointmentForm = this.fb.group({
      title: ['', Validators.required],
      appointmentTime: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required],
    });

    this.loadGoogleAPI();
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

  // OAuth2 callback
  tokenCallback(resp: any) {
    if (resp.error) {
      console.error('Error during authentication: ', resp);
      return;
    }
    this.scheduleGoogleEvent();
  }

  // Trigger OAuth2 flow
  createGoogleEvent(eventDetails: any) {
    if (gapi.client.getToken() === null) {
      this.tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      this.scheduleGoogleEvent();
    }
  }

  // Schedule an event on Google Calendar
  scheduleGoogleEvent() {
    const eventDetails = this.appointmentForm.value;
    const startTime = this.convertToIST(new Date(eventDetails.appointmentTime));
    const endTime = this.getEndTime(new Date(eventDetails.appointmentTime));

    const event = {
      summary: eventDetails.title,
      description: eventDetails.description,
      start: {
        dateTime: startTime,
        timeZone: 'Asia/Kolkata',
      },
      end: {
        dateTime: endTime,
        timeZone: 'Asia/Kolkata',
      },
      attendees: [{ email: eventDetails.email }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 10 },
        ],
      },
    };

    const request = gapi.client.calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });

    request.execute((event: any) => {
      if (event.htmlLink) {
        console.log('Event created: ' + event.htmlLink);
        window.open(event.htmlLink, '_blank');
        this.listEvents(); // Refresh events after creation
      } else {
        console.error('Error creating event: ', event);
      }
    });
  }

  // Fetch all events
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

  // Delete an event
  deleteEvent(eventId: string) {
    console.log('Deleting event with ID:', eventId);

    if (!eventId) {
      console.error('Invalid event ID.');
      return;
    }

    gapi.client.calendar.events
      .delete({
        calendarId: 'primary',
        eventId: eventId,
      })
      .then(() => {
        console.log('Event deleted successfully.');
        this.listEvents(); // Refresh events list
      })
      .catch((error: any) => {
        console.error('Error deleting event:', error.message, error.code);
      });
  }


  // Calculate end time (1 hour after start time)
  getEndTime(appointmentTime: Date) {
    const endTime = new Date(appointmentTime);
    endTime.setHours(endTime.getHours() + 1);
    return this.convertToIST(endTime);
  }

  // Convert to IST
  convertToIST(date: Date) {
    const indiaOffset = 5.5 * 60;
    const dateInIST = new Date(date.getTime() + indiaOffset * 60000);
    return dateInIST.toISOString();
  }

  // Submit form to schedule a meeting
  scheduleMeeting() {
    const eventDetails = {
      title: this.appointmentForm.value.title,
      startTime: this.appointmentForm.value.appointmentTime,
      endTime: this.getEndTime(new Date(this.appointmentForm.value.appointmentTime)),
      email: this.appointmentForm.value.email,
      description: this.appointmentForm.value.description,
    };
    this.createGoogleEvent(eventDetails);
  }








}
