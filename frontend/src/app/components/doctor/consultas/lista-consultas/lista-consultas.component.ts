import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { ConsultaService } from '../../../../services/consulta.service';
import { RecetaService } from '../../../../services/receta.service';

@Component({
  selector:'app-lista-consultas',
  standalone:true,
  imports:[
    CommonModule,
    RouterModule
  ],
  templateUrl:'./lista-consultas.component.html',
  styleUrl:'./lista-consultas.component.css'
})
export class ListaConsultasDoctorComponent implements OnInit{

  consultas:any[]=[];


  constructor(
    private consultaService:ConsultaService,
    private recetaService:RecetaService,
    private router:Router,
    private cdr:ChangeDetectorRef
  ){}


  ngOnInit():void{

    this.cargarConsultas();

  }



  cargarConsultas():void{

    this.consultaService.getConsultas()
    .subscribe({

      next:(data:any)=>{

        console.log('CONSULTAS:',data);

        this.consultas=data;

        this.cdr.detectChanges();

      },


      error:(err)=>{

        console.error('ERROR CONSULTAS:',err);

      }

    });

  }



  verReceta(consulta:any):void{


    if(!consulta.receta){


      alert(
        'Esta consulta no tiene receta'
      );


      return;

    }



    this.recetaService.setRecetaEditar(

      consulta.receta

    );



    this.router.navigate([

      '/doctor/consultas/receta'

    ]);


  }





  editarConsulta(consulta:any):void{


    this.consultaService.setConsultaEditar(

      consulta

    );



    this.router.navigate([

      '/doctor/modificar-consulta'

    ]);


  }





  eliminarConsulta(consulta:any):void{


    if(!confirm('¿Desea eliminar esta consulta?')){

      return;

    }



    this.consultaService.eliminarConsulta(

      consulta.id

    )
    .subscribe({

      next:()=>{


        alert(
          'Consulta eliminada correctamente'
        );


        this.cargarConsultas();


      },


      error:(err)=>{


        console.error(err);


        alert(
          'Error al eliminar la consulta'
        );


      }


    });


  }


}