import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BackButton } from '../back-button/back-button';

@Injectable({ providedIn: 'root' })

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    BackButton
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  constructor(private http: HttpClient) { }
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  confirmPassword = '';

  register() {
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const user = {
      email: this.email,
      password: this.password
    };

    console.log('Registrando usuario:', user);
    this.http.post('http://localhost:3000/auth/register', user)
      .subscribe({
        next: (res) => {
          console.log('Registro exitoso:', res);
          window.location.href = '/dashboard'; // Redirigir al dashboard
        },
        error: (err) => {
          console.error('Error al registrar:', err);
          alert('Error al registrar. Inténtalo de nuevo.');
        }
      });
  }
}
