import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { CitaService } from '../../../../services/cita.service';

@Component({
  selector:'app-formulario-cita',
  standalone:true,
  imports:[FormsModule,CommonModule,RouterModule],
  templateUrl:'./formulario-cita.component.html',
  styleUrl:'./formulario-cita.component.css'
})
export class FormularioCitaComponent implements OnInit {

  cita:any={
    paciente:'',
    doctor:'',
    fecha:'',
    hora:'',
    motivo:'',
    estado:'PENDIENTE'
  };

  esEdicion:boolean=false;
  idCita:number|null=null;

  fechaMinima:string='';
  fechaHoy:string='';
  horaMinima:string='08:00';

  pacientes:any[]=[];
  doctores:any[]=[];


  constructor(
    private citaService:CitaService,
    private router:Router
  ){}


  cargarPacientes(){

    this.citaService.getPacientes()
    .subscribe(data=>{
      this.pacientes=data;
    });

  }


  cargarDoctores(){

    this.citaService.getDoctores()
    .subscribe(data=>{
      this.doctores=data;
    });

  }


  ngOnInit():void{

    this.cargarPacientes();
    this.cargarDoctores();


    const ahora=new Date();

    this.fechaMinima=ahora.toISOString().split('T')[0];
    this.fechaHoy=this.fechaMinima;


    const data=this.citaService.getCitaEditar();


    if(data){

      this.cita={
        ...data
      };

      this.esEdicion=true;
      this.idCita=data.id!;

      this.citaService.limpiarCitaEditar();

    }

  }



  onFechaChange(){

    const ahora=new Date();

    const hoy=ahora.toISOString().split('T')[0];


    if(this.cita.fecha===hoy){

      this.horaMinima=ahora.toTimeString().slice(0,5);

    }else{

      this.horaMinima='08:00';

    }

  }



  guardarCita(){


    if(this.esEdicion && this.idCita){


      this.citaService.actualizarCita(
        this.idCita,
        this.cita
      )
      .subscribe({

        next:()=>{

          alert('Cita actualizada');

          this.router.navigate([
            '/admin/citas'
          ]);

        },

        error:(err)=>{

          console.error(err);

        }

      });


    }else{


      this.citaService.crearCita(
        this.cita
      )
      .subscribe({

        next:()=>{

          alert('Cita creada');

          this.router.navigate([
            '/admin/citas'
          ]);

        },

        error:(err)=>{

          console.error(err);

        }

      });


    }


  }



  reset(){

    this.cita={

      paciente:'',
      doctor:'',
      fecha:'',
      hora:'',
      motivo:'',
      estado:'PENDIENTE'

    };


    this.esEdicion=false;
    this.idCita=null;
    this.horaMinima='08:00';

  }

}