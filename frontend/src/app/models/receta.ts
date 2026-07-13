export interface Receta {
  id?: number;
  medicamento: string;
  dosis: string;
  frecuencia: string;
  duracion: string;
  indicaciones?: string;
  consulta: number;
}