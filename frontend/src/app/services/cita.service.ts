import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cita } from '../models/cita';
import { Paciente } from '../models/paciente';
import { Doctor } from '../models/doctor';

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

  getPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>('http://localhost:8000/api/pacientes/');
  }

  getDoctores(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>('http://localhost:8000/api/doctores/');
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