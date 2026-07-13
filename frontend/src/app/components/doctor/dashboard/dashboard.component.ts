import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector:'app-dashboard-doctor',
  standalone:true,
  imports:[
    CommonModule,
    RouterModule
  ],
  templateUrl:'./dashboard.component.html',
  styleUrl:'./dashboard.component.css'
})
export class DoctorDashboardComponent {

  private auth = inject(AuthService);

  get perfil(){
    return this.auth.perfil();
  }

  tarjetas = [
    {
      titulo:'Mis citas',
      cantidad:0,
      descripcion:'Citas pendientes'
    },
    {
      titulo:'Consultas realizadas',
      cantidad:0,
      descripcion:'Historial médico'
    },
    {
      titulo:'Pacientes atendidos',
      cantidad:0,
      descripcion:'Total registrados'
    }
  ];

  acciones = [
    {
      nombre:'Ver mis citas',
      ruta:'/doctor/mis-citas'
    },
    {
      nombre:'Registrar consulta',
      ruta:'/doctor/registrar-consulta'
    }
  ];

}