
import { Injectable, signal, inject } from '@angular/core';
import { USER_POOL } from '../data/user-pool';
import { UserMock } from '../models/user.model';
import { TrainingService } from './training.service';
import { NotificationService } from './notification.service';
import { OpenAIService, PreguntaExamen } from './openai-examen.service';
import { KnowledgeBaseService } from './knowledge-base.service';

export type ChatState = 'AWAITING_LEGAL' | 'AWAITING_DNI' | 'DOCUMENTING' | 'TRAINING' | 'AWAITING_DOCS' | 'IDLE';
export type TrainingStep = 'MENU' | 'READING' | 'EXAM' | 'PUSH_READING';

export interface Message {
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
  type: 'text' | 'file' | 'options';
  options?: string[];
}

@Injectable({ providedIn: 'root' })
export class ChatSimulatorService {
  messages = signal<Message[]>([]);
  currentUser = signal<UserMock | null>(null);
  currentState = signal<ChatState>('AWAITING_LEGAL');

  private currentTrainingStep = signal<TrainingStep>('MENU');
  private docStep = signal<'DNI' | 'RUC' | 'LUZ' | 'FIN'>('DNI');
  private currentModuleIndex = 0;
  private aciertosExamen = 0;

  private trainingService = inject(TrainingService);
  private notifService = inject(NotificationService);
  private openAIService = inject(OpenAIService);
  private kbService = inject(KnowledgeBaseService);

  private examenActual: PreguntaExamen[] = [];
  private indexActual = 0;

  private isPushFlow = false;

  private module: string = '';

  initChat() {
    // Reset state for a fresh chat session
    this.currentUser.set(null);
    this.currentState.set('AWAITING_LEGAL');
    this.currentTrainingStep.set('MENU');
    this.docStep.set('DNI');
    this.currentModuleIndex = 0;
    this.aciertosExamen = 0;
    this.examenActual = [];
    this.indexActual = 0;
    this.isPushFlow = false;
    this.module = '';

    this.messages.set([
      { text: '¡Hola! Bienvenido al proceso de Onboarding de Retailer Peruano. 🇵🇪', sender: 'bot', timestamp: new Date(), type: 'text' },
      { text: '¿Aceptas nuestra política de protección de datos (Ley 29733)? (Responde: SI)', sender: 'bot', timestamp: new Date(), type: 'text' }
    ]);
  }

  processMessage(content: string, type: 'text' | 'file' = 'text') {
    const userMsg: Message = { text: content, sender: 'user', timestamp: new Date(), type: type };
    this.messages.update(prev => [...prev, userMsg]);
    setTimeout(() => this.logicEngine(content, type), 800);
  }

  private logicEngine(input: string, type: 'text' | 'file') {
    const text = input.toUpperCase().trim();

    if (type === 'file') {
      this.handleFileProcessing(input);
      return;
    }

    switch (this.currentState()) {
      case 'AWAITING_LEGAL':
        if (text.includes('SI')) {
          this.currentState.set('AWAITING_DNI');
          this.addBotMsg('¡Gracias! Ahora, ingresa tu número de DNI (8 dígitos).');
        } else {
          this.addBotMsg('❌ No puedes continuar sin aceptar la política. Responde **SI** para continuar.');
        }
        break;

      case 'AWAITING_DNI':
        const dniInput = input.trim();
        const isValidDni = /^\d{8}$/.test(dniInput);
        if (!isValidDni) {
          this.addBotMsg('❌ DNI inválido. Ingresa un DNI de 8 dígitos.');
          return;
        }

        const found = USER_POOL.find(u => u.dni === dniInput);
        if (found) {
          this.currentUser.set(found);
          let hasPush = false;
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('active_chat_dni', found.dni);
            hasPush = this.checkPendingPush(found.dni);
          }

          if (found.perfil === 'NO_COLABORADOR') {
            this.currentState.set('AWAITING_DOCS');
            this.docStep.set('DNI');
            this.addBotMsg(`Hola ${found.nombres}, como Proveedor necesitamos tu documentación. Por favor, adjunta tu **DNI**.`);
          } else if (!hasPush) {
            this.currentState.set('TRAINING');
            this.addBotMsg(`Hola ${found.nombres}. He activado tu panel de capacitaciones.`);
            this.prepararExamenesConIA();
            this.mostrarMenuCapacitaciones();
          }

          this.notifService.push(found.nombres, 'Se identificó en el simulador');

        } else {
          this.addBotMsg('❌ DNI no encontrado. Vuelve a intentar.');
        }
        break;

      case 'AWAITING_DOCS':
        this.addBotMsg('Por favor, utiliza el clip 📎 para adjuntar el documento solicitado.');
        break;
      case 'TRAINING':
        this.handleTrainingLogic(input);
        break;

      default:
        if (text.includes('ENTRENAMIENTO')) {
          this.currentState.set('TRAINING');
          this.currentTrainingStep.set('MENU');
          this.startTrainingMenu();
        } else {
          this.addBotMsg('¿Deseas iniciar el "ENTRENAMIENTO"?');
        }
        break;
    }
  }

  private handleTrainingLogic(input: string) {
    const text = input.toUpperCase().trim();
    const step = this.currentTrainingStep();

    if (step === 'PUSH_READING') {
      if (text === 'SI') {
        this.indexActual = 0;
        this.aciertosExamen = 0;
        this.addBotMsg("🚀 ¡Excelente! Iniciamos la evaluación. Recuerda que se aprueba con **90%**.");
        this.iniciarCapacitacionConIA(this.currentModuleIndex);
      } else {
        this.addBotMsg("Por favor, confirma con un **'SI'** cuando estés listo.");
      }
      return;
    }

    // Mantener tu lógica anterior para MENU, READING y EXAM
    if (step === 'MENU') {
      const index = parseInt(input) - 1;
      if (index >= 0 && index < 3) {
        this.currentModuleIndex = index;
        this.iniciarCapacitacionConIA(index);
      }
    } else if (step === 'READING') {
      this.lanzarPreguntaIA();
    } else if (step === 'EXAM') {
      this.procesarRespuestaIA(input);
    }
  }


  private startTrainingMenu() {
    this.messages.update(prev => [...prev, {
        text: 'Elige una capacitación:',
        sender: 'bot',
        timestamp: new Date(),
        type: 'options',
        options: ['1. Uso de Caja y POS', '2. Seguridad y Salud (SST)', '3. Prevención de Pérdidas']
    }]);
  }

  private addBotMsg(txt: string) {
    this.messages.update(prev => [...prev, { text: txt, sender: 'bot', timestamp: new Date(), type: 'text' }]);
  }


  private handleFileProcessing(input: string) {
    const user = this.currentUser();
    const fileName = input.trim();

    // Si no es colaborador, seguimos el flujo de checklist
    if (user?.perfil === 'NO_COLABORADOR') {
      const step = this.docStep();
      if (step === 'FIN') {
        this.addBotMsg('✅ Tu expediente ya está completo. Si necesitas actualizar un documento, comunícate con RR.HH.');
        return;
      }
      const validation = this.validateDocumento(fileName, step, user.dni);
      if (!validation.ok) {
        if (validation.shouldLog) {
          this.trainingService.registrarEventoDocumento(
            user.dni,
            step,
            fileName,
            'INCORRECTO',
            validation.error,
            validation.prefijoNormalizado
          );
        }
        this.addBotMsg(`❌ ${validation.error}`);
        this.addBotMsg(`Tu documento debe mantener el siguiente formato: **${validation.example}**`);
        return;
      }

      this.addBotMsg(`Analizando documento: ${fileName}...`);

      setTimeout(() => {
        if (step === 'DNI') {
          user.documentos!.dni_adjunto = 'ENVIADO'; // Actualiza el modelo
          this.trackDocumentoCargado(user, fileName);
          this.trainingService.registrarEventoDocumento(user.dni, 'DNI', fileName);
          this.notifService.push(user.nombres, 'Subió DNI 🪪'); // Dispara notificación
          this.docStep.set('RUC');
          this.addBotMsg('✅ DNI verificado. Ahora, por favor adjunta tu **Ficha RUC**.');
        }
        else if (step === 'RUC') {
          user.documentos!.ruc_adjunto = 'ENVIADO';
          this.trackDocumentoCargado(user, fileName);
          this.trainingService.registrarEventoDocumento(user.dni, 'RUC', fileName);
          this.notifService.push(user.nombres, 'Subió RUC 📄');
          this.docStep.set('LUZ');
          this.addBotMsg('✅ RUC verificado. Finalmente, adjunta tu **Recibo de Luz**.');
        }
        else if (step === 'LUZ') {
          user.documentos!.recibo_luz = 'ENVIADO';
          this.trackDocumentoCargado(user, fileName);
          this.trainingService.registrarEventoDocumento(user.dni, 'LUZ', fileName);
          user.progreso = 'EN REVISION'; // Finaliza el estado general
          this.notifService.push(user.nombres, 'Completó carga de archivos ✅');
          this.docStep.set('FIN');
          this.currentState.set('IDLE');
          this.addBotMsg('✅ ¡Excelente! Tu expediente está completo y listo para revisión.');
        }
      }, 1500);
    } else {
      // Comportamiento original para Colaboradores
      const lowerName = fileName.toLowerCase();
      this.addBotMsg(`Analizando: ${fileName}...`);
      setTimeout(() => {
        if (lowerName.includes('dni')) this.addBotMsg('✅ DNI verificado.');
        else this.addBotMsg('📄 Archivo recibido.');
      }, 2000);
    }
  }

  private validateDocumento(fileName: string, step: 'DNI' | 'RUC' | 'LUZ', dni: string) {
    const spec = this.getDocumentoSpec(step, dni);
    const lower = fileName.toLowerCase();
    const expectedExt = spec.ext;

    if (!lower.endsWith(expectedExt)) {
      return {
        ok: false,
        error: `Formato inválido. El archivo debe ser ${expectedExt.toUpperCase().replace('.', '')}.`,
        example: spec.example,
        shouldLog: false
      };
    }

    if (!lower.includes(dni)) {
      return {
        ok: false,
        error: `Número de DNI inválido. Vuelva intentarlo, porfavor DNI: ${dni}.`,
        example: spec.example,
        shouldLog: false
      };
    }

    const normalizedPrefix = this.normalizarPrefijo(fileName, dni, expectedExt);
    const expectedNormalized = this.normalizarPrefijo(spec.prefix, dni, '');
    const learned = this.trainingService.getPrefijosAprendidos(step);
    const hasLearned = learned.includes(normalizedPrefix);

    if (normalizedPrefix !== expectedNormalized && !hasLearned) {
      return {
        ok: false,
        error: 'Prefijo no reconocido. Se registró para aprendizaje. Intentalo nuevamente, Porfavor.',
        example: spec.example,
        shouldLog: true,
        prefijoNormalizado: normalizedPrefix
      };
    }

    return { ok: true, example: spec.example, shouldLog: false };
  }

  private getDocumentoSpec(step: 'DNI' | 'RUC' | 'LUZ', dni: string) {
    if (step === 'DNI') {
      return { prefix: `DNI_${dni}`, ext: '.jpg', example: `DNI_${dni}.jpg` };
    }
    if (step === 'RUC') {
      return { prefix: `RUC_${dni}`, ext: '.pdf', example: `RUC_${dni}.pdf` };
    }
    return { prefix: `LUZ_${dni}`, ext: '.pdf', example: `LUZ_${dni}.pdf` };
  }

  private trackDocumentoCargado(user: UserMock, fileName: string) {
    if (!user.documentosCargados) {
      user.documentosCargados = [];
    }
    if (!user.documentosCargados.includes(fileName)) {
      user.documentosCargados.push(fileName);
    }
  }

  private normalizarPrefijo(fileName: string, dni: string, ext: string) {
    let base = fileName;
    if (ext && base.toLowerCase().endsWith(ext)) {
      base = base.slice(0, -ext.length);
    }
    const dniIndex = base.indexOf(dni);
    if (dniIndex >= 0) {
      base = base.slice(0, dniIndex);
    }
    return base.toLowerCase().replace(/[^a-z]/g, '');
  }


  async iniciarCapacitacionConIA(idModulo: number) {
    const manual = this.trainingService.getManual(idModulo);
    this.addBotMsg("🤖 Conectando con IA para procesar el material...");
    this.module = manual.titulo;
    try {
      this.examenActual = await this.openAIService.generarExamenReal(manual.titulo, manual.paginas);
      this.indexActual = 0;
      this.presentarPregunta();
    } catch (error) {
      this.addBotMsg("❌ Error al conectar con el motor de IA.");
    }
  }

private presentarPregunta() {
  const manual = this.trainingService.getManual(this.currentModuleIndex);
  const textoPagina = manual.paginas[this.indexActual];

  this.addBotMsg(`📖 **PÁGINA ${this.indexActual + 1} DE 10**`);
  this.addBotMsg(`_${textoPagina}_`);

  // Cambiamos el estado a READING
  this.currentTrainingStep.set('READING');

  setTimeout(() => {
    this.addBotMsg("Confirma con un **'ok'** o cualquier mensaje cuando termines de leer para iniciar la trivia de esta página. 👇");
  }, 800);
}

private lanzarPreguntaIA() {
  const item = this.examenActual[this.indexActual];

  this.addBotMsg(`❓ **EVALUACIÓN PÁG. ${this.indexActual + 1}:**`);
  this.addBotMsg(`${item.pregunta}`);
  this.addBotMsg("_Responde escribiendo detalladamente lo que comprendiste..._");

  this.currentTrainingStep.set('EXAM');
}


async procesarRespuestaIA(inputUsuario: string) {

    const user = this.currentUser();
    const item = this.examenActual[this.indexActual];
    if (!user || !item) return;

    const respuestaUser = inputUsuario.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    const palabrasClave = (item.keywords || []).map(k => k.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
    const aciertosKeywords = palabrasClave.filter(word => respuestaUser.includes(word));

    const learnedCorrect = this.kbService.isLearnedCorrect(item.id, inputUsuario);
    const esCorrecto = learnedCorrect ? true : (aciertosKeywords.length >= 1);

    // === EL CAMBIO CLAVE: GUARDAR EN EL HISTORIAL ===
    this.trainingService.registrarEventoCapacitacion(
      user.dni,
      item.pregunta,
      inputUsuario,
      esCorrecto,
      item.feedback,
      this.module,
      item.id,
    );
    // ===============================================
    this.currentUser.set({ ...user });
    // 2. Tu lógica actual de feedback en el chat
    if (esCorrecto) {
      this.aciertosExamen++; // Sumamos al puntaje global
      this.addBotMsg(learnedCorrect
        ? "✅ **Respuesta correcta (aprendido por entrenamiento del admin).**"
        : "✅ **Respuesta correcta.**"
      );
    } else {
      this.addBotMsg(`❌ **Respuesta incorrecta.**`);
      this.addBotMsg(`💡 *Feedback:* ${item.feedback}`); // Mostramos la ayuda
    }

   this.indexActual++; // Avanzamos a la siguiente de las 10 páginas

    setTimeout(() => {
      if (this.indexActual < 10) {
        this.presentarPregunta(); // Siguiente página o pregunta
      } else {
        this.mostrarResumenFinal(); // Fin del examen
      }
    }, 1500);
  }

  private mostrarResumenFinal() {
    const porcentaje = (this.aciertosExamen / 10) * 100;
    const aprobado = porcentaje >= 90;

    this.addBotMsg("🏁 **EVALUACIÓN FINALIZADA**");
    this.addBotMsg(`📊 **Nota:** ${porcentaje}% (${this.aciertosExamen}/10).`);

    if (aprobado) {
      this.addBotMsg("✅ **Aprobado.** Tu registro ha sido actualizado en el Dashboard.");
      this.actualizarProgresoUsuario('COMPLETADO');
    } else {
      this.addBotMsg("❌ **Desaprobado.** Se ha notificado a RR.HH. sobre tu resultado.");
      this.actualizarProgresoUsuario('REPROBADO');
    }

    // Lógica de bifurcación de flujos:
    if (this.isPushFlow) {
      // FLUJO 2: WhatsApp RR.HH (Notificación)
      this.addBotMsg("Gracias por completar la capacitación asignada. ¡Buen día!");
      this.currentState.set('IDLE'); // El chat termina aquí
      this.isPushFlow = false; // Reset para futuras entradas
    } else {
      // FLUJO 1: Bot de Capacitaciones (Autogestión)
      this.addBotMsg("Regresando al menú principal...");
      this.indexActual = 0;
      this.aciertosExamen = 0;

      setTimeout(() => {
        this.currentTrainingStep.set('MENU');
        this.mostrarMenuCapacitaciones(); // Vuelve al menú de opciones
      }, 2000);
    }
  }

  private actualizarProgresoUsuario(estado: 'COMPLETADO' | 'REPROBADO') {
    const user = this.currentUser();
    if (user) {
      const userInPool = USER_POOL.find(u => u.dni === user.dni);
      if (userInPool) userInPool.progreso = estado;
      this.notifService.push(user.nombres, `Finalizó con ${estado} (${this.aciertosExamen}/10)`);
    }
  }


  private async prepararExamenesConIA() {
    const modulos = this.trainingService.getModulesList(); // ['Ciberseguridad Corporativa 2026', ...]

    for (const titulo of modulos) {
      // Esto llenará el LocalStorage con tu data dummy automáticamente
      try {
        await this.openAIService.generarExamenReal(titulo, []);
      } catch (e) {
        console.warn("Módulo no encontrado en mock-exams:", titulo);
      }
    }
  }

  private mostrarMenuCapacitaciones() {
    // 1. Llamamos al método sin argumentos para obtener el array de títulos
    // 2. Tipamos explícitamente (t: string, i: number) para eliminar el error TS7006
    const opciones = this.trainingService.getModulesList().map((t: string, i: number) => {
      return `${i + 1}. ${t}`;
    });

    this.messages.update(prev => [...prev, {
      text: 'Selecciona el módulo que deseas realizar hoy:',
      sender: 'bot',
      timestamp: new Date(),
      type: 'options',
      options: opciones
    }]);
  }

  private checkPendingPush(dni: string): boolean {
    const pending = localStorage.getItem(`pending_push_${dni}`);

    if (pending) {
      const { moduloId, mensaje } = JSON.parse(pending);

      // 1. Limpiamos el almacenamiento para que no salte cada vez que entra
      localStorage.removeItem(`pending_push_${dni}`);

      // 2. Marcamos que estamos en el flujo de WhatsApp Directo
      this.isPushFlow = true;
      this.currentModuleIndex = 3;
      this.currentState.set('TRAINING');
      this.currentTrainingStep.set('PUSH_READING'); // Nuevo paso de espera de "SI"

      // 3. Simulación de llegada de mensaje de RR.HH.
      setTimeout(() => {
        this.addBotMsg("🔔 **NOTIFICACIÓN DE RR.HH.**");
        this.addBotMsg(`_"${mensaje}"_`);

        // Enviamos el "Archivo"
        this.messages.update(prev => [...prev, {
          text: '📄 Guia_Capacitacion_Oficial.pdf',
          sender: 'bot',
          timestamp: new Date(),
          type: 'file'
        }]);

        setTimeout(() => {
          this.addBotMsg("¿Estás listo para iniciar la capacitación? (Recuerda leer el documento antes). Responde **'SI'** para empezar.");
        }, 1000);
      }, 1500);

      return true;
    }
    return false;
  }


}
