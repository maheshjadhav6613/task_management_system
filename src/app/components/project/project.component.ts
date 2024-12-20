import { Component } from '@angular/core';
import { ProjectServicesService } from '../../Services/ProjectServies/project-services.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [FormsModule, CommonModule, JsonPipe],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  projects: any[] = []; // List of projects
  newProject: any = {}; // Model for adding/editing projects
  isModalOpen: boolean = false; // Modal visibility
  iChangeButton: boolean = true; // Determines if it's an Add or Edit operation
  apiUrl: string = 'http://localhost:4000/api/projects'; // Backend API URL

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getProjects();
    this.getProjects();
  }




  // Fetch all projects
  getProjects() {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        this.projects = data.map((project: any, index: number) => ({
          ...project,
          id: index + 1, // Add a sequential numeric ID starting from 1
        }));
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  // Open modal (Add or Edit)
  openModal(isAdd: boolean = true) {
    this.isModalOpen = true;
    this.iChangeButton = isAdd;
    if (isAdd) {
      this.newProject = {}; // Clear form for new project
    }
  }

  // Close modal
  closeModal() {
    this.isModalOpen = false;
  }

  // Add a new project
  saveProject() {
    this.http.post(this.apiUrl, this.newProject).subscribe(
      (response) => {
        this.getProjects(); // Refresh the project list
        this.closeModal(); // Close the modal
      },
      (error) => {
        console.error('Error adding project:', error);
      }
    );
  }

  // Edit an existing project
  editProject(project: any) {
    this.newProject = { ...project }; // Populate form with project data
    this.openModal(false);
  }

  // Update the project
  updateProject() {
    this.http.put(`${this.apiUrl}/${this.newProject._id}`, this.newProject).subscribe(
      (response) => {
        this.getProjects(); // Refresh the project list
        this.closeModal(); // Close the modal
      },
      (error) => {
        console.error('Error updating project:', error);
      }
    );
  }

  // Delete a project
  deleteProject(id: string) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe(
        (response) => {
          this.getProjects(); // Refresh the project list
        },
        (error) => {
          console.error('Error deleting project:', error);
        }
      );
    }
  }
}




