import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { IUser } from '../models/user.interface';

const ADMIN_EMAIL = 'madie.snapfood@gmail.com';
const ADMIN_PASSWORD = 'snapfood123';
const TOKEN_KEY = 'snapfood_token_v1';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser: IUser | null = null;

  constructor() {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      // Simulate user info in token (for this simple demo)
      this.currentUser = { email: ADMIN_EMAIL } as IUser;
    }
  }

  login(email: string, password: string): Observable<boolean> {
    // Simulate server latency
    return of({ email, password }).pipe(
      delay(400),
      map((creds) => {
        if (creds.email === ADMIN_EMAIL && creds.password === ADMIN_PASSWORD) {
          const token = btoa(`${creds.email}:${Date.now()}`);
          localStorage.setItem(TOKEN_KEY, token);
          this.currentUser = { email: ADMIN_EMAIL } as IUser;
          return true;
        }
        return false;
      })
    );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.currentUser = null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  getUser(): IUser | null {
    return this.currentUser;
  }
}
