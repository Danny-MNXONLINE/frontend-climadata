import { Component } from '@angular/core';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-landing',
  imports: [MatFabButton, MatIcon, RouterLink],
  templateUrl: './landing.html',
  styleUrl: './landing.scss'
})
export class Landing {

}
