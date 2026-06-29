import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cita } from '../models/cita';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  private apiUrl = 'http://localhost:8000/api/citas/';

  constructor(private http: HttpClient) {}

  private citaEditar: Cita | null = null;

  setCitaEditar(c: Cita) {
    this.citaEditar = c;
  }

  getCitaEditar() {
    return this.citaEditar;
  }

  limpiarCitaEditar() {
    this.citaEditar = null;
  }

  getCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.apiUrl);
  }

  crearCita(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(this.apiUrl, cita);
  }

  actualizarCita(id: number, cita: Cita): Observable<Cita> {
    return this.http.put<Cita>(`${this.apiUrl}${id}/`, cita);
  }

  eliminarCita(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}