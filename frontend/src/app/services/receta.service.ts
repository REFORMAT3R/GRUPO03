import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Receta } from '../models/receta';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private recetaEditar: Receta | null = null;

  setRecetaEditar(r: Receta): void {
    this.recetaEditar = r;
  }

  getRecetaEditar(): Receta | null {
    return this.recetaEditar;
  }

  limpiarRecetaEditar(): void {
    this.recetaEditar = null;
  }

  getRecetas(): Observable<Receta[]> {
    return this.http.get<Receta[]>(`${this.apiUrl}/recetas/`);
  }

  getRecetasPorConsulta(consultaId: number): Observable<Receta[]> {
    return new Observable<Receta[]>(observer => {
      this.getRecetas().subscribe({
        next: (recetas) => {
          observer.next(recetas.filter(r => r.consulta === consultaId));
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }

  crearReceta(receta: Receta): Observable<Receta> {
    return this.http.post<Receta>(`${this.apiUrl}/recetas/`, receta);
  }

  actualizarReceta(id: number, receta: Receta): Observable<Receta> {
    return this.http.put<Receta>(`${this.apiUrl}/recetas/${id}/`, receta);
  }

  eliminarReceta(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/recetas/${id}/`);
  }

  private consultaParaReceta: any = null;

  setConsultaRecetaCrear(id: number) {
    this.consultaParaReceta = id;
  }

  getConsultaRecetaCrear() {
    return this.consultaParaReceta;
  }

  limpiarConsultaRecetaCrear() {
    this.consultaParaReceta = null;
  }
}