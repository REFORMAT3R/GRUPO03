export interface Personal {
  id?: number;

  // Datos del usuario de Django
  username: string;
  password?: string;
  email: string;

  // Datos del personal
  nombres: string;
  apellidos: string;
  rol: 'ADMIN' | 'RECEPCION';
  telefono: string;
}