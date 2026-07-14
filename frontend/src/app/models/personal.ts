export interface Personal {
  id?: number;
  username: string;
  email: string;
  nombres: string;
  apellidos: string;
  rol: 'ADMIN' | 'RECEPCION';
  telefono: string;
}