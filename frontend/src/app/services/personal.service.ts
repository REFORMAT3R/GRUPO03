import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Personal } from '../models/personal';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  private apiUrl = environment.apiUrl;
  private registrarUrl = `${environment.apiUrl}/personal/registrar/`;

  constructor(private http: HttpClient) {}

  // ==========================
  // Control de edición
  // ==========================

  private personalEditar: Personal | null = null;

  setPersonalEditar(p: Personal) {
    this.personalEditar = p;
  }

  getPersonalEditar() {
    return this.personalEditar;
  }

  limpiarPersonalEditar() {
    this.personalEditar = null;
  }

  // ==========================
  // CRUD
  // ==========================

  getPersonal(): Observable<Personal[]> {
    return this.http.get<Personal[]>(`${this.apiUrl}/personal/`);
  }

  registrarPersonal(datos: {
    username: string;
    password: string;
    email: string;
    nombres: string;
    apellidos: string;
    rol: 'ADMIN' | 'RECEPCION';
    telefono: string;
  }): Observable<any> {
    return this.http.post<any>(this.registrarUrl, datos);
  }

  actualizarPersonal(id: number, personal: Personal): Observable<Personal> {
    return this.http.put<Personal>(`${this.apiUrl}/personal/${id}/`, personal);
  }

  eliminarPersonal(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/personal/${id}/`);
  }
}