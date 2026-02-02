import { Component, OnInit, inject, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatSimulatorService } from '../../services/chat-simulator.service';
import { TrainingService } from '../../services/training.service';

@Component({
  selector: 'app-simulator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-2xl mx-auto h-[85vh] flex flex-col bg-[#e5ddd5] rounded-xl shadow-2xl overflow-hidden border border-gray-300">
      <div class="bg-[#075e54] p-4 text-white flex items-center justify-between shadow-md">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl shadow-inner">👤</div>
          <div>
            <p class="font-bold leading-tight">Asistente Onboarding IA</p>
            <p class="text-[10px] text-green-200 flex items-center gap-1">
              <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> en línea (Simulador QA)
            </p>
          </div>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat">
        <div *ngFor="let msg of chatService.messages()" 
             [ngClass]="{'flex justify-end': msg.sender === 'user', 'flex justify-start': msg.sender === 'bot'}">
          <div [ngClass]="{
            'bg-white rounded-tr-xl rounded-bl-xl rounded-br-xl shadow-sm': msg.sender === 'bot',
            'bg-[#dcf8c6] rounded-tl-xl rounded-bl-xl rounded-br-xl shadow-md': msg.sender === 'user'
          }" class="max-w-[85%] p-3 relative group">
            
            <div *ngIf="msg.type === 'file'" class="mb-2 p-2 bg-black/5 rounded-lg border border-black/10 flex items-center gap-2">
              <span class="text-2xl">📄</span>
              <div class="overflow-hidden">
                <p class="text-xs font-bold truncate">{{ msg.text }}</p>
                <p class="text-[10px] text-gray-500 uppercase tracking-tighter">Documento PDF/JPG</p>
              </div>
            </div>

            
            <p *ngIf="msg.type === 'text'" class="text-sm text-gray-800 leading-relaxed">{{ msg.text }}</p>

            <div *ngIf="msg.type === 'options'" class="mt-3 space-y-2">
                <p class="text-sm text-gray-800 font-medium mb-2">{{ msg.text }}</p>
                <button *ngFor="let opt of msg.options" 
                        (click)="handleOptionClick(opt)"
                        class="w-full text-left p-2.5 text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 text-xs font-semibold transition-all">
                    {{ opt }}
                </button>
            </div>

            <p class="text-[9px] text-gray-400 text-right mt-1 font-medium">{{ msg.timestamp | date:'HH:mm' }}</p>
          </div>
        </div>
      </div>

      <div class="bg-[#f0f0f0] p-3 flex items-center gap-2 border-t border-gray-200">
        <button (click)="fileInput.click()" 
                class="text-gray-500 hover:text-gray-700 p-2 transition-colors active:scale-90"
                title="Adjuntar documento">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>
        
        <input #fileInput type="file" class="hidden" (change)="onFileSelected($event)">

        <input [(ngModel)]="userInput" (keyup.enter)="sendMessage()"
               placeholder="Escribe un mensaje..."
               class="flex-1 px-4 py-2.5 rounded-full border-none focus:ring-1 focus:ring-[#075e54] shadow-inner text-sm outline-none">
        
        <button (click)="sendMessage()" 
                [disabled]="!userInput.trim()"
                class="bg-[#075e54] text-white p-2.5 rounded-full w-11 h-11 flex items-center justify-center shadow-lg hover:bg-[#128c7e] disabled:bg-gray-400 transition-all active:scale-95">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 fill-current" viewBox="0 0 20 20">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>
    </div>
  `
})
export class SimulatorComponent implements OnInit {
  chatService = inject(ChatSimulatorService);
  trainingService = inject(TrainingService);
  userInput = '';

  ngOnInit() {
    this.chatService.initChat();
  }

  sendMessage() {
    if (!this.userInput.trim()) return;
    this.chatService.processMessage(this.userInput, 'text');
    this.userInput = '';
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.chatService.processMessage(file.name, 'file');
      // Reset input para permitir subir el mismo archivo después si es necesario
      event.target.value = '';
    }
  }

  handleOptionClick(option: string) {
  // Simula que el usuario escribió la opción seleccionada
    const optionNumber = option.trim().charAt(0); 
    this.chatService.processMessage(optionNumber, 'text');
  }

  procesarRespuestaDelUsuario(mensaje: string, usuarioDni: string) {
    const preguntaActual = "¿Qué EPPS son obligatorios?";
    const esCorrecta = mensaje.toLowerCase().includes('casco');
    const feedbackIA = esCorrecta 
      ? "¡Excelente! Has identificado el equipo correctamente." 
      : "Incorrecto. Recuerda que según la norma G.050 el casco y botas son obligatorios. Revisa el módulo de Seguridad.";

    this.trainingService.registrarEventoCapacitacion(
      usuarioDni, 
      preguntaActual, 
      mensaje, 
      esCorrecta, 
      feedbackIA,
      ''
    );
  }

}