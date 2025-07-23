import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-back-button',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './back-button.html',
  styleUrl: './back-button.scss'
})
export class BackButton {
  @Input() route: string = '/';

  constructor(private router: Router) { }

  goBack() {
    this.router.navigate([this.route]);
  }
}
