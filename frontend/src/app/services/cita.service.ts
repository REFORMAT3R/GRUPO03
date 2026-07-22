import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cita } from '../models/cita';
import { Paciente } from '../models/paciente';
import { Doctor } from '../models/doctor';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  private apiUrl = environment.apiUrl;

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
    return this.http.get<Cita[]>(`${this.apiUrl}/citas/`);
  }

  getPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.apiUrl}/pacientes/`);
  }

  getDoctores(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.apiUrl}/doctores/`);
  }

  crearCita(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(`${this.apiUrl}/citas/`, cita);
  }

  actualizarCita(id: number, cita: Cita): Observable<Cita> {
    return this.http.put<Cita>(`${this.apiUrl}/citas/${id}/`, cita);
  }

  eliminarCita(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/citas/${id}/`);
  }
}