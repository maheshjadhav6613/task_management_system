import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookingsComponent } from "./components/bookings/bookings.component";
import { ShedulecaledarComponent } from "./components/shedulecaledar/shedulecaledar.component";
import { KanbanComponent } from "./components/task/kanban/kanban.component";
import { LoginSignupComponent } from "./components/login-signup/login-signup.component";
import { NavbarComponent } from "./components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BookingsComponent, ShedulecaledarComponent, LoginSignupComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dashboard';
}
