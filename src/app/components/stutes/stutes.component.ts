import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { StatusService } from '../../Services/status/status.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-stutes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stutes.component.html',
  styleUrl: './stutes.component.css'
})
export class StutesComponent {
  isStatusAdd:boolean = false;
  statusList: any[] = []; // List of statuses
  newStatus: any = {}; // Model for adding/editing statuses
  isModalOpen: boolean = false; // Modal visibility
  iChangeButton: boolean = true; // Determines if it's an Add or Edit operation
  apiUrl: string = 'http://localhost:4000/api/status'; // Backend API URL

  constructor(private http: HttpClient) {}


  ngOnInit(): void {
    this.getStatuses();

  }

  // Fetch all statuses
  getStatuses() {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        this.statusList = data.map((status, index) => ({
          ...status,
          id: index + 1 // Assign a sequential numeric ID starting from 1
        }));
      },
      (error) => {
        console.error('Error fetching statuses:', error);
      }
    );
  }


  // Open modal (Add or Edit)
  openModal(isAdd: boolean = true) {
    this.isModalOpen = true;
    this.iChangeButton = isAdd;
    if (isAdd) {
      this.newStatus = {}; // Clear form for new status
    }
  }

  // Close modal
  closeModal() {
    this.isModalOpen = false;
  }

  // Add a new status
  saveStatus() {
    this.http.post(this.apiUrl, this.newStatus).subscribe(
      (response) => {
        this.getStatuses(); // Refresh the status list
        this.closeModal();
        this.isStatusAdd = true;
         // Close the modal
      },
      (error) => {
        console.error('Error adding status:', error);
      }
    );
  }

  // Edit an existing status
  editStatus(status: any) {
    this.newStatus = { ...status }; // Populate form with status data
    this.openModal(false);
  }

  // Update the status
  updateStatus() {
    this.http.put(`${this.apiUrl}/${this.newStatus._id}`, this.newStatus).subscribe(
      (response) => {
        this.getStatuses();
        this.closeModal();
        // Close the modal
      },
      (error) => {
        console.error('Error updating status:', error);
      }
    );
  }

  // Delete a status
  deleteStatus(id: string) {
    if (confirm('Are you sure you want to delete this status?')) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe(
        (response) => {
          this.getStatuses(); // Refresh the status list
        },
        (error) => {
          console.error('Error deleting status:', error);
        }
      );
    }
  }
}
