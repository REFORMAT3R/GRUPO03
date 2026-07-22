import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { ConsultaService } from '../../../../services/consulta.service';

@Component({
  selector:'app-formulario-consulta',
  standalone:true,
  imports:[
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl:'./formulario-consulta.component.html',
  styleUrl:'./formulario-consulta.component.css'
})
export class FormularioConsultaComponent implements OnInit {

  consulta:any={
    cita:'',
    diagnostico:'',
    tratamiento:'',
    medicamentos:'',
    observaciones:''
  };

  esEdicion:boolean=false;
  idConsulta:number|null=null;


  constructor(
    private consultaService:ConsultaService,
    private router:Router
  ){}


  ngOnInit():void{

    const data=this.consultaService.getConsultaEditar();


    if(data){

      this.consulta={
        ...data
      };

      this.idConsulta=data.id;
      this.esEdicion=true;

      this.consultaService.limpiarConsultaEditar();

    }

  }

  guardarConsulta(){

    if(this.esEdicion && this.idConsulta){


      this.consultaService.actualizarConsulta(
        this.idConsulta,
        this.consulta
      )
      .subscribe({

        next:()=>{

          alert('Consulta médica actualizada correctamente');

          this.router.navigate([
            '/admin/consultas'
          ]);

        },

        error:(err)=>{

          console.error(err);

          alert('Error al actualizar consulta');

        }

      });


    }else{


      this.consultaService.crearConsulta(
        this.consulta
      )
      .subscribe({

        next:()=>{

          alert('Consulta registrada correctamente');

          this.router.navigate([
            '/admin/consultas'
          ]);

        },

        error:(err)=>{

          console.error(err);

          alert('Error al registrar consulta');

        }

      });


    }

  }

}