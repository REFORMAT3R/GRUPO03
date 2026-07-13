import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth.service';
 
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  auth = inject(AuthService);
 
  cerrarSesion(): void {
    this.auth.logout();
  }
 
  etiquetaRol(): string {
    switch (this.auth.getRol()) {
      case 'DOCTOR': return 'Doctor(a)';
      case 'ADMIN': return 'Administrador';
      case 'RECEPCION': return 'Recepción';
      default: return '';
    }
  }
}