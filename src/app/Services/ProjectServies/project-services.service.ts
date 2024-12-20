import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectServicesService {

  private baseUrl = 'http://localhost:4000/projects';
  constructor(private http:HttpClient) { }

  getProjects(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // Add a new project (POST)
  addProject(project: any): Observable<any> {
    return this.http.post(this.baseUrl, project);
  }

  // Update an existing project (PUT)
  updateProject( project: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${project.id}`, project);
  }

  // Delete a project (DELETE)
  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }



}
