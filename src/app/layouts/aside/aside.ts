import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import { ToggleButton } from '../../components/toggle-button/toggle-button';
import { Logout } from '../../services/logout/logout';




@Component({
  selector: 'app-aside',
  imports: [RouterOutlet, CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, RouterLink, MatDividerModule, MatMenuModule, ToggleButton],
  templateUrl: './aside.html',
  styleUrl: './aside.scss'
})
export class Aside {
  constructor(private logoutService: Logout){}
  showAside = false;

  toggleAside() {
    this.showAside = !this.showAside;
  }

  logout (){
    return this.logoutService.logout()
  }
}
