import { Component, OnInit, signal, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { USER_POOL } from '../../data/user-pool';
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
          <p class="text-xs font-medium text-gray-400 uppercase">Total Usuarios</p>
          <p class="text-2xl font-bold text-slate-800">{{ stats().total }}</p>
        </div>
        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p class="text-xs font-medium text-emerald-500 uppercase">Completados</p>
          <p class="text-2xl font-bold text-slate-800">{{ stats().completados }}</p>
        </div>
        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-amber-400">
          <p class="text-xs font-medium text-amber-500 uppercase">En Proceso</p>
          <p class="text-2xl font-bold text-slate-800">{{ stats().pendientes }}</p>
        </div>
        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-red-400">
          <p class="text-xs font-medium text-red-500 uppercase">Documentos Vencidos</p>
          <p class="text-2xl font-bold text-slate-800">{{ stats().vencidos }}</p>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="p-4 border-b border-gray-50 flex justify-between items-center bg-slate-50/50">
          <h2 class="font-bold text-slate-700">Listado de Personal</h2>
          <div class="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            <button (click)="setFilter('TODOS')" [class.bg-slate-800]="filterSelected() === 'TODOS'" [class.text-white]="filterSelected() === 'TODOS'" class="px-3 py-1 text-xs rounded-md transition-all">Todos</button>
            <button (click)="setFilter('COLABORADOR')" [class.bg-slate-800]="filterSelected() === 'COLABORADOR'" [class.text-white]="filterSelected() === 'COLABORADOR'" class="px-3 py-1 text-xs rounded-md transition-all">Colaboradores</button>
            <button (click)="setFilter('NO_COLABORADOR')" [class.bg-slate-800]="filterSelected() === 'NO_COLABORADOR'" [class.text-white]="filterSelected() === 'NO_COLABORADOR'" class="px-3 py-1 text-xs rounded-md transition-all">Externos</button>
          </div>
        </div>

        <table class="w-full text-left text-sm">
          <thead class="bg-slate-50 text-slate-500 font-medium">
            <tr>
              <th class="px-4 py-3">DNI / Nombre</th>
              <th class="px-4 py-3">Perfil</th>
              <th class="px-4 py-3">RUC / Estado</th>
              <th class="px-4 py-3">Progreso</th>
              <th class="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr *ngFor="let user of users()" class="hover:bg-slate-50/80 transition-colors">
              <td class="px-4 py-4">
                <div class="font-bold text-slate-700">{{ user.dni }}</div>
                <div class="text-xs text-gray-500">{{ user.nombres }} {{ user.apellidos }}</div>
              </td>
              <td class="px-4 py-4">
                <span [class]=\"user.perfil === 'COLABORADOR' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'\"
                      class=\"px-2 py-1 rounded-full text-[10px] font-bold uppercase\">
                  {{ user.perfil }}
                </span>
              </td>
              <td class="px-4 py-4">
                <div class="text-xs font-mono">{{ user.ruc }}</div>
                <div class="text-[10px] text-emerald-600 font-bold">{{ user.estadoRuc }}</div>
              </td>
              <td class="px-4 py-4">
                <span class=\"px-2 py-1 rounded-md text-[10px] font-bold\"
                      [ngClass]=\"{
                        'bg-emerald-100 text-emerald-700': user.progreso === 'COMPLETADO',
                        'bg-amber-100 text-amber-700': user.progreso === 'DOCUMENTACION'
                      }\">
                  {{ user.progreso }}
                </span>
              </td>
              <td class="px-4 py-4">
                <button class=\"text-indigo-600 hover:text-indigo-800 font-bold text-xs\">Ver Detalle</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div *ngIf="showModal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-indigo-50/30">
          <h3 class="text-xl font-bold text-slate-800">🚀 Programar Capacitación</h3>
          <button (click)="showModal = false" class="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>
        
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Título de Capacitación</label>
            <input type="text" [(ngModel)]="newCap.titulo" name="titulo" class="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="Ej: Seguridad en Almacén 2026">
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Descripción / Instrucciones</label>
            <textarea [(ngModel)]="newCap.descripcion" name="desc" class="w-full p-2.5 border rounded-lg h-24 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Hola, por favor completa este curso..."></textarea>
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Adjuntar Material (PDF)</label>
            <input type="file" (change)="onFileSelected($event)" class="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100">
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Enviar a Colaboradores:</label>
            <div class="max-height-32 overflow-y-auto border rounded-lg p-2 space-y-2">
              <label *ngFor="let colab of colaboradoresOnly" class="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors">
                <input type="checkbox" [value]="colab.dni" (change)="toggleUser(colab.dni)" class="w-4 h-4 text-indigo-600">
                <span class="text-sm text-gray-700">{{ colab.nombres }} {{ colab.apellidos }} ({{ colab.dni }})</span>
              </label>
            </div>
          </div>
        </div>

        <div class="p-4 bg-gray-50 flex gap-3 justify-end">
          <button (click)="showModal = false" class="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800">Cancelar</button>
          <button (click)="enviarMasivo()" 
                  [disabled]="!newCap.titulo || !newCap.descripcion || selectedDnis.length === 0"
                  class="bg-indigo-600 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg font-bold text-sm shadow-md transition-all">
            🚀 Lanzar Capacitación
          </button>
        </div>
      </div>
    </div>

    <div *ngIf="currentNotif()" 
         class="fixed bottom-6 right-6 bg-slate-800 text-white p-4 rounded-xl shadow-2xl border-l-4 border-emerald-500 flex items-center gap-4 animate-in slide-in-from-right duration-500 z-[100]">
       <div class="bg-emerald-500 p-2 rounded-lg">✅</div>
       <div>
         <p class="text-xs font-bold text-emerald-400">Notificación en tiempo real</p>
         <p class="text-sm font-medium">{{ currentNotif()?.user }}: {{ currentNotif()?.msg }}</p>
       </div>
    </div>
  `,
  styles: [`
    .max-height-32 { max-height: 120px; }
    input:focus, textarea:focus { border-color: #4f46e5; }
  `]
})
export class DashboardComponent implements OnInit, OnDestroy {
  private exportService = inject(ExportService);
  private notifService = inject(NotificationService);
  private pushService = inject(PushTrainingService);
  
  users = signal<UserMock[]>([]);
  filterSelected = signal<'TODOS' | 'COLABORADOR' | 'NO_COLABORADOR'>('TODOS');
  stats = signal({ total: 0, completados: 0, pendientes: 0, vencidos: 0 });
  currentNotif = signal<AppNotification | null>(null);
  
  // MODAL LOGIC
  showModal = false;
  colaboradoresOnly = USER_POOL.filter(u => u.perfil === 'COLABORADOR');
  selectedDnis: string[] = [];
  newCap = { titulo: '', descripcion: '', file: null as File | null };

  private sub!: Subscription;

  ngOnInit() {
    this.refreshData();
    this.sub = this.notifService.notifications$.subscribe(notif => {
      this.currentNotif.set(notif);
      this.refreshData();
      setTimeout(() => this.currentNotif.set(null), 8000);
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  refreshData() {
    let data = [...USER_POOL];
    if (this.filterSelected() !== 'TODOS') {
      data = data.filter(u => u.perfil === this.filterSelected());
    }
    this.users.set(data);
    this.calculateStats();
  }

  calculateStats() {
    const all = USER_POOL;
    this.stats.set({
      total: all.length,
      completados: all.filter(u => u.progreso === 'COMPLETADO').length,
      pendientes: all.filter(u => u.progreso === 'DOCUMENTACION').length,
      vencidos: all.filter(u => u.dniVencido).length
    });
  }

  setFilter(type: 'TODOS' | 'COLABORADOR' | 'NO_COLABORADOR') {
    this.filterSelected.set(type);
    this.refreshData();
  }

  exportData() {
    this.exportService.downloadTRegistro(USER_POOL);
  }

  // MODAL HELPERS
  onFileSelected(event: any) {
    this.newCap.file = event.target.files[0];
  }

  toggleUser(dni: string) {
    const idx = this.selectedDnis.indexOf(dni);
    if (idx > -1) this.selectedDnis.splice(idx, 1);
    else this.selectedDnis.push(dni);
  }

  enviarMasivo() {
    // Aquí usamos el servicio para enviar a los DNIs seleccionados
    this.pushService.enviarCapacitacionAMasivo(
      0, // Módulo por defecto o basado en archivo
      this.selectedDnis,
      this.newCap.descripcion
    );

    // Feedback y cierre
    this.showModal = false;
    this.newCap = { titulo: '', descripcion: '', file: null };
    this.selectedDnis = [];
    alert('🚀 Capacitación programada y enviada a los colaboradores seleccionados.');
  }
}