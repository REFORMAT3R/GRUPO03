export interface Cita {
  id?: number;
  fecha: string;
  hora: string;
  motivo: string;
  paciente: number;
  doctor: number;
  estado?: string;
}