import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:4000/api/statuses';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  constructor(private http: HttpClient) {}

  // Get all statuses
  getStatuses(): Observable<any> {
    return this.http.get(API_URL);
  }

  // Create a new status
  createStatus(data: any): Observable<any> {
    return this.http.post(API_URL, data);
  }

  // Update an existing status
  updateStatus(id: string, status: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/${id}`, status);  // Fixed the endpoint
  }

  // Delete a status
  deleteStatus(id: string): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }
}
