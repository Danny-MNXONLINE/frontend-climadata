import { Component } from '@angular/core';
import { ThemeService } from '../../services/toggle-theme';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-toggle-button',
  imports: [MatIcon],
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

