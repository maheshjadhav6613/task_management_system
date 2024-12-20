import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, switchMap, tap } from 'rxjs';

interface Task {
  _id: string;
  title: string;
  statusId: string;
  priority: string;
  assignedTo: string[];
  dueDate: Date; // Ensure this is handled correctly
  estimateTime: string;
  description: string;
  projectId: string; // Add projectId to the Task interface
}

interface Status {
  _id: string;
  name: string;
  order: number;
}




@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css'] // Corrected to styleUrls
})
export class KanbanComponent implements OnInit {
  isModalOpen=false;
  tasksList: Task[] = [];
  statusList: Status[] = [];
  draggedTask: Task | null = null;
  private apiUrl = 'http://localhost:4000/api/tasks'; // Your API URL
  private apiUrlStatus = 'http://localhost:4000/api/status'; // Backend API URL for statuses

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchTasks().subscribe();
    this.getStatuses(); // Fetch statuses on initialization
  }


  getStatuses() {
    this.http.get<Status[]>(this.apiUrlStatus).subscribe(
      (data) => {
        this.statusList = data; // Assuming the API returns the correct status objects
        console.log('Fetched statuses:', this.statusList);
      },
      (error) => {
        console.error('Error fetching statuses:', error);
      }
    );
  }

  fetchTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      tap(data => {
        this.tasksList = data.map(task => ({
          ...task,
          dueDate: new Date(task.dueDate) // Convert dueDate to Date object
        }));
        console.log('Fetched tasks:', this.tasksList);
      })
    );
  }

  onDragStart(event: DragEvent, task: Task): void {
    this.draggedTask = task;
    event.dataTransfer?.setData('text/plain', task._id);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault(); // Prevent default to allow drop
  }




  onDrop(event: DragEvent, statusId: string): void {
    event.preventDefault(); // Prevent default behavior
    if (this.draggedTask) {
      // Update the statusId of the dragged task locally
      this.draggedTask.statusId = statusId;

      // Log the change for debugging purposes
      console.log(`Task ${this.draggedTask.title} status updated to ${statusId}`);

      // Optionally, you can refresh the task list from the server if needed
      // this.fetchTasks().subscribe(); // Uncomment if you want to refresh the task list
    }

    if (!this.draggedTask) {
      return; // Handle potential undefined draggedTask scenario
    }

    console.log('Saving task status:', this.draggedTask);
    this.isLoading = true; // Set loading state to true

    this.http.post(`${this.apiUrl}/update-status/${this.draggedTask._id}`, { statusId: this.draggedTask.statusId })
      .subscribe({
        next: (response) => {
          console.log('Task status updated successfully', response);
          this.fetchTasks().subscribe(); // Refresh the task list
          this.draggedTask = null; // Clear draggedTask after successful update
          this.isLoading = false; // Reset loading state
        },
        error: (error) => {
          console.error('Error updating task status:', error);
          this.isLoading = false; // Reset loading state in case of error
          // Optionally, show an error message to the user
        }
      });


  }

  isLoading = false;

  saveTaskStatus(): void {
    if (!this.draggedTask) {
      return; // Handle potential undefined draggedTask scenario
    }

    console.log('Saving task status:', this.draggedTask);
    this.isLoading = true; // Set loading state to true

    this.http.post(`${this.apiUrl}/update-status/${this.draggedTask._id}`, { statusId: this.draggedTask.statusId })
      .subscribe({
        next: (response) => {
          console.log('Task status updated successfully', response);
          this.fetchTasks().subscribe(); // Refresh the task list
          this.draggedTask = null; // Clear draggedTask after successful update
          this.isLoading = false; // Reset loading state
        },
        error: (error) => {
          console.error('Error updating task status:', error);
          this.isLoading = false; // Reset loading state in case of error
          // Optionally, show an error message to the user
        }
      });
  }


newTasks ={
  title: '',
  description:'',
}


closeModal(){
  this.isModalOpen =false;
}

editTask(task:any){
  this.newTasks = {...task};
  this.isModalOpen = true;
}


updateTask(){

}

  // In your kanban.component.ts
hasTasksForStatus(statusId: string): boolean {
  return this.tasksList.some(task => task.statusId === statusId);
}

deleteTask(_id: string): void { // Use the parameter _id
    this.http.delete(`${this.apiUrl}/${_id}`).subscribe(
      () => {
        console.log('Task deleted successfully');
        this.fetchTasks().subscribe(); // Refresh the task list after deletion
      },
      error => console.error('Error deleting task:', error)
    );
  }


  formatEstimateTime(estimateTime: string | number): string {
    // Convert to number if it's a string
    const timeInHours = typeof estimateTime === 'string' ? parseFloat(estimateTime) : estimateTime;

    const hours = Math.floor(timeInHours);
    const minutes = Math.round((timeInHours - hours) * 60);
    return `${hours}h ${minutes}m`;
  }




}

