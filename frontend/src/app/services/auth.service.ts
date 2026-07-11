import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = 'http://localhost:8000/api/login/'; 

  constructor(private http: HttpClient) {}

  iniciarSesion(credenciales: { usuario: string, password: string }) {
    return this.http.post(this.apiUrl, credenciales);
  }
}