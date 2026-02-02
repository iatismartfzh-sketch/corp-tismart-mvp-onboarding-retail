import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { USER_POOL } from '../data/user-pool';
import { UserLog } from '../models/user.model';
import { PDF_DATA } from '../data/mock-pdf-data';

@Injectable({ providedIn: 'root' })
export class TrainingService {

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private modules = [
    { id: 0, titulo: 'Ciberseguridad Corporativa 2026', paginas: PDF_DATA.CIBERSEGURIDAD },
    { id: 1, titulo: 'Hostigamiento Sexual Laboral', paginas: PDF_DATA.HOSTIGAMIENTO },
    { id: 2, titulo: 'Sostenibilidad y Residuos', paginas: PDF_DATA.SOSTENIBILIDAD }
  ];

  private modulesSchedule = [
    { id: 0, titulo: 'Herramienta IA para Developers', paginas: PDF_DATA.IADEVELOPER }
  ];

  constructor() {
    this.cargarPoolDesdeStorage();
  }

  private cargarPoolDesdeStorage() {
    if (this.isBrowser) {
      const saved = localStorage.getItem('RETAIL_USER_DB');
      if (saved) {
        const data = JSON.parse(saved);
        USER_POOL.length = 0; 
        USER_POOL.push(...data);
      }
    }
  }

  getModulesList(): any[] {
    return this.modules.map(m => m.titulo);
  }

  getManual(index: number) {
    return (index >= 3) ? this.modulesSchedule[0] : this.modules[index];
  }

  /**
   * REGISTRO DE EVENTOS:
   * Guarda cada interacción del examen en el historial del usuario.
   */
  registrarEventoCapacitacion(
    dni: string, 
    pregunta: string, 
    respuestaUsuario: string, 
    esCorrecta: boolean, 
    feedbackIA: string,
    modulo: string
  ) {
    const usuario = USER_POOL.find(u => u.dni === dni);
    if (usuario) {

      // Inicializamos el historial si no existe
      if (!usuario.historial) {
        usuario.historial = [];
      }

      const nuevoLog: UserLog = {
        fecha: new Date(),
        fechaString: new Date().toLocaleString('es-PE', { 
          day: '2-digit', 
          month: 'short', 
          hour: '2-digit', 
          minute: '2-digit' 
        }).toUpperCase(),
        evento: 'EXAMEN_IA',
        detalle: `Pregunta: ${pregunta} | Respuesta: "${respuestaUsuario}"`,
        veredictoIA: esCorrecta ? 'CORRECTO' : 'INCORRECTO',
        feedbackIA: esCorrecta ? '' : feedbackIA,
        fueCorregido: false,
        capacitacion: modulo
      };

      // Se inserta al inicio para que en el dashboard aparezca lo más reciente primero
      usuario.historial.unshift(nuevoLog);

      if (this.isBrowser) {
        localStorage.setItem('RETAIL_USER_DB', JSON.stringify(USER_POOL));
      }

      console.log(`Log registrado para ${usuario.nombres}:`, nuevoLog);
    }
  }
}