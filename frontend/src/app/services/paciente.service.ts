import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Paciente } from '../models/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private pacienteEdit: Paciente | null = null;

  setPacienteEditar(p: Paciente) {
    this.pacienteEdit = p;
  }

  getPacienteEditar() {
    return this.pacienteEdit;
  }

  limpiarPacienteEditar() {
    this.pacienteEdit = null;
  }
  getDoctores(): Observable<any[]>{
  return this.http.get<any[]>(`${this.apiUrl}/doctores/`);  
  }
  
  getPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.apiUrl}/pacientes/`);
  }

  crearPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.apiUrl}/pacientes/`, paciente);
  }

  actualizarPaciente(id: number, paciente: Paciente): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.apiUrl}/pacientes/${id}/`, paciente);
  }

  eliminarPaciente(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/pacientes/${id}/`);
  }
}