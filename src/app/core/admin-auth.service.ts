import { effect, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AdminAuthService {
  private readonly _isAuthenticated = signal<boolean>(this.readInitialValue());

  public readonly isAuthenticated = this._isAuthenticated.asReadonly();

  constructor() {
    effect(() => {
      if (this._isAuthenticated()) {
        localStorage.setItem('admin.session', '1');
      } else {
        localStorage.removeItem('admin.session');
      }
    });
  }

  public login(_email: string, _password: string): void {
    this._isAuthenticated.set(true);
  }

  public logout(): void {
    this._isAuthenticated.set(false);
  }

  private readInitialValue(): boolean {
    return localStorage.getItem('admin.session') === '1';
  }
}
