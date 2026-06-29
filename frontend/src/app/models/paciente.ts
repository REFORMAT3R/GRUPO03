export interface Paciente {
  id?: number;
  dni: string;
  nombres: string;
  apellidos: string;
  fecha_nacimiento: string;
  sexo: string;
  telefono: string;
  fecha_registro?: string;
}