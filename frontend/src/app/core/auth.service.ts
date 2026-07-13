import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';

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
  private readonly perfilUrl = 'http://localhost:8000/api/perfil/';


  perfil = signal<PerfilUsuario | null>(
    this.cargarPerfilGuardado()
  );


  login(
    username: string,
    password: string
  ): Observable<PerfilUsuario> {


    return this.http.post<TokenResponse>(
      this.tokenUrl,
      {
        username,
        password
      }

    ).pipe(

      tap(res => {

        localStorage.setItem(
          'access_token',
          res.access
        );

        localStorage.setItem(
          'refresh_token',
          res.refresh
        );

      }),


      switchMap(() => this.obtenerPerfil())

    );

  }



  private obtenerPerfil(): Observable<PerfilUsuario> {


    return this.http.get<PerfilUsuario>(
      this.perfilUrl
    ).pipe(

      tap(perfil => {

        this.guardarPerfil(perfil);

      })

    );

  }



  private guardarPerfil(
    perfil: PerfilUsuario
  ): void {


    localStorage.setItem(
      'perfil',
      JSON.stringify(perfil)
    );


    this.perfil.set(perfil);

  }



  private cargarPerfilGuardado(): PerfilUsuario | null {


    const data = localStorage.getItem(
      'perfil'
    );


    return data
      ? JSON.parse(data)
      : null;

  }



  getAccessToken(): string | null {

    return localStorage.getItem(
      'access_token'
    );

  }



  getRefreshToken(): string | null {

    return localStorage.getItem(
      'refresh_token'
    );

  }



  estaAutenticado(): boolean {

    return (
      !!this.getAccessToken()
      &&
      !!this.perfil()
    );

  }



  getRol(): Rol | null {

    return this.perfil()?.rol ?? null;

  }



  getPerfil(): PerfilUsuario | null {

    return this.perfil();

  }



  rutaSegunRol(): string {

  switch(this.getRol()){

    case 'ADMIN':
      return '/admin/dashboard';


    default:
      return '/login';

  }

  }



  logout(): void {


    localStorage.removeItem(
      'access_token'
    );


    localStorage.removeItem(
      'refresh_token'
    );


    localStorage.removeItem(
      'perfil'
    );


    this.perfil.set(null);


    this.router.navigate([
      '/login'
    ]);

  }

}