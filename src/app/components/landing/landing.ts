import { Component } from '@angular/core';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { HomeContent } from '../home-content/home-content';
import { ToggleButton } from '../toggle-button/toggle-button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';



@Component({
  selector: 'app-landing',
  imports: [MatFabButton, MatIcon, RouterLink, HomeContent, ToggleButton, MatMenuModule, MatDividerModule],
  templateUrl: './landing.html',
  styleUrl: './landing.scss'
})
export class Landing {

}
