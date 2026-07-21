import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { PacienteService } from '../../../../services/paciente.service';


@Component({
  selector: 'app-formulario-paciente',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './formulario-paciente.component.html',
  styleUrl: './formulario-paciente.component.css'
})
export class FormularioPacienteComponent implements OnInit {

  paciente:any = {

    dni:'',
    nombres:'',
    apellidos:'',
    fecha_nacimiento:'',
    sexo:'',
    telefono:''

  };

  esEdicion:boolean=false;

  idPaciente:number|null=null;

  fechaMaxima:string='';

  constructor(
    private pacienteService:PacienteService,
    private router:Router
  ){}

  ngOnInit():void{


    const hoy=new Date();

    this.fechaMaxima=hoy
      .toISOString()
      .split('T')[0];

    const data=this.pacienteService.getPacienteEditar();

    if(data){

      this.paciente={
        ...data
      };


      this.esEdicion=true;

      this.idPaciente=data.id!;


      this.pacienteService
      .limpiarPacienteEditar();


    }

  }

  guardarPaciente():void{


    if(this.esEdicion && this.idPaciente){


      this.pacienteService
      .actualizarPaciente(
        this.idPaciente,
        this.paciente
      )
      .subscribe({


        next:()=>{


          alert(
            'Paciente actualizado correctamente'
          );


          this.router.navigate([
            '/admin/pacientes'
          ]);


        },

        error:(err)=>{

          console.error(err);

          alert(
            'Error al actualizar paciente'
          );

        }


      });

      return;

    }

    this.pacienteService
    .crearPaciente(
      this.paciente
    )
    .subscribe({


      next:()=>{


        alert(
          'Paciente registrado correctamente'
        );


        this.router.navigate([
          '/admin/pacientes'
        ]);


      },

      error:(err)=>{

        console.error(err);

        alert(
          'Error al registrar paciente'
        );

      }

    });

  }

  editarPaciente(p:any):void{

    this.paciente={
      ...p
    };


    this.idPaciente=p.id;

    this.esEdicion=true;
  }

}