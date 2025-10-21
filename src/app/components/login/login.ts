import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { LoginDto } from '../../models/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  auth: LoginDto = {
    email: '',
    password: ''
  };
  isLoading: boolean = false;

  constructor(private authService: Auth, private router: Router) {}

  onLogin() {
    if (this.auth.email && this.auth.password) {
      this.isLoading = true;
      this.authService.login(this.auth)
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            this.authService.saveToken(response.token);
            this.router.navigate(['/tasks']);
          },
          error: (error) => {
            this.isLoading = false;
            console.error('Error en login:', error);
          }
        });
    }
  }
}
