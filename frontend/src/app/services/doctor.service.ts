import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private apiUrl = 'http://localhost:8000/api/doctores/'; 

  constructor(private http: HttpClient) { }

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

  // GET: Obtener todos los doctores
  getDoctores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // POST: Registrar un nuevo doctor
  crearDoctor(doctor: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, doctor);
  }

  // PUT: Actualizar un doctor existente
  actualizarDoctor(id: number, doctor: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}/`, doctor);
  }

  // DELETE: Eliminar un doctor
  eliminarDoctor(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}/`);
  }
}