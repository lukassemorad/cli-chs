import { effect, Injectable, signal } from '@angular/core';

export interface AuthUser {
  name: string;
  email: string;
  isMember: boolean;
  isAdult: boolean;
  hasQualification: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _user = signal<AuthUser | null>(this.readInitialValue());

  public readonly user = this._user.asReadonly();

  constructor() {
    effect(() => {
      const user = this._user();
      if (user) {
        localStorage.setItem('auth.user', JSON.stringify(user));
      } else {
        localStorage.removeItem('auth.user');
      }
    });
  }

  public login(email: string, _password: string): void {
    const namePart = email.split('@')[0] ?? email;
    const name = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    this._user.set({ name, email, isMember: true, isAdult: true, hasQualification: false });
  }

  public logout(): void {
    this._user.set(null);
  }

  private readInitialValue(): AuthUser | null {
    const stored = localStorage.getItem('auth.user');
    if (!stored) return null;
    try {
      return JSON.parse(stored) as AuthUser;
    } catch {
      return null;
    }
  }
}
