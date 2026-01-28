import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="flex h-screen bg-gray-100">
      <aside class="w-64 bg-slate-900 text-white flex flex-col">
        <div class="p-6 text-xl font-bold border-b border-slate-800">
          Retail IA
        </div>
        <nav class="flex-1 p-4 space-y-2">
          <a routerLink="/dashboard" routerLinkActive="bg-slate-800" class="block p-3 rounded-lg hover:bg-slate-800 transition">
            📊 Dashboard RR.HH.
          </a>
          <a routerLink="/simulator" routerLinkActive="bg-slate-800" class="block p-3 rounded-lg hover:bg-slate-800 transition">
            📱 Simulador WhatsApp
          </a>
        </nav>
        <div class="p-4 border-t border-slate-800">
          <button (click)="logout()" class="w-full text-left p-3 text-red-400 hover:bg-slate-800 rounded-lg">
            Cerrar Sesión
          </button>
        </div>
      </aside>

      <main class="flex-1 overflow-y-auto">
        <header class="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 class="text-lg font-semibold text-gray-700">Onboarding Digital 2026</h1>
          <div class="text-sm text-gray-500">Perfil: RRHH Admin</div>
        </header>
        <div class="p-6">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `
})
export class LayoutComponent {
  constructor(private authService: AuthService) {}
  logout() { this.authService.logout(); }
}