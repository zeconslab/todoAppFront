import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RegisterDto } from '../../models/auth';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  isLoading: boolean = false;
  register: RegisterDto = {
    email: '',
    username: '',
    password: ''
  };

  constructor(private authService: Auth, private router: Router) {}

  onRegister() {
    if(this.register.email && this.register.username && this.register.password){
      this.isLoading = true;
      console.log(this.register);
      this.authService.register(this.register).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error en registro:', error);
        }
      });
    }
  }
}
