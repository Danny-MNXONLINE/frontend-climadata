import { Component } from '@angular/core';
import { MatButton, MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatLabel } from '@angular/material/input';

@Component({
  selector: 'app-login',
  imports: [MatFabButton, MatIcon, MatInputModule, MatLabel, MatButton],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  login() {
    const email = (document.querySelector('input[name="email"]') as HTMLInputElement).value;
    const password = (document.querySelector('input[name="password"]') as HTMLInputElement).value;
    console.log(`Email: ${email}, Password: ${password}`);
  }
}
