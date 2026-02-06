import { UserMock } from '../models/user.model';

export let USER_POOL: UserMock[] = [
  {
    id: 'USR-101',
    dni: '46423657',
    nombres: 'Juan',
    apellidos: 'Zavala Quispe',
    email: 'juan@retail.pe',
    ruc: '10464236576',
    estadoRuc: 'ACTIVO/HABIDO',
    sistemaPensiones: 'AFP',
    hijos: 0,
    documentosCargados: [],
    progreso: 'CAPACITACION',
    perfil: 'COLABORADOR', // Juan es Colaborador
    dniVencido: false
  },
  {
    id: 'USR-102',
    dni: '46657500',
    nombres: 'Maria',
    apellidos: 'Henriquez Garcia',
    email: 'maria@retail.pe',
    ruc: '10466575006',
    estadoRuc: 'ACTIVO/HABIDO',
    sistemaPensiones: 'ONP',
    hijos: 1,
    documentosCargados: [],
    progreso: 'CAPACITACION',
    perfil: 'COLABORADOR', // Maria es Colaborador
    dniVencido: false
  },
  {
    id: 'USR-103',
    dni: '47865545',
    nombres: 'Augusto',
    apellidos: 'Castillo Campos',
    email: 'augusto.campos@hotmail.com',
    ruc: '10478655456',
    estadoRuc: 'ACTIVO/HABIDO',
    sistemaPensiones: 'PENDIENTE',
    hijos: 0,
    documentosCargados: [],
    progreso: 'DOCUMENTACION',
    perfil: 'NO_COLABORADOR',
    dniVencido: false,
    documentos: {
      dni_adjunto: 'PENDIENTE',
      ruc_adjunto: 'PENDIENTE',
      recibo_luz: 'PENDIENTE'
    }
  },
  {
    id: 'USR-104',
    dni: '43567894',
    nombres: 'Julio',
    apellidos: 'Sarmiento Sanchez',
    email: 'julio.sanchez@hotmail.com',
    ruc: '10435678946',
    estadoRuc: 'ACTIVO/HABIDO',
    sistemaPensiones: 'PENDIENTE',
    hijos: 0,
    documentosCargados: [],
    progreso: 'DOCUMENTACION',
    perfil: 'NO_COLABORADOR',
    dniVencido: false,
    documentos: {
      dni_adjunto: 'PENDIENTE',
      ruc_adjunto: 'PENDIENTE',
      recibo_luz: 'PENDIENTE'
    }
  }
];

export let USER_POOL_NOTIFY: UserMock[] = [
  {
    id: 'USR-101',
    dni: '46423657',
    nombres: 'Juan',
    apellidos: 'Zavala Quispe',
    email: 'juan@retail.pe',
    ruc: '10464236576',
    estadoRuc: 'ACTIVO/HABIDO',
    sistemaPensiones: 'AFP',
    hijos: 0,
    documentosCargados: [],
    progreso: 'CAPACITACION',
    perfil: 'COLABORADOR', // Juan es Colaborador
    dniVencido: false
  },
  {
    id: 'USR-102',
    dni: '46657500',
    nombres: 'Maria',
    apellidos: 'Henriquez Garcia',
    email: 'maria@retail.pe',
    ruc: '10466575006',
    estadoRuc: 'ACTIVO/HABIDO',
    sistemaPensiones: 'ONP',
    hijos: 1,
    documentosCargados: [],
    progreso: 'CAPACITACION',
    perfil: 'COLABORADOR', // Maria es Colaborador
    dniVencido: false
  },
  {
    id: 'USR-103',
    dni: '47865545',
    nombres: 'Augusto',
    apellidos: 'Castillo Campos',
    email: 'augusto.campos@hotmail.com',
    ruc: '10478655456',
    estadoRuc: 'ACTIVO/HABIDO',
    sistemaPensiones: 'PENDIENTE',
    hijos: 0,
    documentosCargados: [],
    progreso: 'EN REVISION',
    perfil: 'NO_COLABORADOR',
    dniVencido: false,
    documentos: {
      dni_adjunto: 'ENVIADO',
      ruc_adjunto: 'ENVIADO',
      recibo_luz: 'ENVIADO'
    }
  },
  {
    id: 'USR-104',
    dni: '43567894',
    nombres: 'Julio',
    apellidos: 'Sarmiento Sanchez',
    email: 'julio.sanchez@hotmail.com',
    ruc: '10435678946',
    estadoRuc: 'ACTIVO/HABIDO',
    sistemaPensiones: 'PENDIENTE',
    hijos: 0,
    documentosCargados: [],
    progreso: 'EN REVISION',
    perfil: 'NO_COLABORADOR', // El Proveedor es NO Colaborador
    dniVencido: false,
    documentos: {
      dni_adjunto: 'ENVIADO',
      ruc_adjunto: 'ENVIADO',
      recibo_luz: 'ENVIADO'
    }
  }
];
