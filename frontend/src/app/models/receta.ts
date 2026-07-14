export interface Receta {
  id?: number;
  consulta: number;
  medicamento: string;
  dosis: string;
  frecuencia: string;
  duracion: string;
  indicaciones?: string;
}