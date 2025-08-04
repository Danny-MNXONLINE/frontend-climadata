import { Component } from '@angular/core';
import { HomeContent } from '../home-content/home-content';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';



@Component({
  selector: 'app-dashboard',
  imports: [HomeContent, MatIcon, RouterLink, MatDividerModule],
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

}