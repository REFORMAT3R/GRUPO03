import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth.service';
 
interface EnlaceMenu {
  ruta: string;
  etiqueta: string;
}
 
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  private auth = inject(AuthService);
 
  private enlacesPorRol: Record<string, EnlaceMenu[]> = {
    ADMIN: [
      { ruta: '/admin/dashboard', etiqueta: 'Mi Panel'},
      { ruta: '/admin/pacientes', etiqueta: 'Pacientes' },
      { ruta: '/admin/citas', etiqueta: 'Citas' },
      { ruta: '/admin/personal', etiqueta: 'Personal' },
      { ruta: '/admin/doctores', etiqueta: 'Doctores' },
      { ruta: '/admin/consultas', etiqueta: 'Consultas' }
    ],
    DOCTOR: [
      { ruta: '/doctor/dashboard', etiqueta: 'Mi Panel' },
      { ruta: '/doctor/mis-citas', etiqueta: 'Mis Citas' },
      { ruta: '/doctor/consultas', etiqueta: 'Mis Consultas' }
    ],
    RECEPCION: [
      { ruta: '/recepcionista/dashboard', etiqueta: 'Mi Panel' },
      { ruta: '/recepcionista/nueva-cita', etiqueta: 'Nueva Cita' },
      { ruta: '/recepcionista/nuevo-paciente', etiqueta: 'Nuevo Paciente' }
    ]
  };
 
  get enlaces(): EnlaceMenu[] {
    const rol = this.auth.getRol();
    return rol ? this.enlacesPorRol[rol] ?? [] : [];
  }
}