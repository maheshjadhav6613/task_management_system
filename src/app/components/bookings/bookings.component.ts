import { Component } from '@angular/core';
import { KanbanService } from '../../Services/taskskanabn/kanan.service';
import { AuthService } from '../../Services/auth/auth.service.ts.service';
import { Router } from 'express';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

declare const gapi: any;

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export class BookingsComponent {
 
}
