import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { ConsultaService } from '../../../services/consulta.service';
import { CitaService } from '../../../services/cita.service';
import { RecetaService } from '../../../services/receta.service';

import { Cita } from '../../../models/cita';

@Component({
  selector:'app-registrar-consulta',
  standalone:true,
  imports:[
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl:'./registrar-consultas.component.html',
  styleUrl:'./registrar-consultas.component.css'
})
export class RegistrarConsultasComponent implements OnInit {

  modoEdicion:boolean=false;

  citaSeleccionada:Cita | null=null;

  consulta:any={
    id:null,
    cita:null,
    diagnostico:'',
    tratamiento:'',
    observaciones:''
  };

  receta:any={
    consulta:null,
    medicamento:'',
    dosis:'',
    frecuencia:'',
    duracion:'',
    indicaciones:''
  };


  constructor(
    private consultaService:ConsultaService,
    private citaService:CitaService,
    private recetaService:RecetaService,
    private router:Router
  ){}


  ngOnInit():void{

    const cita=this.citaService.getCitaEditar();

    const consultaEditar=this.consultaService.getConsultaEditar();


    if(consultaEditar){

      this.consulta={
        ...consultaEditar
      };

      this.modoEdicion=true;

      this.consultaService.limpiarConsultaEditar();

      return;

    }


    if(cita){

      this.citaSeleccionada=cita;

      this.consulta.cita=cita.id;

      this.citaService.limpiarCitaEditar();

    }

  }



  guardarConsulta():void{

    if(!this.consulta.cita){

      alert('No existe una cita seleccionada');

      return;

    }


    if(this.modoEdicion){

      this.consultaService.actualizarConsulta(
        this.consulta.id,
        this.consulta
      )
      .subscribe({

        next:()=>{

          alert('Consulta actualizada correctamente');

          this.router.navigate([
            '/doctor/consultas'
          ]);

        },

        error:(err)=>{

          console.error(err);

          alert('Error al actualizar consulta');

        }

      });


      return;

    }


    this.consultaService.crearConsulta(
      this.consulta
    )
    .subscribe({

      next:(consultaCreada:any)=>{

        const agregarReceta=confirm(
          'Consulta registrada correctamente. ¿Desea agregar una receta?'
        );


        if(agregarReceta){

          this.recetaService.setConsultaRecetaCrear(
            consultaCreada.id
          );


          this.router.navigate([
            '/doctor/consultas/receta'
          ]);


        }else{

          this.router.navigate([
            '/doctor/mis-citas'
          ]);

        }

      },

      error:(err)=>{

        console.error(err);

        alert(
          'Error al guardar consulta. Puede que la cita ya tenga una consulta.'
        );

      }

    });

  }

}