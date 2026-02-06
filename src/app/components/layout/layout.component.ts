import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FloatingChatComponent } from '../../shared/FloatingChatComponent';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, FloatingChatComponent],
  template: `
    <div class="flex h-screen bg-[#f8fafc] font-sans text-slate-900 overflow-hidden">
      
      <aside class="w-72 bg-[#1e293b] text-white flex flex-col shadow-2xl z-20">
        <div class="p-8 mb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <span class="text-white font-black text-xl">R</span>
            </div>
            <h2 class="text-xl font-black tracking-tighter text-white">RETAIL <span class="text-indigo-400">IA</span></h2>
          </div>
        </div>

        <nav class="flex-1 px-4 space-y-2">
          <a routerLink="/dashboard" 
             routerLinkActive="bg-indigo-600 shadow-lg shadow-indigo-900/50 text-white" 
             class="flex items-center gap-4 p-4 rounded-2xl font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-all group">
            <span class="text-xl">📊</span> Dashboard
          </a>
          
          <a routerLink="/knowledge" 
            routerLinkActive="bg-indigo-600 shadow-lg shadow-indigo-900/50 text-white" 
            class="flex items-center gap-4 p-4 rounded-2xl font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-all group">
            
            <span class="text-xl group-hover:scale-110 transition-transform">📖</span> 
            
            <span>Cursos</span>
          </a>

          <a routerLink="/simulator" 
             routerLinkActive="bg-indigo-600 shadow-lg shadow-indigo-900/50 text-white" 
             class="flex items-center gap-4 p-4 rounded-2xl font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-all group">
            <span class="text-xl">📱</span> Simulador WA
          </a>
        </nav>

        <div class="p-6 border-t border-slate-800">
          <div class="bg-slate-800/50 p-4 rounded-2xl mb-4">
            <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Usuario Activo</p>
            <p class="text-xs font-bold text-indigo-300">RRHH Admin</p>
          </div>
          <button (click)="logout()" class="flex items-center gap-3 w-full p-3 text-xs font-black text-red-400 uppercase tracking-widest hover:bg-red-500/10 rounded-xl transition-all">
            <span>🚪</span> Cerrar Sesión
          </button>
        </div>
      </aside>

      <main class="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header class="h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-10 z-10">
          <span class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Onboarding Digital 2026</span>
          <div class="flex items-center gap-4">
            <div class="text-right">
              <p class="text-[10px] font-black text-slate-800 leading-none">Admin Retail</p>
              <p class="text-[9px] font-bold text-emerald-500">En línea</p>
            </div>
            <div class="w-8 h-8 bg-slate-100 rounded-full border border-slate-200"></div>
          </div>
        </header>

        <div class="flex-1 overflow-y-auto">
          <router-outlet></router-outlet>
          
        </div>
      </main>

      <app-floating-chat></app-floating-chat>

    </div>
  `
})
export class LayoutComponent {
  private authService = inject(AuthService);
  logout() { this.authService.logout(); }
}