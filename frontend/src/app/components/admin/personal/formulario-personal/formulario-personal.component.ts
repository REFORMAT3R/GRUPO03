import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { PersonalService } from '../../../../services/personal.service';

@Component({
  selector: 'app-formulario-personal',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './formulario-personal.component.html',
  styleUrl: './formulario-personal.component.css'
})
export class FormularioPersonalComponent implements OnInit {

  personal:any = {
    username:'',
    password:'',
    nombres:'',
    apellidos:'',
    rol:'',
    telefono:''
  };

  esEdicion:boolean=false;

  idPersonal:number|null=null;


  constructor(
    private personalService:PersonalService,
    private router:Router
  ){}


  ngOnInit():void{


    const data=this.personalService.getPersonalEditar();


    if(data){


      this.personal={
        ...data,
        password:''
      };


      this.esEdicion=true;

      this.idPersonal=data.id!;


      this.personalService
      .limpiarPersonalEditar();


    }


  }

  guardarPersonal():void{


    if(this.esEdicion && this.idPersonal){


      this.personalService
      .actualizarPersonal(
        this.idPersonal,
        this.personal
      )
      .subscribe({


        next:()=>{


          alert(
            'Personal actualizado correctamente'
          );


          this.router.navigate([
            '/admin/personal'
          ]);


        },


        error:(err)=>{


          console.error(err);


          alert(
            'Error al actualizar el personal'
          );


        }


      });



      return;


    }

    this.personalService
    .registrarPersonal(
      this.personal
    )
    .subscribe({


      next:()=>{


        alert(
          'Personal registrado correctamente'
        );


        this.router.navigate([
          '/admin/personal'
        ]);


      },

      error:(err)=>{


        console.error(err);


        alert(
          'Error al registrar el personal'
        );


      }


    });



  }

  editarPersonal(p:any):void{


    this.personal={
      ...p,
      password:''
    };


    this.idPersonal=p.id;

    this.esEdicion=true;

  }

}