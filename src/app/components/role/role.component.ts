import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoleService } from '../../Services/Roles/roles.service';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent {
  roles: any[] = [];
  newRole: any = { role: '', description: '' }; // Used for both adding and editing
  isEditMode: boolean = false; // Track if it's an edit or add operation
  isModalOpen: boolean = false;


  openModal(){
    this.isModalOpen = true;
  }

  closeModal(){
    this.isModalOpen = false;
  }

  constructor(private roleService: RoleService) {}

  ngOnInit(): void {
    this.fetchRoles();
  }

  // Fetch all roles
  fetchRoles() {
    this.roleService.getRoles().subscribe(
      (data: any[]) => {
        this.roles = data.map((role: any, index: number) => ({
          ...role,
          id: index + 1, // Add a sequential numeric ID starting from 1
        }));
      },
      (error) => {
        console.error('Error fetching roles:', error);
      }
    );
  }



  // Open modal with role data for editing
  editRole(role: any) {
    this.newRole = { ...role }; // Clone the selected role
    this.isModalOpen = true;
    this.isEditMode = true;

  }

  // Add or update role
  saveRole() {
    if (this.isEditMode) {
      // Update existing role
      this.roleService.updateRole(this.newRole._id, this.newRole).subscribe(
        () => {
          this.fetchRoles();
          this.resetForm();
          this.isModalOpen=false;
        },
        (error) => {
          console.error('Error updating role:', error);
        }
      );
    } else {
      // Add new role
      this.roleService.addRole(this.newRole).subscribe(
        () => {
          this.fetchRoles();
          this.resetForm();
          this.isModalOpen=false;
        },
        (error) => {
          console.error('Error adding role:', error);
        }
      );
    }
  }

  // Reset form and toggle mode
  resetForm() {
    this.newRole = { role: '', description: '' };
    this.isEditMode = false;
  }

  deleteRole(id: string) {
    this.roleService.deleteRole(id).subscribe(() => {
      this.fetchRoles();
    });
  }
}

