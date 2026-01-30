export type PerfilUsuario = 'COLABORADOR' | 'NO_COLABORADOR';
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
  perfil: PerfilUsuario; // <--- Nuevo campo
  documentos?: {        // <--- Nuevo objeto para No Colaboradores
    dni_adjunto: 'PENDIENTE' | 'ENVIADO' | 'VALIDADO';
    ruc_adjunto: 'PENDIENTE' | 'ENVIADO' | 'VALIDADO';
    recibo_luz: 'PENDIENTE' | 'ENVIADO' | 'VALIDADO';
  };
  dniVencido: boolean;
}