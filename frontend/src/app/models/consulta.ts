export interface Consulta {
  id?: number;
  cita: number;
  diagnostico: string;
  tratamiento: string;
  medicamentos: string;
  observaciones?: string;
}