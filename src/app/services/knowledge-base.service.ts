import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class KnowledgeBaseService {
  // Inyectamos el ID de la plataforma para saber si es navegador o servidor
  private platformId = inject(PLATFORM_ID);
  private readonly TRAIN_KEY = 'kb_training_v1';

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

  private loadTraining(): KBTraining[] {
    if (!isPlatformBrowser(this.platformId)) return [];
    const raw = localStorage.getItem(this.TRAIN_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  private saveTraining(data: KBTraining[]) {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.setItem(this.TRAIN_KEY, JSON.stringify(data));
  }

  private normalize(text: string): string {
    return (text || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  teachAnswer(questionId: string, answer: string) {
    if (!isPlatformBrowser(this.platformId)) return;

    const training = this.loadTraining();
    const answerKey = this.normalize(answer);

    const exists = training.some(t => t.questionId === questionId && t.answerKey === answerKey);
    if (!exists) {
      training.unshift({ questionId, answerKey, fecha: new Date().toISOString() });
      this.saveTraining(training);
    }
  }

  isLearnedCorrect(questionId: string, answer: string): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;

    const training = this.loadTraining();
    const answerKey = this.normalize(answer);

    return training
      .filter(t => t.questionId === questionId)
      .some(t => answerKey === t.answerKey || answerKey.includes(t.answerKey) || t.answerKey.includes(answerKey));
  }
}

type KBTraining = {
  questionId: string;
  answerKey: string;
  fecha: string;
};
