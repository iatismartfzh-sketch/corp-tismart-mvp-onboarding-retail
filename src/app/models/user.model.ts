export type PerfilUsuario = 'COLABORADOR' | 'NO_COLABORADOR';
export interface UserLog {
  fecha?: Date;
  fechaString: string;
  evento: string;
  detalle: string;
  veredictoIA: 'CORRECTO' | 'INCORRECTO';
  feedbackIA: string;
  fueCorregido?: boolean;
  capacitacion?: string;
  questionId?: string;
  preguntaRaw?: string;
  respuestaRaw?: string;
}
export interface UserMock {
  id: string;
  dni: string;
  nombres: string;
  apellidos: string;
  email: string;
  ruc: string;
  estadoRuc: 'ACTIVO/HABIDO' | 'NO HABIDO' | 'INACTIVO';
  sistemaPensiones: 'AFP' | 'ONP' | 'PENDIENTE';
  hijos: number;
  documentosCargados: string[];
  progreso: 'DOCUMENTACION' | 'FIRMA' | 'CAPACITACION' | 'COMPLETADO' | 'REPROBADO' | 'EN REVISION';
  perfil: PerfilUsuario;
  documentos?: {
    dni_adjunto: 'PENDIENTE' | 'ENVIADO' | 'VALIDADO';
    ruc_adjunto: 'PENDIENTE' | 'ENVIADO' | 'VALIDADO';
    recibo_luz: 'PENDIENTE' | 'ENVIADO' | 'VALIDADO';
  };
  dniVencido: boolean;
  historial?: UserLog[];
}
