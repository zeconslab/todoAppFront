import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDto, RegisterDto } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private baseUrl = 'http://localhost:8080/api/auth';
  constructor(private http: HttpClient) {}

  login(login: LoginDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, login);
  }

  register(register: RegisterDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, register);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
