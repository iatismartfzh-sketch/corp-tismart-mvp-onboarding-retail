export interface ScheduledTraining {
  id: string;
  moduloId: number;
  targetDnis: string[];
  fechaEnvio: Date;
  mensajePersonalizado: string;
}