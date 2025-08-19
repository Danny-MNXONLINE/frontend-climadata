import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkTheme: boolean;

  constructor() {
    // Leer preferencia del localStorage y aplicarla
    const storedTheme = localStorage.getItem('dark');
    this.darkTheme = storedTheme === 'true';

    this.applyTheme();
  }

  isDarkTheme(): boolean {
    return this.darkTheme;
  }

  toggleTheme(): void {
    this.darkTheme = !this.darkTheme;
    localStorage.setItem('dark', this.darkTheme.toString());
    this.applyTheme();
  }

  private applyTheme(): void {
    const body = document.body;

    if (this.darkTheme) {
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
    } else {
      body.classList.add('light-theme');
      body.classList.remove('dark-theme');
    }
  }
}
