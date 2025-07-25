import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ToggleButton } from './components/toggle-button/toggle-button';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToggleButton, HttpClientModule, FormsModule, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('climadata');

  theme: 'light' | 'dark' = localStorage.getItem('theme') as 'light' | 'dark' || 'light';

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.theme = savedTheme as 'light' | 'dark';
      document.body.classList.add(this.theme + '-theme');
    } else {
      document.body.classList.add('light-theme');
    }
  }

  toggleTheme(): void {
    const body = document.body;
    body.classList.toggle('light-theme');
    body.classList.toggle('dark-theme');
    this.theme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme);
  }
}
