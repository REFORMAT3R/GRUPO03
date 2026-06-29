import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DoctorService } from '../../../services/doctor.service'; 

@Component({
  selector: 'app-formulario-doctor',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './formulario-doctor.component.html',
  styleUrl: './formulario-doctor.component.css'
})
export class FormularioDoctorComponent {

  doctor: any = {
    nombres: '',
    apellidos: '',
    especialidad: '', 
    telefono: '',     
    correo: ''
  };

  esEdicion: boolean = false;
  idDoctor: number | null = null;

  constructor(private doctorService: DoctorService) {}

  guardarDoctor() {
    if (this.esEdicion && this.idDoctor) {
      this.doctorService.actualizarDoctor(this.idDoctor, this.doctor)
        .subscribe({
          next: () => {
            alert('Doctor actualizado correctamente');
            this.reset();
          },
          error: (err: any) => console.error(err) 
        });
    } else {
      this.doctorService.crearDoctor(this.doctor)
        .subscribe({
          next: () => {
            alert('Doctor registrado correctamente');
            this.reset();
          },
          error: (err: any) => console.error(err) 
        });
    }
  }

  reset() {
    this.doctor = {
      nombres: '',
      apellidos: '',
      especialidad: '',
      telefono: '',
      correo: ''
    };
    this.esEdicion = false;
    this.idDoctor = null;
  }
}