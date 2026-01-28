// src/app/pages/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed inset-0 flex items-center justify-center bg-slate-100 px-4">
      <div class="w-full max-w-md">
        <div class="bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div class="bg-slate-900 p-8 text-center">
            <h1 class="text-2xl font-bold text-white tracking-tight">Onboarding Retail IA</h1>
            <p class="text-slate-400 mt-2 text-sm uppercase tracking-widest">Gestión de Ingresos Digitales</p>
          </div>
          
          <form class="p-8 space-y-6" (ngSubmit)="handleLogin()">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
                <input [(ngModel)]="username" name="username" type="text" required 
                  class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" 
                  placeholder="admin">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                <input [(ngModel)]="password" name="password" type="password" required 
                  class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" 
                  placeholder="••••••••">
              </div>
            </div>

            <div *ngIf="error" class="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center border border-red-100">
              Credenciales inválidas para el sistema.
            </div>

            <button type="submit" 
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg shadow-blue-200 transition-all active:scale-[0.98]">
              Ingresar al Sistema
            </button>
          </form>
          
          <div class="p-4 bg-gray-50 text-center border-t border-gray-100">
            <span class="text-xs text-gray-400">Retailer Peruano S.A. - © 2026</span>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  error = false;

  constructor(private authService: AuthService) {}

  handleLogin() {
    this.error = !this.authService.login(this.username, this.password);
  }
}