import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { RecetaService } from '../../../../services/receta.service';


@Component({
  selector:'app-formulario-receta',
  standalone:true,
  imports:[
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl:'./formulario-receta.component.html',
  styleUrl:'./formulario-receta.component.css'
})
export class FormularioRecetaComponent implements OnInit {


  modoEdicion:boolean=false;


  receta:any={

    id:null,
    consulta:null,
    medicamento:'',
    dosis:'',
    frecuencia:'',
    duracion:'',
    indicaciones:''

  };



  constructor(
    private recetaService:RecetaService,
    private router:Router
  ){}



  ngOnInit():void{


    const recetaEditar=this.recetaService.getRecetaEditar();

    if(recetaEditar){

      this.receta={
        ...recetaEditar
      };

      this.modoEdicion=true;

      this.recetaService.limpiarRecetaEditar();

      return;

    }


    const consultaId=this.recetaService.getConsultaRecetaCrear();

    if(consultaId){

      this.receta.consulta=consultaId;

      this.modoEdicion=false;

      this.recetaService.limpiarConsultaRecetaCrear();

    }


  }





  guardarReceta():void{


    if(this.modoEdicion){


      this.recetaService.actualizarReceta(

        this.receta.id,

        this.receta

      )
      .subscribe({


        next:()=>{


          alert(
            'Receta actualizada correctamente'
          );


          this.router.navigate([

            '/doctor/consultas'

          ]);


        },


        error:(err)=>{


          console.error(err);


          alert(
            'Error al actualizar receta'
          );


        }


      });


      return;


    }





    this.recetaService.crearReceta(

      this.receta

    )
    .subscribe({


      next:()=>{


        alert(
          'Receta registrada correctamente'
        );


        this.router.navigate([

          '/doctor/consultas'

        ]);


      },


      error:(err)=>{


        console.error(err);


        alert(
          'Error al registrar receta'
        );


      }


    });


  }





  eliminarReceta():void{


    if(!confirm('¿Desea eliminar esta receta?')){

      return;

    }




    this.recetaService.eliminarReceta(

      this.receta.id

    )
    .subscribe({


      next:()=>{


        alert(
          'Receta eliminada correctamente'
        );


        this.router.navigate([

          '/doctor/consultas'

        ]);


      },


      error:(err)=>{


        console.error(err);


        alert(
          'Error al eliminar receta'
        );


      }


    });


  }


}