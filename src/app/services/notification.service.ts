import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs';

export interface AppNotification {
  user: string;
  msg: string;
  time: Date;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  // Creamos el canal de comunicación
  private notificationSubject = new Subject<AppNotification>();
  
  // Exponemos el canal como un Observable para que otros se suscriban
  notifications$ = this.notificationSubject.asObservable();

  private platformId = inject(PLATFORM_ID);

  constructor() {
    // ESCUCHAR CAMBIOS DESDE OTRAS PESTAÑAS
   if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('storage', (event) => {
        if (event.key === 'app_notification' && event.newValue) {
          const data = JSON.parse(event.newValue);
          console.log('--- EVENTO STORAGE DETECTADO ---', data);
          this.notificationSubject.next(data);
        }
      });
    }
  }

  push(user: string, msg: string) {
    const payload = { user, msg, time: new Date() };
    console.log('--- PASO 2: Guardando en LocalStorage ---', payload);
    
    // Guardar en storage para notificar a otras pestañas
    localStorage.setItem('app_notification', JSON.stringify(payload));
    
    // Limpiar inmediatamente para permitir que el mismo mensaje se envíe después
    setTimeout(() => localStorage.removeItem('app_notification'), 100);
    
    // Notificar también a la pestaña actual
    this.notificationSubject.next(payload);
  }
}