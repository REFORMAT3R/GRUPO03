import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private apiUrl = environment.apiUrl;
  private registrarUrl = `${environment.apiUrl}/doctores/registrar/`;

  constructor(private http: HttpClient) {}

  // ==========================
  // CONTROL DE EDICIÓN
  // ==========================

  private doctorEditar: any = null;

  setDoctorEditar(d: any) {
    this.doctorEditar = d;
  }

  getDoctorEditar() {
    return this.doctorEditar;
  }

  limpiarDoctorEditar() {
    this.doctorEditar = null;
  }

  // ==========================
  // CRUD DOCTOR
  // ==========================

  getDoctores(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/doctores/`);
  }

  crearDoctor(doctor: any): Observable<any> {
    return this.http.post<any>(this.registrarUrl, doctor);
  }

  actualizarDoctor(id: number, doctor: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/doctores/${id}/`, doctor);
  }

  eliminarDoctor(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/doctores/${id}/`);
  }
}