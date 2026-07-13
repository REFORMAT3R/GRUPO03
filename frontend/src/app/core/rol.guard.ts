import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, Rol } from './auth.service';
 

export const rolGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);
 
  const rolesPermitidos = route.data['roles'] as Rol[] | undefined;
 
  if (!auth.estaAutenticado()) {
    router.navigate(['/login']);
    return false;
  }
 
  if (rolesPermitidos && !rolesPermitidos.includes(auth.getRol()!)) {
    
    router.navigate([auth.rutaSegunRol()]);
    return false;
  }
 
  return true;
};