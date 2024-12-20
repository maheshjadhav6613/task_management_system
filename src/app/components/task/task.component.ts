import { Component, OnInit } from '@angular/core';
import {  TaskServices } from '../../Services/Tasks/task.service';

import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { KanbanComponent } from "./kanban/kanban.component";


interface Project {
  _id: string;
  name: string;
}




@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, KanbanComponent],
  styleUrls: ['./task.component.css'],
})


export class TaskComponent{
  isTaskAdd:boolean = false;
  isModalOpen: boolean = false; // Controls modal visibility
  projects: any[] = []; // List of projects
  statuses: any[] = []; // List of statuses
  users: any[] = []; // List of users
  apiUrl = 'http://localhost:4000/api/tasks'; // Backend API URL for tasks
  projectApiUrl = 'http://localhost:4000/api/projects'; // Backend API for projects
  statusApiUrl = 'http://localhost:4000/api/statuses'; // Backend API for statuses
  apiUser = 'http://localhost:4000/api/users'; // Backend API for users
  selectedFile: File | null = null; // Selected file
  newTask: any = {}; // Model for the new task

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch necessary data on initialization
    this.getUsers();
    this.getProjects();
    this.getStatuses();
  }

  // Open the modal
  openModal(): void {
    this.isModalOpen = true;
  }

  // Close the modal and reset the form
  closeModal(): void {
    this.isModalOpen = false;
    this.resetForm();
  }

  // Fetch all users
  getUsers(): void {
    this.http.get<any[]>(this.apiUser).subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  // Fetch all projects
  getProjects(): void {
    this.http.get<any[]>(this.projectApiUrl).subscribe(
      (data) => {
        this.projects = data;
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  // Fetch all statuses
  getStatuses(): void {
    this.http.get<any[]>(this.statusApiUrl).subscribe(
      (data) => {
        this.statuses = data;
      },
      (error) => {
        console.error('Error fetching statuses:', error);
      }
    );
  }

  // Handle file selection with validation
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validate file size and type
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size exceeds the 5MB limit.');
        return;
      }
      if (!['application/pdf', 'image/png', 'image/jpeg'].includes(file.type)) {
        alert('Only PDF, PNG, and JPEG files are allowed.');
        return;
      }
      this.selectedFile = file;
      console.log('File selected:', file);
    }
  }

  // Submit the form
  onSubmit(formValue: any): void {
    const formData = new FormData();

    // Append form fields to FormData
    Object.keys(formValue).forEach((key) => {
      formData.append(key, formValue[key]);
    });

    // Append file if available
    if (this.selectedFile) {
      formData.append('attachments', this.selectedFile, this.selectedFile.name);
    }

    // Send task data to backend
    this.http.post(this.apiUrl, formData).subscribe(
      (response) => {
        console.log('Task added successfully:', response);
        alert('Task added successfully!');
        this.closeModal(); // Close modal on success
      },
      (error) => {
        console.error('Error adding task:', error);
        alert('An error occurred while adding the task. Please try again.');
      }
    );
  }

  // Reset form fields and file selection
  resetForm(): void {
    this.newTask = {};
    this.selectedFile = null;
  }
}
