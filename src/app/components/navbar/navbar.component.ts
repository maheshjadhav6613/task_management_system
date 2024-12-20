import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MainBodyComponent } from '../main-body/main-body.component';
import { AuthService } from '../../Services/Autho/auth-service.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet,RouterLink,CommonModule,FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isClick: boolean = false;
  show(){
    this.isClick = true;
  }
  hide(){
    this.isClick = false;
}
userPermissions: any = {};  // Store user's permissions
isDataVisible = false;
isProject = false;
isUser = false;
isCalender = false;
isRole = false;

constructor(private authService: AuthService) {}

ngOnInit(): void {
  const user = this.authService.getCurrentUser(); // Get logged-in user details
  if (user) {
    this.userPermissions = user.permissions;
  }
}

toggleData() {
  this.isDataVisible = !this.isDataVisible;
}

clickProject() {
  this.isProject = !this.isProject;
}

clickUser() {
  this.isUser = !this.isUser;
}

clickCalender() {
  this.isCalender = !this.isCalender;
}

clickRole() {
  this.isRole = !this.isRole;
}
}
