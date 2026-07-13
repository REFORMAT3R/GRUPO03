import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { DoctorService } from '../../../../services/doctor.service';

@Component({
  selector: 'app-formulario-doctor',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './formulario-doctor.component.html',
  styleUrl: './formulario-doctor.component.css'
})
export class FormularioDoctorComponent implements OnInit {

  doctor:any = {
    username:'',
    password:'',
    email:'',
    nombres:'',
    apellidos:'',
    especialidad:'',
    telefono:'',
    correo:''
  };

  esEdicion:boolean = false;
  idDoctor:number|null = null;

  constructor(
    private doctorService:DoctorService,
    private router:Router
  ){}

  ngOnInit():void {

    const data = this.doctorService.getDoctorEditar();

    if(data){

      this.doctor = {
        username:data.username,
        email:data.email,
        nombres:data.nombres,
        apellidos:data.apellidos,
        especialidad:data.especialidad,
        telefono:data.telefono,
        correo:data.correo,
        password:''
      };

      this.idDoctor = data.id;
      this.esEdicion = true;

      this.doctorService.limpiarDoctorEditar();

    }else{

      this.reset();

    }

  }

  guardarDoctor(){

    if(this.esEdicion && this.idDoctor){

      const datosActualizar = {

        username:this.doctor.username,
        email:this.doctor.email,
        nombres:this.doctor.nombres,
        apellidos:this.doctor.apellidos,
        especialidad:this.doctor.especialidad,
        telefono:this.doctor.telefono,
        correo:this.doctor.correo

      };


      this.doctorService.actualizarDoctor(
        this.idDoctor,
        datosActualizar
      )
      .subscribe({

        next:()=>{

          alert(
            'Doctor actualizado correctamente'
          );

          this.router.navigate([
            '/admin/doctores'
          ]);

        },

        error:(err)=>{

          console.error(err);

          alert(
            'Error al actualizar doctor'
          );

        }

      });


    }else{


      this.doctorService.crearDoctor(
        this.doctor
      )
      .subscribe({

        next:()=>{

          alert(
            'Doctor registrado correctamente'
          );

          this.router.navigate([
            '/admin/doctores'
          ]);

        },

        error:(err)=>{

          console.error(err);

          alert(
            'Error al registrar doctor'
          );

        }

      });

    }

  }

  reset(){

    this.doctor = {

      username:'',
      password:'',
      email:'',
      nombres:'',
      apellidos:'',
      especialidad:'',
      telefono:'',
      correo:''

    };

    this.esEdicion = false;
    this.idDoctor = null;

  }
}