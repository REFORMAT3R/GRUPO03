import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { CitaService } from '../../../services/cita.service';

@Component({
  selector:'app-nueva-cita',
  standalone:true,
  imports:[
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl:'./nueva-cita.component.html',
  styleUrl:'./nueva-cita.component.css'
})
export class NuevaCitaComponent implements OnInit {

  cita:any={
    paciente:'',
    doctor:'',
    fecha:'',
    hora:'',
    motivo:'',
    estado:'PENDIENTE'
  };

  pacientes:any[]=[];
  doctores:any[]=[];

  fechaMinima:string='';

  constructor(
    private citaService:CitaService,
    private router:Router
  ){}

  ngOnInit():void{

    this.citaService.getPacientes()
    .subscribe(data=>{
      this.pacientes=data;
    });

    this.citaService.getDoctores()
    .subscribe(data=>{
      this.doctores=data;
    });

    const hoy=new Date();

    this.fechaMinima=hoy.toISOString().split('T')[0];

  }

  guardarCita():void{


    this.citaService.crearCita(this.cita)
    .subscribe({

      next:()=>{

        alert(
          'Cita agendada correctamente'
        );

        this.router.navigate([
          '/recepcionista/dashboard'
        ]);

      },

      error:(err)=>{

        console.error(err);

        alert(
          'Error al agendar la cita. Revisa los datos ingresados.'
        );

      }

    });

  }

}