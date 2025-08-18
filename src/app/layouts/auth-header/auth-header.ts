import { Component, Injectable } from '@angular/core';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToggleButton } from '../../components/toggle-button/toggle-button';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { Logout } from '../../services/logout/logout';

Injectable({ providedIn: 'root' })


@Component({
  selector: 'app-auth-header',
  imports: [MatFabButton, MatIcon, RouterOutlet, ToggleButton, MatMenuModule, MatButtonModule, MatDividerModule],
  templateUrl: './auth-header.html',
  styleUrl: './auth-header.scss'
})
export class AuthHeader {
  constructor(private http: HttpClient, private logoutService: Logout) { }
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
  logout(){
    return this.logoutService.logout()
  }
}
