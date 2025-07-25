import { Component } from '@angular/core';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { HomeContent } from '../home-content/home-content';


@Component({
  selector: 'app-landing',
  imports: [MatFabButton, MatIcon, RouterLink, HomeContent],
  templateUrl: './landing.html',
  styleUrl: './landing.scss'
})
export class Landing {

}
