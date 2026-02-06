import { Component, OnInit, signal, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { USER_POOL, USER_POOL_NOTIFY } from '../../data/user-pool';
import { UserMock } from '../../models/user.model';
import { ExportService } from '../../services/export.service';
import { AppNotification, NotificationService } from '../../services/notification.service';
import { Subscription } from 'rxjs';
import { PushTrainingService } from '../../services/push-training.service';
import { TrainingService } from '../../services/training.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="p-10 max-w-[1600px] mx-auto animate-in fade-in duration-700 relative">
      <!-- ... encabezado y cards (sin cambios) ... -->

      <header class="flex justify-between items-end mb-10">
        <div>
          <h1 class="text-4xl font-black tracking-tight text-slate-800">¡Bienvenido de vuelta! 👋</h1>
          <p class="text-slate-400 font-medium mt-1 uppercase text-[10px] tracking-[0.2em]">Monitoreo de Onboarding e IA en tiempo real</p>
        </div>
        <div class="flex gap-4">
           <button (click)="showModal = true" class="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-200 hover:scale-105 active:scale-95 transition-all">
             + Programar Capacitación
           </button>
           <button (click)="exportData()" class="bg-emerald-500 text-white px-6 py-4 rounded-2xl font-bold shadow-xl shadow-emerald-100 hover:scale-105 transition-all">
             📥 Exportar
           </button>
        </div>
      </header>

      <div class="grid grid-cols-4 gap-6 mb-12">
        <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
          <p class="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Total Usuarios</p>
          <h3 class="text-4xl font-black text-slate-800">{{ stats().total }}</h3>
          <div class="mt-4 flex items-center gap-2 text-emerald-500 font-bold text-xs italic">
            <span>↑ 5% vs anterior</span>
          </div>
        </div>

        <div class="bg-white p-8 rounded-[2.5rem] border-t-4 border-t-red-500 shadow-sm">
          <p class="text-red-500 text-[10px] font-black uppercase tracking-widest mb-2">DNI Vencidos</p>
          <h3 class="text-4xl font-black text-slate-800">{{ stats().vencidos }}</h3>
          <p class="mt-4 text-slate-400 text-xs font-bold italic">Acción inmediata</p>
        </div>

        <div class="bg-white p-8 rounded-[2.5rem] border-t-4 border-t-amber-400 shadow-sm">
          <p class="text-amber-500 text-[10px] font-black uppercase tracking-widest mb-2">En Revisión / IA</p>
          <h3 class="text-4xl font-black text-slate-800">{{ stats().pendientes }}</h3>
          <p class="mt-4 text-slate-400 text-xs font-bold italic">Monitoreo activo</p>
        </div>

        <div class="bg-white p-8 rounded-[2.5rem] border-t-4 border-t-emerald-500 shadow-sm">
          <p class="text-emerald-500 text-[10px] font-black uppercase tracking-widest mb-2">Completados</p>
          <h3 class="text-4xl font-black text-slate-800">{{ stats().completados }}</h3>
          <p class="mt-4 text-slate-400 text-xs font-bold italic">Situación estable</p>
        </div>
      </div>

      <section class="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/40 p-10 border border-slate-50">
        <div class="flex justify-between items-center mb-10">
           <div>
             <h4 class="text-2xl font-black text-slate-800 tracking-tight">Distribución de Gestión</h4>
             <p class="text-xs text-slate-400 font-bold mt-1 uppercase tracking-widest italic">Listado de seguimiento en tiempo real</p>
           </div>
           <div class="bg-slate-100 p-1.5 rounded-2xl flex gap-1">
              <button (click)="setFilter('TODOS')" class="px-6 py-2.5 text-xs font-black rounded-xl transition-all" [class.bg-white]="filterSelected() === 'TODOS'" [class.shadow-md]="filterSelected() === 'TODOS'">TODOS</button>
              <button (click)="setFilter('COLABORADOR')" class="px-6 py-2.5 text-xs font-black rounded-xl transition-all" [class.bg-white]="filterSelected() === 'COLABORADOR'" [class.shadow-md]="filterSelected() === 'COLABORADOR'">COLABORADORES</button>
              <button (click)="setFilter('NO_COLABORADOR')" class="px-6 py-2.5 text-xs font-black rounded-xl transition-all" [class.bg-white]="filterSelected() === 'NO_COLABORADOR'" [class.shadow-md]="filterSelected() === 'NO_COLABORADOR'">NO COLABORADORES</button>
           </div>
        </div>

        <table class="w-full">
          <thead>
            <tr class="text-left text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-50">
              <th class="pb-6 px-4">Colaborador / DNI</th>
              <th class="pb-6">Perfil</th>
              <th class="pb-6">Estado de Avance</th>
              <th class="pb-6 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <!-- Fila principal por usuario -->
            <ng-container *ngFor="let user of users()">
              <tr class="group hover:bg-slate-50/80 transition-all duration-300 cursor-pointer" (click)="user.perfil === 'COLABORADOR' && toggleRow(user.dni)">
                <td class="py-8 px-4">
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                      {{ user.nombres[0] }}{{ user.apellidos[0] }}
                    </div>
                    <div>
                      <p class="font-black text-slate-800 text-lg leading-none mb-1">{{ user.apellidos }}, {{ user.nombres }}</p>
                      <p class="text-xs text-slate-400 font-bold tracking-tight italic">{{ user.dni }}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <span [class]="user.perfil === 'COLABORADOR' ? 'text-blue-600 bg-blue-50 border-blue-100' : 'text-purple-600 bg-purple-50 border-purple-100'" 
                        class="px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tighter border">
                    {{ user.perfil }}
                  </span>
                </td>
                <td>
                  <div class="flex flex-col gap-2.5">
                    <div class="flex justify-between items-end text-[10px] font-black uppercase tracking-widest">
                       <span [class.text-emerald-500]="user.progreso === 'COMPLETADO'" class="text-slate-500 italic">{{ user.progreso }}</span>
                       <!-- Eliminado el texto 'En curso...' y se muestra % calculado -->
                       <span class="text-slate-400">{{ getOverallProgress(user) }}%</span>
                    </div>
                    <div class="w-56 h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                       <div class="h-full transition-all duration-1000 ease-out" 
                            [class.bg-emerald-500]="user.progreso === 'COMPLETADO'"
                            [class.bg-amber-400]="user.progreso !== 'COMPLETADO'"
                            [style.width]="getOverallProgress(user) + '%'">
                       </div>
                    </div>
                  </div>
                </td>
                <td class="text-center">
                  <button [routerLink]="['/user-detail', user.dni]" 
                          class="bg-white border border-slate-200 px-6 py-3 rounded-2xl text-xs font-black uppercase shadow-sm hover:border-indigo-600 hover:text-indigo-600 transition-all">
                    Ver Historial & IA
                  </button>
                </td>
              </tr>

              <!-- Fila detalle expandible: SOLO para COLABORADORES y solo si expandedUser === dni -->
              <tr *ngIf="user.perfil === 'COLABORADOR' && expandedUser === user.dni" class="bg-slate-50">
                <td colspan="4" class="px-8 py-6">
                  <div class="grid md:grid-cols-3 gap-4">
                    <div *ngFor="let mod of modulos" class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                      <div class="flex justify-between items-center mb-2">
                        <div class="text-xs font-black uppercase tracking-widest text-slate-500">{{ mod }}</div>
                        <div class="text-xs font-black text-slate-400">{{ getModuleProgress(user, mod) }}%</div>
                      </div>
                      <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div class="h-full transition-all duration-700 ease-out bg-amber-400" [style.width]="getModuleProgress(user, mod) + '%'"></div>
                      </div>
                    </div>
                  </div>
                  <p class="mt-4 text-xs text-slate-400 italic">Click en la fila para contraer/expandir. Las barras se actualizarán conforme se registren eventos en el historial del usuario.</p>
                </td>
              </tr>
            </ng-container>
          </tbody>
        </table>
      </section>

      <div *ngIf="showModal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[150] flex items-center justify-center p-4">
        <div class="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
          <div class="p-10">
            <div class="flex justify-between items-start mb-8">
              <div>
                <h2 class="text-3xl font-black text-slate-800 tracking-tight">Programar Capacitación</h2>
                <p class="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1 italic">Envío masivo vía WhatsApp Business</p>
              </div>
              <button (click)="showModal = false" class="text-slate-300 hover:text-red-500 transition-colors text-2xl">✕</button>
            </div>

            <div class="space-y-6">
              <div>
                <label class="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 ml-1 italic text-indigo-600">Módulo de Capacitación</label>
                <select [(ngModel)]="selectedModulo" class="w-full bg-slate-50 border-none p-5 rounded-2xl font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none">
                  <option *ngFor="let mod of modulos; let i = index" [value]="i">{{ mod }}</option>
                </select>
              </div>

              <div>
                <label class="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 ml-1 italic text-indigo-600">Seleccionar Destinatarios ({{ selectedDnis.length }})</label>
                <div class="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-2 custom-scroll">
                  <div *ngFor="let user of colaboradoresOnly" 
                       (click)="toggleUser(user.dni)"
                       [class.bg-indigo-600]="selectedDnis.includes(user.dni)"
                       [class.text-white]="selectedDnis.includes(user.dni)"
                       class="p-4 rounded-2xl bg-slate-50 cursor-pointer hover:bg-indigo-50 transition-all flex items-center gap-3">
                    <div class="w-2 h-2 rounded-full" [class.bg-indigo-400]="!selectedDnis.includes(user.dni)" [class.bg-white]="selectedDnis.includes(user.dni)"></div>
                    <span class="text-xs font-black uppercase tracking-tighter">{{ user.apellidos }}</span>
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 ml-1 italic text-indigo-600">Nota Adicional para la IA</label>
                <textarea [(ngModel)]="mensajeAdmin" placeholder="Ej: Hola, tienes pendiente este curso de seguridad..." 
                          class="w-full bg-slate-50 border-none p-5 rounded-2xl font-medium text-slate-700 h-28 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"></textarea>
              </div>

              <div class="pt-4 flex gap-4">
                <button (click)="enviarMasivo()" class="flex-1 bg-indigo-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-indigo-200 hover:scale-[1.02] active:scale-95 transition-all">
                  🚀 Iniciar Envío Masivo
                </button>
                <button (click)="showModal = false" class="px-8 bg-slate-100 text-slate-500 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-200 transition-all">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div *ngIf="currentNotif()" class="fixed bottom-10 right-10 bg-slate-900 text-white p-6 rounded-[2rem] shadow-2xl flex items-center gap-5 animate-in slide-in-from-right duration-500 border-l-8 border-emerald-500 z-[200]">
         <div class="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-2xl">🔔</div>
         <div>
           <p class="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1 italic">Notificación en tiempo real</p>
           <p class="text-sm font-bold leading-tight">{{ currentNotif()?.msg }}</p>
         </div>
      </div>
      <!-- ... modal y notificaciones (sin cambios) ... -->
    </div>
  `,
   styles: [`
    :host { display: block; }
    .custom-scroll::-webkit-scrollbar { width: 4px; }
    .custom-scroll::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
  `]
})
export class DashboardComponent implements OnInit, OnDestroy {
  private exportService = inject(ExportService);
  private notifService = inject(NotificationService);
  private pushService = inject(PushTrainingService);
  private trainingService = inject(TrainingService);
  
  users = signal<UserMock[]>([]);
  filterSelected = signal<'TODOS' | 'COLABORADOR' | 'NO_COLABORADOR'>('TODOS');
  stats = signal({ total: 0, completados: 0, pendientes: 0, vencidos: 0 });
  currentNotif = signal<AppNotification | null>(null);
  
  // Lógica del Modal restaurada
  showModal = false;
  modulos: string[] = this.trainingService.getModulesList();
  selectedModulo: number = 0;
  mensajeAdmin: string = '';
  colaboradoresOnly = USER_POOL.filter(u => u.perfil === 'COLABORADOR');
  selectedDnis: string[] = [];

  // estado UI: usuario expandido (dni)
  expandedUser: string | null = null;

  private sub!: Subscription;

  ngOnInit() {
    this.refreshData();
    this.sub = this.notifService.notifications$.subscribe(notif => {
      this.currentNotif.set(notif);
      const firstWord = notif.msg.split(' ')[0];
      const isCompletion = (firstWord === 'Completó' || firstWord === 'Finalizó'); 
      this.refreshData(isCompletion);
      setTimeout(() => this.currentNotif.set(null), 10000);
    });
  }

  ngOnDestroy() { if (this.sub) this.sub.unsubscribe(); }

  refreshData(useNotifyPool?: boolean) {
    let data = (useNotifyPool) ? [...USER_POOL_NOTIFY] : [...USER_POOL];
    if (this.filterSelected() !== 'TODOS') data = data.filter(u => u.perfil === this.filterSelected());
    this.users.set(data);
    this.calculateStats();
  }

  calculateStats() {
    const pool = USER_POOL;
    this.stats.set({
      total: pool.length,
      pendientes: pool.filter(u => u.progreso !== 'COMPLETADO').length,
      vencidos: pool.filter(u => u.dniVencido).length,
      completados: pool.filter(u => u.progreso === 'COMPLETADO').length
    });
  }

  setFilter(type: 'TODOS' | 'COLABORADOR' | 'NO_COLABORADOR') {
    this.filterSelected.set(type);
    this.refreshData();
  }

  exportData() { this.exportService.downloadTRegistro(USER_POOL); }

  toggleUser(dni: string) {
    const idx = this.selectedDnis.indexOf(dni);
    if (idx > -1) this.selectedDnis.splice(idx, 1);
    else this.selectedDnis.push(dni);
  }

  // toggle de fila expandible
  toggleRow(dni: string) {
    if (this.expandedUser === dni) this.expandedUser = null;
    else this.expandedUser = dni;
  }

  enviarMasivo() {
    const moduloNombre = this.modulos[this.selectedModulo];
    
    this.selectedDnis.forEach(dni => {
      // 1. Enviamos la capacitación (Push)
      this.pushService.enviarCapacitacionAMasivo(Number(this.selectedModulo), [dni], this.mensajeAdmin);
      
      // 2. Registramos el evento en el historial persistente
      this.trainingService.registrarEventoCapacitacion(
        dni, 
        moduloNombre, 
        'Se inició el proceso de capacitación vía WhatsApp.',
        true,
        '',
        ''
      );
    });

    this.showModal = false;
    alert('🚀 Capacitación programada y registrada en el historial.');
  }

  // Calcula progreso por módulo en base a logs del usuario (heurística ligera)
  getModuleProgress(user: UserMock, moduloTitulo: string): number {
    const logs = (user.historial || []).filter(l => l.capacitacion === moduloTitulo);
    // Heurística: cada log = +20% (ajusta según tus necesidades o datos reales)
    const pct = Math.min(logs.length * 20, 100);
    // Si progreso general es COMPLETADO forzamos 100
    if (user.progreso === 'COMPLETADO') return 100;
    return pct;
  }

  // Calcula porcentaje global simple sobre todos los módulos
  getOverallProgress(user: UserMock): number {
    if (user.progreso === 'COMPLETADO') return 100;
    const mods = this.modulos;
    if (!mods || mods.length === 0) return 0;
    const total = mods.reduce((acc, m) => acc + this.getModuleProgress(user, m), 0);
    const avg = Math.round(total / mods.length);
    // no mostrar 0 para quienes tienen algún progreso; mínimo 5%
    return Math.max(avg, user.historial && user.historial.length ? 5 : 0);
  }
}