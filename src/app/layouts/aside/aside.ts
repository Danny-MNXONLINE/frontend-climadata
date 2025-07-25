import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-aside',
  imports: [RouterOutlet, CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './aside.html',
  styleUrl: './aside.scss'
})
export class Aside {
  showAside = true;

  toggleAside() {
    this.showAside = !this.showAside;
  }
}
