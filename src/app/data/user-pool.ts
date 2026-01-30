import { UserMock } from '../models/user.model';

export let USER_POOL: UserMock[] = [
  {
    id: 'USR-101',
    dni: '11111111',
    nombres: 'Juan',
    apellidos: 'Quispe',
    email: 'juan@retail.pe',
    ruc: '10111111111',
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
    dni: '22222222',
    nombres: 'Maria',
    apellidos: 'Garcia',
    email: 'maria@retail.pe',
    ruc: '10222222222',
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
    dni: '33333333',
    nombres: 'Augusto',
    apellidos: 'Campos Campos',
    email: 'augusto.campos@hotmail.com',
    ruc: '20333333333',
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
    dni: '44444444',
    nombres: 'Julio',
    apellidos: 'Sanchez Sanchez',
    email: 'julio.sanchez@hotmail.com',
    ruc: '20333333333',
    estadoRuc: 'ACTIVO/HABIDO',
    sistemaPensiones: 'PENDIENTE',
    hijos: 0,
    documentosCargados: [],
    progreso: 'DOCUMENTACION',
    perfil: 'NO_COLABORADOR', // El Proveedor es NO Colaborador
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
    dni: '11111111',
    nombres: 'Juan',
    apellidos: 'Quispe',
    email: 'juan@retail.pe',
    ruc: '10111111111',
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
    dni: '22222222',
    nombres: 'Maria',
    apellidos: 'Garcia',
    email: 'maria@retail.pe',
    ruc: '10222222222',
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
    dni: '33333333',
    nombres: 'Augusto',
    apellidos: 'Campos Campos',
    email: 'augusto.campos@hotmail.com',
    ruc: '20333333333',
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
    dni: '44444444',
    nombres: 'Julio',
    apellidos: 'Sanchez Sanchez',
    email: 'julio.sanchez@hotmail.com',
    ruc: '20333333333',
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