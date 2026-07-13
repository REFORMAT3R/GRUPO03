import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
 
const REFRESH_URL = 'http://localhost:8000/api/token/refresh/';
 
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const http = inject(HttpClient);
  const router = inject(Router);
 
  const esPeticionDeLogin = req.url.includes('/api/token/');
  const token = localStorage.getItem('access_token');
 
  const peticionConToken = token && !esPeticionDeLogin
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;
 
  return next(peticionConToken).pipe(
    catchError((error: HttpErrorResponse) => {
      
      if (error.status === 401 && !esPeticionDeLogin) {
        const refresh = localStorage.getItem('refresh_token');
 
        if (refresh) {
          return http.post<{ access: string }>(REFRESH_URL, { refresh }).pipe(
            switchMap(res => {
              localStorage.setItem('access_token', res.access);
              const reintento = req.clone({
                setHeaders: { Authorization: `Bearer ${res.access}` }
              });
              return next(reintento);
            }),
            catchError(() => {
              localStorage.clear();
              router.navigate(['/login']);
              return throwError(() => error);
            })
          );
        }
 
        localStorage.clear();
        router.navigate(['/login']);
      }
 
      return throwError(() => error);
    })
  );
};