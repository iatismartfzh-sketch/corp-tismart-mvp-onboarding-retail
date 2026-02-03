// src/app/services/openai-examen.service.ts
import { Injectable } from '@angular/core';
import { EXAMENES_DUMMY } from '../data/mock-exam';

export interface PreguntaExamen {
  id: string;
  pregunta: string;
  keywords: string[];
  respuestaCorrecta: number;
  feedback: string;
}

@Injectable({ providedIn: 'root' })
export class OpenAIService {
  private readonly TTL = 6 * 60 * 60 * 1000; // 6 horas

  async generarExamenReal(titulo: string, paginas: string[]): Promise<PreguntaExamen[]> {
    const storageKey = `examen_${titulo.replace(/\s/g, '_')}`;
    const cached = localStorage.getItem(storageKey);

    // 1. Intentar cargar de LocalStorage (Persistencia de 6 horas)
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < this.TTL) {
        console.log(`📦 Cargando "${titulo}" desde caché local.`);
        return data;
      }
    }

    // 2. Si no hay caché o expiró, usamos nuestra "Base de Datos de Variables"
    console.log(`🧠 Generando "${titulo}" desde memoria local (Data Dummy de IA).`);
    let dataOffline: any[] = EXAMENES_DUMMY[titulo];

    if (!dataOffline) {
      throw new Error(`No se encontró contenido para el módulo: ${titulo}`);
    }

    // Guardamos en LocalStorage para simular el comportamiento de la API
    localStorage.setItem(storageKey, JSON.stringify({
      data: dataOffline,
      timestamp: Date.now()
    }));

    // Simulamos un pequeño retraso de "procesamiento de IA" para que se vea real
    return new Promise((resolve) => setTimeout(() => resolve(dataOffline), 1000));
  }
}
