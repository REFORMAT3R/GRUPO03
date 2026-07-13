export interface Personal {
  id?: number;
  usuario: number;
  nombres: string;
  apellidos: string;
  rol: 'ADMIN' | 'RECEPCION';
  telefono: string;
}