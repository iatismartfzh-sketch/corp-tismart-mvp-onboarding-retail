import { Component } from "@angular/core";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-floating-chat',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button (click)="toggleChat()" 
            class="fixed bottom-8 right-8 w-16 h-16 bg-indigo-600 rounded-full shadow-2xl shadow-indigo-500/50 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all z-50 group">
      <div class="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
      <svg *ngIf="!isOpen" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
      <svg *ngIf="isOpen" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l18 18" />
      </svg>
    </button>

    <div *ngIf="isOpen" 
         class="fixed bottom-28 right-8 w-96 h-[500px] bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom-10 fade-in duration-300">
      
      <div class="bg-slate-900 p-6 text-white">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h4 class="font-black text-sm tracking-tight">RETAIL IA BOT</h4>
            <div class="flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
              <span class="text-[10px] font-bold text-slate-400 uppercase">En mantenimiento</span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-6 bg-slate-50">
        <div class="relative">
            <div class="absolute inset-0 bg-amber-500 rounded-full blur-2xl opacity-10 animate-pulse"></div>
            <span class="text-6xl relative">🚧</span>
        </div>
        
        <div class="space-y-2">
          <h5 class="text-slate-800 font-black text-lg">Módulo en Calibración</h5>
          <p class="text-slate-500 text-sm leading-relaxed px-4">
            Estamos integrando las nuevas neuronas de aprendizaje para el catálogo 2026. Este bot estará disponible pronto.
          </p>
        </div>

        <div class="w-full px-8">
            <div class="flex justify-between text-[10px] font-black text-slate-400 mb-1 uppercase tracking-widest">
                <span>Entrenamiento</span>
                <span>85%</span>
            </div>
            <div class="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div class="h-full bg-amber-500 w-[85%] rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
            </div>
        </div>
      </div>

      <div class="p-4 bg-white border-t border-slate-100 flex items-center gap-2 opacity-50 grayscale cursor-not-allowed">
        <div class="flex-1 bg-slate-100 h-10 rounded-full px-4 flex items-center">
            <span class="text-xs text-slate-400 font-medium">Chat deshabilitado temporalmente...</span>
        </div>
        <div class="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
        </div>
      </div>
    </div>
  `
})
export class FloatingChatComponent {
  isOpen = false;

  toggleChat() {
    this.isOpen = !this.isOpen;
  }
}