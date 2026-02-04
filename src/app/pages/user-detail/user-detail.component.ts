import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { USER_POOL } from '../../data/user-pool';
import { UserMock, UserLog } from '../../models/user.model';
import { KnowledgeBaseService } from '../../services/knowledge-base.service';
import { TrainingService } from '../../services/training.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-[#f8fafc] p-8 font-sans">
      <div class="max-w-[1400px] mx-auto">
        
        <button routerLink="/dashboard" class="mb-8 flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] hover:text-indigo-600 transition-all">
          ← Volver al Panel
        </button>

        <div class="grid grid-cols-12 gap-8">
          
          <div class="col-span-12 lg:col-span-4">
            <div class="bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-50 relative overflow-hidden text-center">
              <div class="absolute top-0 left-0 w-full h-2 bg-indigo-500"></div>
              
              <div class="w-24 h-24 bg-slate-100 text-indigo-600 rounded-[2rem] mx-auto flex items-center justify-center text-3xl font-black mb-6 shadow-inner">
                {{ user()?.nombres?.[0] }}
              </div>
              
              <h2 class="text-2xl font-black text-slate-800">{{ user()?.apellidos }}, {{ user()?.nombres }}</h2>
              <span class="px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-indigo-50 text-indigo-600 border border-indigo-100 inline-block mt-4">
                {{ user()?.perfil }}
              </span>

              <div class="mt-8 pt-8 border-t border-slate-50 text-left space-y-6">
                <div>
                  <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest italic mb-1">DNI Identificación</p>
                  <p class="font-bold text-slate-700">{{ user()?.dni }}</p>
                </div>
                <div>
                  <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest italic mb-1">Estado Onboarding</p>
                  <p class="text-sm font-black text-emerald-500 uppercase">{{ user()?.progreso }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="col-span-12 lg:col-span-8 space-y-4">
            <h3 class="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
              <span class="w-3 h-3 bg-indigo-500 rounded-full animate-pulse"></span>
              HISTORIAL POR CAPACITACIÓN
            </h3>

            <div *ngFor="let nombre of nombresCapacitaciones" 
                class="bg-white rounded-[1.5rem] shadow-sm border border-slate-100 overflow-hidden transition-all duration-300">
              
              <button (click)="toggleAcordion(nombre)"
                      class="w-full p-6 flex justify-between items-center hover:bg-slate-50 transition-colors focus:outline-none">
                <div class="flex items-center gap-4 text-left">
                  <div class="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-bold text-slate-700 text-lg">{{ nombre }}</h4>
                    <p class="text-xs text-slate-400 font-medium uppercase tracking-tighter">
                      {{ logsAgrupados()[nombre].length }} Interacciones registradas
                    </p>
                  </div>
                </div>

                <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 transition-transform duration-300"
                    [style.transform]="capacitacionExpandida === nombre ? 'rotate(180deg)' : 'rotate(0deg)'">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              <div *ngIf="capacitacionExpandida === nombre" 
                  class="p-6 pt-0 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                
                <div *ngFor="let log of logsAgrupados()[nombre]" 
                  class="p-5 rounded-2xl border bg-white relative group transition-all"
                  [ngClass]="log.veredictoIA === 'CORRECTO' ? 'border-emerald-100' : 'border-rose-100'">

                <div class="absolute top-0 right-0 px-4 py-1 rounded-bl-xl text-[9px] font-black uppercase tracking-widest"
                    [ngClass]="log.veredictoIA === 'CORRECTO' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'">
                  {{ log.veredictoIA }}
                </div>

                <div class="mb-3">
                  <span class="text-[10px] font-bold text-slate-400 block mb-1">{{ log.fechaString }}</span>
                  <p class="text-sm text-slate-700 font-semibold leading-snug">{{ log.detalle }}</p>
                </div>
                
                <div class="bg-slate-50 p-4 rounded-xl text-[11px] text-slate-500 leading-relaxed border-l-4 border-slate-200 relative">
                  <span class="font-bold text-slate-600 uppercase text-[9px] block mb-1">Análisis de la IA:</span>
                  {{ log.feedbackIA }}

                  <button *ngIf="log.evento !== 'DOCUMENTO'" (click)="corregirIA(log)" 
                          class="absolute bottom-2 right-2 p-2 bg-white shadow-sm border border-orange-200 rounded-lg text-orange-500 hover:bg-orange-500 hover:text-white transition-all flex items-center gap-1 group">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.989-2.386l-.548-.547z" />
                    </svg>
                    <span class="text-[9px] font-bold">ENTRENAR IA</span>
                  </button>

                  <button *ngIf="log.evento === 'DOCUMENTO' && log.veredictoIA === 'INCORRECTO'" (click)="validarDocumento(log)" 
                          class="absolute bottom-2 right-2 p-2 bg-white shadow-sm border border-orange-200 rounded-lg text-orange-500 hover:bg-orange-500 hover:text-white transition-all flex items-center gap-1 group">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span class="text-[9px] font-bold">ENTRENAR IA</span>
                  </button>
                </div>

                <div *ngIf="log.fueCorregido" class="mt-2 flex items-center gap-1 text-[9px] font-bold text-emerald-500 uppercase">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  Conocimiento actualizado
                </div>
              </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  `
})
export class UserDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private kbService = inject(KnowledgeBaseService);
  private trainingService = inject(TrainingService);
  
  user = signal<UserMock | undefined>(undefined);

  logsAgrupados = computed(() => {
    const historial = this.user()?.historial || [];
    const grupos: { [key: string]: UserLog[] } = {};

    historial.forEach((log : any) => {
      if (!grupos[log.capacitacion]) {
        grupos[log.capacitacion] = [];
      }
      grupos[log.capacitacion].push(log);
    });

    return grupos;
  });

  capacitacionExpandida: string | null = null;

  ngOnInit() {
    const dni = this.route.snapshot.paramMap.get('dni');
    this.user.set(USER_POOL.find(u => u.dni === dni));
  }

  corregirIA(log: UserLog) {
    if (!log.questionId || !log.respuestaRaw) {
      alert('No se puede entrenar: falta questionId o respuesta.');
      return;
    }

    this.kbService.teachAnswer(log.questionId, log.respuestaRaw);
    log.veredictoIA = 'CORRECTO';
    log.fueCorregido = true;
    localStorage.setItem('RETAIL_USER_DB', JSON.stringify(USER_POOL));
    alert('Entrenamiento aplicado. La IA aprenderá para siguientes intentos.');
  }

  validarDocumento(log: UserLog) {
    if (!log.docTipo || !log.docPrefijoNormalizado) {
      alert('No se puede validar: falta el prefijo a entrenar.');
      return;
    }

    this.trainingService.aprenderPrefijoDocumento(log.docTipo, log.docPrefijoNormalizado);
    log.veredictoIA = 'CORRECTO';
    log.fueCorregido = true;
    log.feedbackIA = 'Prefijo aprobado por RR.HH.';
    localStorage.setItem('RETAIL_USER_DB', JSON.stringify(USER_POOL));
    alert('Validación aplicada. Ese prefijo ya será aceptado.');
  }

  get nombresCapacitaciones() {
    return Object.keys(this.logsAgrupados());
  }

  toggleAcordion(nombre: string) {
    if (this.capacitacionExpandida === nombre) {
      this.capacitacionExpandida = null; // Si ya estaba abierta, la cierra
    } else {
      this.capacitacionExpandida = nombre; // Abre la seleccionada
    }
  }
}
