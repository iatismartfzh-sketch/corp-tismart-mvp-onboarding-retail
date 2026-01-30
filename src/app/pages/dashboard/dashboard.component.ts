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

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6 p-6 bg-gray-50 min-h-screen">
      <div class="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 class="text-xl font-bold text-slate-800">Panel de Control RR.HH.</h1>
          <p class="text-xs text-gray-500">Gestión de Onboarding y Capacitaciones</p>
        </div>
        
        <div class="flex gap-3">
          <button (click)="showModal = true" 
                  class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-all shadow-sm">
            <span>📅 Programar Capacitación</span>
          </button>

          <button (click)="exportData()" 
                  class="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-all shadow-sm">
            <span>📥 Exportar T-Registros</span>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Usuarios</p>
          <p class="text-2xl font-black text-slate-800">{{ stats().total }}</p>
        </div>
        <div class="bg-white p-4 rounded-xl border-l-4 border-emerald-500 shadow-sm">
          <p class="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Completados</p>
          <p class="text-2xl font-black text-slate-800">{{ stats().completados }}</p>
        </div>
        <div class="bg-white p-4 rounded-xl border-l-4 border-amber-400 shadow-sm">
          <p class="text-[10px] font-bold text-amber-500 uppercase tracking-wider">En Revisión / Pendientes</p>
          <p class="text-2xl font-black text-slate-800">{{ stats().pendientes }}</p>
        </div>
        <div class="bg-white p-4 rounded-xl border-l-4 border-red-400 shadow-sm">
          <p class="text-[10px] font-bold text-red-500 uppercase tracking-wider">DNI Vencidos</p>
          <p class="text-2xl font-black text-slate-800">{{ stats().vencidos }}</p>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="p-4 border-b border-gray-50 flex justify-between items-center bg-slate-50/50">
          <h2 class="font-bold text-slate-700 text-sm">Seguimiento de Documentación y Capacitación</h2>
          <div class="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            <button (click)="setFilter('TODOS')" [class.bg-slate-800]="filterSelected() === 'TODOS'" [class.text-white]="filterSelected() === 'TODOS'" class="px-3 py-1 text-xs rounded-md transition-all">Todos</button>
            <button (click)="setFilter('COLABORADOR')" [class.bg-slate-800]="filterSelected() === 'COLABORADOR'" [class.text-white]="filterSelected() === 'COLABORADOR'" class="px-3 py-1 text-xs rounded-md transition-all">Colaboradores</button>
            <button (click)="setFilter('NO_COLABORADOR')" [class.bg-slate-800]="filterSelected() === 'NO_COLABORADOR'" [class.text-white]="filterSelected() === 'NO_COLABORADOR'" class="px-3 py-1 text-xs rounded-md transition-all">Proveedores</button>
          </div>
        </div>

        <table class="w-full text-left text-sm">
          <thead class="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
            <tr>
              <th class="px-6 py-4">Usuario</th>
              <th class="px-6 py-4">Perfil</th>
              <th class="px-6 py-4">RUC / Estado</th>
              <th class="px-6 py-4">Progreso Actual</th>
              <th class="px-6 py-4 text-center">Acción</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr *ngFor="let user of users()" class="hover:bg-slate-50 transition-all">
              <td class="px-6 py-4">
                <div class="font-bold text-slate-700 leading-none mb-1">{{ user.dni }}</div>
                <div class="text-[11px] text-gray-400 uppercase font-medium">{{ user.apellidos }}, {{ user.nombres }}</div>
              </td>
              <td class="px-6 py-4">
                <span [class]="user.perfil === 'COLABORADOR' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-purple-50 text-purple-600 border-purple-100'"
                      class="px-2 py-0.5 rounded-full text-[10px] font-black uppercase border">
                  {{ user.perfil }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="text-xs font-mono text-slate-500">{{ user.ruc || '---' }}</div>
                <div class="text-[10px] font-bold text-emerald-500 italic">{{ user.estadoRuc }}</div>
              </td>
              <td class="px-6 py-4">
                <div *ngIf="user.perfil === 'NO_COLABORADOR'" class="flex flex-col gap-1">
                  <div class="flex gap-2 text-xl mb-1">
                    <span [class.opacity-100]="user.documentos?.dni_adjunto === 'ENVIADO'" class="opacity-10 transition-all grayscale-[50%]" title="DNI">🪪</span>
                    <span [class.opacity-100]="user.documentos?.ruc_adjunto === 'ENVIADO'" class="opacity-10 transition-all grayscale-[50%]" title="RUC">📄</span>
                    <span [class.opacity-100]="user.documentos?.recibo_luz === 'ENVIADO'" class="opacity-10 transition-all grayscale-[50%]" title="Luz">💡</span>
                  </div>
                  
                  <span *ngIf="user.progreso === 'EN REVISION'" class="inline-flex items-center text-[10px] font-black text-amber-500 uppercase tracking-tighter">
                    <span class="w-2 h-2 bg-amber-500 rounded-full animate-pulse mr-1"></span>
                    Pendiente Revisión
                  </span>
                  <span *ngIf="user.progreso === 'DOCUMENTACION'" class="text-[10px] font-bold text-slate-300 uppercase">Cargando datos...</span>
                  <span *ngIf="user.progreso === 'COMPLETADO'" class="text-[10px] font-black text-emerald-600 uppercase">✅ Aprobado</span>
                </div>

                <div *ngIf="user.perfil === 'COLABORADOR'">
                  <span class="px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest border"
                        [ngClass]="{
                          'bg-emerald-50 text-emerald-600 border-emerald-200': user.progreso === 'COMPLETADO',
                          'bg-indigo-50 text-indigo-600 border-indigo-200': user.progreso !== 'COMPLETADO'
                        }">
                    {{ user.progreso }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 text-center">
                <button (click)="aprobarDocumentos(user)" 
                        *ngIf="user.progreso === 'EN REVISION'"
                        class="bg-emerald-600 text-white hover:bg-emerald-700 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all shadow-md shadow-emerald-100">
                  Aprobar Docs
                </button>
                <span *ngIf="user.progreso !== 'EN REVISION'" class="text-slate-300 text-[10px] font-bold uppercase tracking-widest">Sin acciones</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div *ngIf="showModal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in duration-200">
        <div class="p-5 bg-slate-50 border-b flex justify-between items-center">
          <h3 class="font-black text-slate-800 uppercase text-sm tracking-widest">Programar Capacitación</h3>
          <button (click)="showModal = false" class="text-slate-400 text-2xl hover:text-slate-600 font-light">&times;</button>
        </div>
        <div class="p-6 space-y-4">
          <div>
            <label class="text-[10px] font-black text-slate-400 uppercase block mb-1">Módulo</label>
            <select [(ngModel)]="selectedModulo" class="w-full border p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500">
              <option *ngFor="let m of modulos; let i = index" [value]="i">{{ m }}</option>
            </select>
          </div>
          <div>
            <label class="text-[10px] font-black text-slate-400 uppercase block mb-1">Mensaje WhatsApp</label>
            <textarea [(ngModel)]="mensajeAdmin" class="w-full border p-2.5 rounded-xl text-sm h-24 outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
          </div>
          <div>
            <label class="text-[10px] font-black text-slate-400 uppercase block mb-1">Seleccionar Usuarios</label>
            <div class="border rounded-xl p-2 h-32 overflow-y-auto bg-slate-50">
              <label *ngFor="let c of colaboradoresOnly" class="flex items-center gap-3 p-2 hover:bg-white rounded-lg cursor-pointer">
                <input type="checkbox" (change)="toggleUser(c.dni)" class="w-4 h-4 rounded text-indigo-600">
                <span class="text-xs font-bold text-slate-600">{{ c.nombres }} {{ c.apellidos }}</span>
              </label>
            </div>
          </div>
        </div>
        <div class="p-4 bg-slate-50 border-t flex gap-2">
          <button (click)="showModal = false" class="flex-1 py-2 text-xs font-bold text-slate-400 uppercase">Cancelar</button>
          <button (click)="enviarMasivo()" 
                  [disabled]="!mensajeAdmin || selectedDnis.length === 0"
                  class="flex-1 bg-indigo-600 disabled:bg-slate-300 text-white py-2 rounded-xl text-[10px] font-black uppercase shadow-lg shadow-indigo-200">
            Lanzar 🚀
          </button>
        </div>
      </div>
    </div>

    <div *ngIf="currentNotif()" class="fixed bottom-6 right-6 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border-l-4 border-emerald-500 flex items-center gap-4 animate-in slide-in-from-right duration-500 z-50">
       <div class="text-xl">🔔</div>
       <div>
         <p class="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Alerta de Sistema</p>
         <p class="text-xs font-bold">{{ currentNotif()?.user }}: {{ currentNotif()?.msg }}</p>
       </div>
    </div>
  `,
  styles: [`
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
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
  
  showModal = false;
  modulos: string[] = this.trainingService.getModulesList();
  selectedModulo: number = 0;
  mensajeAdmin: string = '';
  colaboradoresOnly = USER_POOL.filter(u => u.perfil === 'COLABORADOR');
  selectedDnis: string[] = [];

  private sub!: Subscription;

  ngOnInit() {
    this.refreshData();

    this.sub = this.notifService.notifications$.subscribe(notif => {
      this.currentNotif.set(notif);
      let first = notif.msg.split(' ')[0];
      let finaly = (first === 'Completó'); 
      this.refreshData(finaly); // Esto actualiza la tabla cuando el chat avanza
      setTimeout(() => this.currentNotif.set(null), 10000);
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  refreshData(notification?: boolean) {
    let data = (notification) ? [...USER_POOL_NOTIFY] : [...USER_POOL];

    if (this.filterSelected() !== 'TODOS') {
      data = data.filter(u => u.perfil === this.filterSelected());
    }
    console.log("data 2", (notification) ? JSON.stringify(data): [])
    this.users.set(data);
    this.calculateStats();
  }

  calculateStats() {
    const pool = USER_POOL;
    this.stats.set({
      total: pool.length,
      pendientes: pool.filter(u => u.progreso === 'DOCUMENTACION' || u.progreso === 'EN REVISION').length,
      vencidos: pool.filter(u => u.dniVencido).length,
      completados: pool.filter(u => u.progreso === 'COMPLETADO').length
    });
  }

  setFilter(type: 'TODOS' | 'COLABORADOR' | 'NO_COLABORADOR') {
    this.filterSelected.set(type);
    this.refreshData();
  }

  aprobarDocumentos(user: UserMock) {
    // Buscamos el objeto real en el pool y lo actualizamos
    const target = USER_POOL.find(u => u.dni === user.dni);
    if (target) {
      target.progreso = 'COMPLETADO';
      this.refreshData();
      alert(`Documentos de ${user.nombres} aprobados.`);
    }
  }

  exportData() {
    this.exportService.downloadTRegistro(USER_POOL);
  }

  toggleUser(dni: string) {
    const idx = this.selectedDnis.indexOf(dni);
    if (idx > -1) this.selectedDnis.splice(idx, 1);
    else this.selectedDnis.push(dni);
  }

  enviarMasivo() {
    this.pushService.enviarCapacitacionAMasivo(
      Number(this.selectedModulo), 
      this.selectedDnis, 
      this.mensajeAdmin
    );
    this.showModal = false;
    this.mensajeAdmin = '';
    this.selectedDnis = [];
    alert('🚀 Notificación enviada.');
  }
}