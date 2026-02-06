// src/app/pages/knowledge-catalog/knowledge-catalog.component.ts

import { Component, inject } from "@angular/core";
import { EXAMENES_DUMMY } from "../../data/mock-exam";
import { TrainingService } from "../../services/training.service";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-knowledge-catalog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="p-8 bg-slate-50 min-h-screen">
      <header class="mb-10 flex justify-between items-end">
        <div>
          <h2 class="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
            <span class="p-2 bg-white rounded-xl shadow-sm border border-slate-100 text-2xl">📖</span>
            CATÁLOGO DE CONOCIMIENTO
          </h2>
          <p class="text-slate-500 font-medium mt-1">Gestión centralizada de bancos de preguntas y validaciones de IA.</p>
        </div>
        <div class="bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-2xl">
          <span class="text-[10px] font-black text-indigo-500 uppercase block leading-none">Total Capacitaciones</span>
          <span class="text-xl font-bold text-indigo-700">{{ modulos.length }}</span>
        </div>
      </header>

      <div class="grid grid-cols-1 gap-6">
        <div *ngFor="let titulo of modulos" 
             class="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden transition-all duration-300"
             [ngClass]="{'ring-2 ring-indigo-500 ring-offset-4 shadow-xl': capacitacionAbierta === titulo || loadingModule === titulo}">
          
          <button (click)="toggleModulo(titulo)" 
                  class="w-full p-8 flex justify-between items-center hover:bg-slate-50 transition-all focus:outline-none">
            <div class="flex items-center gap-5 text-left">
              <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform"
                   [ngClass]="capacitacionAbierta === titulo ? 'bg-indigo-600 scale-110' : 'bg-slate-800'">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-black text-slate-800 tracking-tight">{{ titulo }}</h3>
                <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Ver Estándar de Evaluación</span>
              </div>
            </div>
            
            <div class="flex items-center gap-4">
               <span class="text-[10px] font-black px-3 py-1 rounded-full uppercase transition-all duration-500 flex items-center gap-1.5"
                     [ngClass]="capacitacionAbierta === titulo 
                                ? 'bg-emerald-100 text-emerald-600 border border-emerald-200 animate-pulse' 
                                : 'bg-slate-50 text-slate-300 border border-transparent'">
                 <span *ngIf="capacitacionAbierta === titulo" class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                 IA Ready
               </span>

               <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 transition-transform duration-500"
                    [style.transform]="capacitacionAbierta === titulo ? 'rotate(180deg)' : ''">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                 </svg>
               </div>
            </div>
          </button>

          <div *ngIf="loadingModule === titulo" 
               class="p-16 border-t border-slate-50 flex flex-col items-center justify-center space-y-6">
            <div class="relative">
              <div class="absolute inset-0 bg-indigo-500 rounded-full blur-2xl opacity-20 animate-ping"></div>
              <div class="bg-gradient-to-tr from-indigo-600 to-violet-600 p-6 rounded-[2rem] text-white relative shadow-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.989-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
            <div class="text-center space-y-2">
              <p class="text-indigo-600 font-black text-xs uppercase tracking-[0.3em]">Conectando con RetailIA Engine</p>
              <h4 class="text-xl font-bold text-slate-700 italic animate-pulse">"{{ mensajeIA }}"</h4>
            </div>
            <div class="w-full max-w-sm h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div class="h-full bg-indigo-500 animate-[loading_1.8s_ease-in-out_infinite]"></div>
            </div>
          </div>

          <div *ngIf="capacitacionAbierta === titulo" 
               class="p-8 pt-0 border-t border-slate-50 space-y-6 animate-in zoom-in-95 duration-500">
            <div *ngFor="let item of bancoPreguntas[titulo]; let i = index" 
                 class="p-6 bg-slate-50/50 rounded-[2rem] border border-slate-100 hover:border-indigo-200 transition-colors shadow-sm">
              <div class="flex items-start gap-5">
                <span class="bg-white border shadow-sm w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-indigo-600 flex-shrink-0 italic">
                  {{i + 1}}
                </span>
                <div class="flex-1 space-y-5">
                  <p class="text-lg font-bold text-slate-800 leading-tight pt-1">{{ item.pregunta }}</p>
                  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                      <p class="text-[9px] font-black text-emerald-500 uppercase mb-2 tracking-widest flex items-center gap-2">
                        <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                        Respuesta Esperada / Feedback
                      </p>
                      <p class="text-xs text-slate-600 font-medium italic leading-relaxed">{{ item.feedback }}</p>
                    </div>
                    <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                      <p class="text-[9px] font-black text-indigo-500 uppercase mb-2 tracking-widest flex items-center gap-2">
                        <span class="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                        Criterios de Validación IA
                      </p>
                      <div class="flex flex-wrap gap-2">
                        <span *ngFor="let key of item.keywords" 
                              class="bg-indigo-50 px-3 py-1 rounded-lg text-[10px] font-bold text-indigo-600 border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-all cursor-default uppercase">
                          {{ key }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <style>
      @keyframes loading {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
    </style>
  `
})
export class KnowledgeCatalogComponent {
  private trainingService = inject(TrainingService);
  
  modulos = this.trainingService.getModulesList();
  bancoPreguntas = EXAMENES_DUMMY;

  capacitacionAbierta: string | null = null;
  loadingModule: string | null = null;
  mensajeIA: string = '';

  private mensajesPosibles = [
    'Extrayendo lineamientos corporativos...',
    'Analizando manuales de entrenamiento...',
    'Identificando criterios de evaluación...',
    'Sincronizando base de conocimientos...'
  ];

  async toggleModulo(titulo: string) {
    if (this.capacitacionAbierta === titulo) {
      this.capacitacionAbierta = null;
      return;
    }

    this.capacitacionAbierta = null;
    this.loadingModule = titulo;
    this.mensajeIA = this.mensajesPosibles[Math.floor(Math.random() * this.mensajesPosibles.length)];

    // Simulación de procesamiento IA
    await new Promise(resolve => setTimeout(resolve, 1800));

    this.loadingModule = null;
    this.capacitacionAbierta = titulo;
  }
}