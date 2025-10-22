import { Injectable } from '@angular/core';
import { Auth } from './auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskInterface } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:8080/api/tasks';
  constructor(private http: HttpClient, private authService: Auth) {}
  
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getTasks(): Observable<TaskInterface[]> {
    return this.http.get<TaskInterface[]>(`${this.baseUrl}`, { headers: this.getHeaders()})
  }

  addTask(task: TaskInterface): Observable<TaskInterface> {
    return this.http.post<TaskInterface>(`${this.baseUrl}`, task, { headers: this.getHeaders()});
  }

  updateTask(task: TaskInterface): Observable<TaskInterface> {
    return this.http.put<TaskInterface>(`${this.baseUrl}/${task.id}`, task, { headers: this.getHeaders()});
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${taskId}`, { headers: this.getHeaders()});
  }
}
