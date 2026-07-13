import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
import { Personal } from '../models/personal';
 
@Injectable({
  providedIn: 'root'
})
export class PersonalService {
 
  private apiUrl = 'http://localhost:8000/api/personal/';
  private registrarUrl = 'http://localhost:8000/api/personal/registrar/';
 
  constructor(private http: HttpClient) {}
 
  getPersonal(): Observable<Personal[]> {
    return this.http.get<Personal[]>(this.apiUrl);
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
    return this.http.put<Personal>(`${this.apiUrl}${id}/`, personal);
  }
 
  eliminarPersonal(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}