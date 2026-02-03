import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = signal<boolean>(false);
  private currentUser = signal<any>(null);
  private readonly STORAGE_KEY = 'auth_session_v1';
  private platformId = inject(PLATFORM_ID);

  constructor(private router: Router) {
    this.restoreSession();
  }

  private restoreSession() {
    if (!isPlatformBrowser(this.platformId)) return;
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) return;
    try {
      const data = JSON.parse(raw);
      if (data?.isAuthenticated) {
        this.isAuthenticated.set(true);
        this.currentUser.set(data.user ?? null);
      }
    } catch {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }

  private persistSession() {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify({
      isAuthenticated: this.isAuthenticated(),
      user: this.currentUser()
    }));
  }

  login(user: string, pass: string) {
    if (user === 'admin' && pass === 'retail2026') {
      this.isAuthenticated.set(true);
      this.currentUser.set({ role: 'RRHH', name: 'Administrador' });
      this.persistSession();
      this.router.navigate(['/dashboard']);
      return true;
    }
    return false;
  }

  logout() {
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.STORAGE_KEY);
    }
    this.router.navigate(['/login']);
  }

  isLoggedIn() { return this.isAuthenticated(); }
}
