import { Injectable } from '@angular/core';
import { UserMock } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class ExportService {
  downloadTRegistro(users: UserMock[]) {
    // Definición de cabeceras según requerimiento técnico [cite: 137]
    const headers = ['Tipo_Doc', 'Numero_Doc', 'Nombres', 'Apellidos', 'RUC', 'Estado_SUNAT', 'Pension', 'Hijos'];
    
    const rows = users.map(u => [
      '01', // DNI
      u.dni,
      u.nombres,
      u.apellidos,
      u.ruc,
      u.estadoRuc,
      u.sistemaPensiones,
      u.hijos
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(e => e.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `T-REGISTRO_RETAIL_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}