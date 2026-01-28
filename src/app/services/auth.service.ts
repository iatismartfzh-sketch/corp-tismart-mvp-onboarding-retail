import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = signal<boolean>(false);
  private currentUser = signal<any>(null);

  constructor(private router: Router) {}

  login(user: string, pass: string) {
    if (user === 'admin' && pass === 'retail2026') {
      this.isAuthenticated.set(true);
      this.currentUser.set({ role: 'RRHH', name: 'Administrador' });
      this.router.navigate(['/dashboard']);
      return true;
    }
    return false;
  }

  logout() {
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn() { return this.isAuthenticated(); }
}