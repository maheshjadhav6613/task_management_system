// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class TaskService {
//   private apiUrl = 'http://localhost:4000/api/tasks'; // Your API endpoint

//   constructor(private http: HttpClient) {}

//   createTask(taskData: FormData): Observable<any> {
//     return this.http.post(this.apiUrl, taskData);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskServices {
  private apiUrl = 'http://localhost:4000/api/tasks';

  constructor(private http: HttpClient) {}

  createTask(taskData: any): Observable<any> {
    return this.http.post(this.apiUrl, taskData);
  }
}
