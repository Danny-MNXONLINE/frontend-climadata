import { Component } from '@angular/core';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ToggleButton } from '../../components/toggle-button/toggle-button';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';


@Component({
  selector: 'app-auth-header',
  imports: [MatFabButton, MatIcon, RouterOutlet, HttpClientModule, ToggleButton, MatMenuModule, MatButtonModule, MatDividerModule],
  templateUrl: './auth-header.html',
  styleUrl: './auth-header.scss'
})
export class AuthHeader {
  constructor(private http: HttpClient) { }
  userName: any = '';

  ngOnInit() {
    this.fetchUserName();
  }
  fetchUserName() {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.http.get<{ name: string }>('http://localhost:3000/users/currentuser', { headers })
      .subscribe({
        next: (res) => {
          console.log('User data fetched:', res);
          this.userName = res;
          console.log(this.userName.email)
        },
        error: (err) => {
          console.error('Error fetching user data:', err);
        }
      });
  }

  logout() {
    sessionStorage.removeItem('token');
    window.location.href = '/login';

    //destuir token desde el back y terminar sesion
  }
}
