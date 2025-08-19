import { Component } from '@angular/core';
import { ThemeService } from '../../services/toggleTheme/toggle-theme';
import { MatIcon } from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-toggle-button',
  imports: [MatIcon, MatSlideToggleModule],
  templateUrl: './toggle-button.html',
  styleUrl: './toggle-button.scss'
})
export class ToggleButton {

  constructor(private themeService: ThemeService) { }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  isDark(): boolean {
    return this.themeService.isDarkTheme();
  }
}

