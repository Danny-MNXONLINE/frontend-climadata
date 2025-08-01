import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { HomeContent } from '../home-content/home-content';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  imports: [HttpClientModule, HomeContent, MatIcon, RouterLink],
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

}