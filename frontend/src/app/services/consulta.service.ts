import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  private apiUrl = 'http://localhost:8000/api/consultas/'; 

  constructor(private http: HttpClient) { }

  private consultaEditar: any = null;

  setConsultaEditar(c: any) { 
    this.consultaEditar = c; 
  }

  getConsultaEditar() { 
    return this.consultaEditar; 
  }

  limpiarConsultaEditar() { 
    this.consultaEditar = null; 
  }
  
  getConsultas(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  crearConsulta(consulta: any): Observable<any> {
    return this.http.post(this.apiUrl, consulta);
  }

  actualizarConsulta(id: number, consulta: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}/`, consulta);
  }

  eliminarConsulta(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}