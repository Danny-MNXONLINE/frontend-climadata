import { Component } from '@angular/core';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatLabel } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BackButton } from '../back-button/back-button';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-login',
  imports: [MatFabButton, MatIcon, MatInputModule, MatLabel, FormsModule, BackButton],
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient) { }

  login() {
    const credentials = {
      email: this.email,
      password: this.password
    };

    interface LoginResponse {
      access_token: string;
      [key: string]: any;
    }

    this.http.post<LoginResponse>('http://localhost:3000/auth/login', credentials)
      .subscribe({
        next: (res) => {
          console.log('Login exitoso:', res);
          //alert('Login exitoso');
          const token = res.access_token; 
          sessionStorage.setItem('token', token);
          window.location.href = '/dashboard';
        },
        error: (err) => {
          console.error('Login fallido:', err);
          
        }
      })
      console.log("peticion lanzada");
  }
}
