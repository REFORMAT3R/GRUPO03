import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
 
export type Rol = 'DOCTOR' | 'ADMIN' | 'RECEPCION';
 
export interface PerfilUsuario {
  tipo: 'doctor' | 'personal';
  id: number;
  usuarioId: number;
  nombres: string;
  apellidos: string;
  rol: Rol;
}
 
interface TokenResponse {
  access: string;
  refresh: string;
}
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private http = inject(HttpClient);
  private router = inject(Router);
 
  private readonly tokenUrl = 'http://localhost:8000/api/token/';
  private readonly doctoresUrl = 'http://localhost:8000/api/doctores/';
  private readonly personalUrl = 'http://localhost:8000/api/personal/';
 
  perfil = signal<PerfilUsuario | null>(this.cargarPerfilGuardado());
 
  login(username: string, password: string): Observable<PerfilUsuario> {
    return this.http.post<TokenResponse>(this.tokenUrl, { username, password }).pipe(
      switchMap(res => {
        localStorage.setItem('access_token', res.access);
        localStorage.setItem('refresh_token', res.refresh);
        return this.resolverPerfil();
      })
    );
  }
 
  private resolverPerfil(): Observable<PerfilUsuario> {
    const payload = this.decodificarToken();
    const usuarioId = payload?.user_id;
 
    if (!usuarioId) {
      throw new Error('No se pudo leer el token recibido.');
    }
 
    return this.http.get<any[]>(this.doctoresUrl).pipe(
      switchMap(doctores => {
        const doctor = doctores.find(d => d.usuario === usuarioId);
 
        if (doctor) {
          const perfil: PerfilUsuario = {
            tipo: 'doctor',
            id: doctor.id,
            usuarioId,
            nombres: doctor.nombres,
            apellidos: doctor.apellidos,
            rol: 'DOCTOR'
          };
          this.guardarPerfil(perfil);
          return of(perfil);
        }
 
        return this.http.get<any[]>(this.personalUrl).pipe(
          switchMap(personal => {
            const p = personal.find(x => x.usuario === usuarioId);
 
            if (!p) {
              throw new Error('El usuario no tiene un perfil de doctor ni de personal asociado.');
            }
 
            const perfil: PerfilUsuario = {
              tipo: 'personal',
              id: p.id,
              usuarioId,
              nombres: p.nombres,
              apellidos: p.apellidos,
              rol: p.rol
            };
            this.guardarPerfil(perfil);
            return of(perfil);
          })
        );
      })
    );
  }
 
  private decodificarToken(): any | null {
    const token = localStorage.getItem('access_token');
    if (!token) return null;
 
    try {
      const payloadBase64 = token.split('.')[1];
      const normalizado = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(normalizado));
    } catch {
      return null;
    }
  }
 
  private guardarPerfil(perfil: PerfilUsuario): void {
    localStorage.setItem('perfil', JSON.stringify(perfil));
    this.perfil.set(perfil);
  }
 
  private cargarPerfilGuardado(): PerfilUsuario | null {
    const data = localStorage.getItem('perfil');
    return data ? JSON.parse(data) : null;
  }
 
  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }
 
  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }
 
  estaAutenticado(): boolean {
    return !!this.getAccessToken() && !!this.perfil();
  }
 
  getRol(): Rol | null {
    return this.perfil()?.rol ?? null;
  }
 
  rutaSegunRol(): string {
    switch (this.getRol()) {
      case 'DOCTOR': return '/doctor';
      case 'RECEPCION': return '/recepcionista';
      case 'ADMIN': return '/dashboard';
      default: return '/login';
    }
  }
 
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('perfil');
    this.perfil.set(null);
    this.router.navigate(['/login']);
  }
}