import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/auth.service';
 
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 
  credenciales = { usuario: '', password: '' };
  cargando = false;
  errorMensaje = '';
 
  constructor(private authService: AuthService, private router: Router) {}
 
  ingresar(): void {
    this.errorMensaje = '';
    this.cargando = true;
 
    this.authService.login(this.credenciales.usuario, this.credenciales.password).subscribe({
      next: () => {
        this.cargando = false;
        this.router.navigate([this.authService.rutaSegunRol()]);
      },
      error: (err) => {
        this.cargando = false;
        if (err.status === 401) {
          this.errorMensaje = 'Usuario o contraseña incorrectos.';
        } else {
          this.errorMensaje = 'No se pudo iniciar sesión. Intenta nuevamente.';
        }
      }
    });
  }
}