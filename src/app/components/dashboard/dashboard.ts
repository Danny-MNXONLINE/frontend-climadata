import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { HomeContent } from '../home-content/home-content';



@Component({
  selector: 'app-dashboard',
  imports: [HttpClientModule, HomeContent],
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
}
