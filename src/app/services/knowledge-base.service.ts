import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class KnowledgeBaseService {
  // Inyectamos el ID de la plataforma para saber si es navegador o servidor
  private platformId = inject(PLATFORM_ID);

  private loadFromStorage(): any[] {
    // Solo ejecutamos localStorage si estamos en el navegador
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('kb_corrections');
      return saved ? JSON.parse(saved) : [];
    }
    return []; // Si es servidor, devolvemos array vacío
  }

  teachIA(evento: string, correccion: string) {
    if (isPlatformBrowser(this.platformId)) {
      const current = this.loadFromStorage();
      current.push({ evento, correccion, fecha: new Date() });
      localStorage.setItem('kb_corrections', JSON.stringify(current));
    }
  }
}