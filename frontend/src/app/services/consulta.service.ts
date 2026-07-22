import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  private apiUrl = environment.apiUrl; 

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