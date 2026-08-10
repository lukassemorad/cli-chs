import { effect, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _isDark = signal(this.readInitialValue());

  public readonly isDark = this._isDark.asReadonly();

  constructor() {
    effect(() => {
      const dark = this._isDark();
      document.documentElement.classList.toggle('dark', dark);
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    });
  }

  public toggle(): void {
    this._isDark.update((dark) => !dark);
  }

  private readInitialValue(): boolean {
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? false;
  }
}
