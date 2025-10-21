import { Injectable } from '@angular/core';
import { Auth } from './auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tasks } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class Task {
  private baseUrl = 'http://localhost:8080/api/tasks';
  constructor(private http: HttpClient, private authService: Auth) {}
  
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getTasks(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(`${this.baseUrl}`, { headers: this.getHeaders()})
  }

  addTask(task: Tasks): Observable<Tasks> {
    return this.http.post<Tasks>(`${this.baseUrl}`, task, { headers: this.getHeaders()});
  }

  updateTask(task: Tasks): Observable<Tasks> {
    return this.http.put<Tasks>(`${this.baseUrl}/${task.id}`, task, { headers: this.getHeaders()});
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${taskId}`, { headers: this.getHeaders()});
  }
}
