// src/app/services/push-training.service.ts
import { Injectable, inject } from '@angular/core';
import { ChatSimulatorService } from './chat-simulator.service';
import { NotificationService } from './notification.service';

@Injectable({ providedIn: 'root' })
export class PushTrainingService {
  private chatService = inject(ChatSimulatorService);
  private notifService = inject(NotificationService);

  enviarCapacitacionAMasivo(moduloId: number, dnis: string[], mensajeAdmin: string) {
  dnis.forEach(dni => {
    // Guardamos el "paquete" de capacitación en LocalStorage
    // Esto simula que el mensaje ya está en la base de datos de WhatsApp del usuario
    const pushData = {
      moduloId,
      mensaje: mensajeAdmin,
      timestamp: Date.now(),
      status: 'PENDING'
    };
    localStorage.setItem(`pending_push_${dni}`, JSON.stringify(pushData));
  });
}
}