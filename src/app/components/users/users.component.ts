import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../Services/user/users.service';
import { HttpClient } from '@angular/common/http';
import { Router } from 'express';





@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent  {
  isModalOpen = false;
  isUpdateModalOpen = false;
  password: string = '';
  confirmPassword: string = '';
  massage: boolean = false;
  // URL for API requests
  apiUrl = "http://localhost:4000/api/users";


  // List of users fetched from the backend
  userList: any[] = [];

  // Variable for the new user form
  newUser = {
    name: '',
    prefix: '',
    salary: '',
    email: '',
    password: '',
    confirmPassword: '',
    project: '',
    role: '',
    attachment: '',
    status: false,
    permissions: {
      task: false,
      project: false,
      users: false,
      calendars: false,
      roles: false,
    },
  };

  // Variable to store the ID of the user to be updated
  newuserId = {
    _id: '', // Will be set when editing a user
  };

  constructor(private http: HttpClient) {
    this.getUsers();
    this.getProject();
    this.getRoles();
  }

  // Method to open the modal for adding a new user
  openmodal() {
    this.isModalOpen = true;
  }

  // Method to close the modal for adding a new user
  closeModal() {
    this.isModalOpen = false;
  }

  // Fetch users from the backend
  getUsers() {
    this.http.get<any[]>(this.apiUrl).subscribe((data) => {
      // Mapping userList to add 'id' and filter permissions
      this.userList = data.map((user, index) => {
        const filteredPermissions = Object.entries(user.permissions)
          .filter(([key, value]) => value === true) // Keep only permissions with a true value
          .map(([key]) => key); // Get the keys (names of permissions)

        return {
          ...user,
          id: index + 1, // Add a sequential ID starting from 1
          filteredPermissions // Add filtered permissions to each user
        };
      });
    });
  }

  // Method to handle submitting the form for creating a new user
  onSubmit() {
    this.http.post(this.apiUrl, this.newUser).subscribe(
      (response) => {
        alert('User saved successfully');
        this.getUsers(); // Refresh the user list
        this.resetForm(); // Reset the form fields
        this.closeModal(); // Close the modal
      },
      (error) => {
        console.error('Error:', error);
        alert('Failed to save user');
      }
    );
  }

  // Reset the form fields
  resetForm() {
    this.newUser = {
      name: '',
      prefix: '',
      salary: '',
      email: '',
      password: '',
      confirmPassword: '',
      project: '',
      role: '',
      attachment: '',
      status: false,
      permissions: {
        task: false,
        project: false,
        users: false,
        calendars: false,
        roles: false,
      },
    };
  }

  // Method to close the update modal
  isUpdateModalClose() {
    this.isUpdateModalOpen = false;
  }

  // Method to open the update modal and populate the form with the selected user's data
  editRole(user: any) {
    this.newUser = { ...user }; // Copy the user data to newUser for editing
    this.newuserId._id = user._id; // Set the user ID for the update
    this.isUpdateModalOpen = true; // Open the modal
  }


  // Method to update a user in the backend
  updateUser() {
    // Ensure that the required fields are filled
    if (!this.newUser.name || !this.newUser.email || !this.newUser.password) {
      alert('Please fill out all required fields.');
      return;
    }

    // PUT request to update the user by ID
    if (this.newuserId._id) { // Ensure the _id exists before making the PUT request
      this.http.put(`${this.apiUrl}/${this.newuserId._id}`, this.newUser).subscribe(
        (response) => {
        
          this.getUsers(); // Refresh the user list
          this.resetForm(); // Reset the form fields
          this.massage=true;
          this.isUpdateModalOpen = false; // Close the modal
        },
        (error) => {
          console.error('Error updating user:', error);
          alert('Failed to update user.');
        }
      );
    } else {
      alert('Invalid user ID.');
    }
  }


  massageClose(){
    this.massage = false;
  }

  // Method to delete a user

  deleteUser(id: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      // Ensure the ID is valid before making the API call
      if (!id) {
        alert('Invalid ID');
        return;
      }

      this.http.delete(`${this.apiUrl}/users/${id}`).subscribe(
        response => {
          // Successful deletion
          alert('User deleted successfully');
          this.getUsers();  // Refresh the user list
        },
        error => {
          // Error handling
          console.error('Error deleting user:', error);
          alert('Error deleting user');
        }
      );
    }
  }




  projectUrl: string = 'http://localhost:4000/api/projects'; // Backend API URL
  projectList:  any[] = [];


  getProject() {
    this.http.get<any[]>(this.projectUrl).subscribe((data) => {
      // Mapping userList to add 'id' and filter permissions
      this.projectList = data;
    });
  }


  apiRoles = 'http://localhost:4000/api/roles';
  RolesList:  any[] = [];
  getRoles(){
    this.http.get<any[]>(this.apiRoles).subscribe((data) => {
      // Mapping userList to add 'id' and filter permissions
      this.RolesList = data;
    });
  }




}
