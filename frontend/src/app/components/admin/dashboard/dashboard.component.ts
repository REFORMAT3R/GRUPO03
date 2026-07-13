import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {


  tarjetas = [

    {
      titulo: 'Pacientes',
      descripcion: 'Gestionar pacientes registrados',
      icono: '👥',
      ruta: '/admin/pacientes'
    },

    {
      titulo: 'Doctores',
      descripcion: 'Administrar médicos de la clínica',
      icono: '👨‍⚕️',
      ruta: '/admin/doctores'
    },

    {
      titulo: 'Personal',
      descripcion: 'Gestionar usuarios del sistema',
      icono: '👤',
      ruta: '/admin/personal'
    },

    {
      titulo: 'Citas',
      descripcion: 'Administrar citas médicas',
      icono: '📅',
      ruta: '/admin/citas'
    },

    {
      titulo: 'Consultas',
      descripcion: 'Revisar consultas médicas',
      icono: '🩺',
      ruta: '/admin/consultas'
    }

  ];

}