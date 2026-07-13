import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PersonalService } from '../../../../services/personal.service';

@Component({
  selector: 'app-formulario-personal',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './formulario-personal.component.html',
  styleUrl: './formulario-personal.component.css'
})
export class FormularioPersonalComponent implements OnInit {

  personal: any = {
    username: '',
    password: '',
    nombres: '',
    apellidos: '',
    rol: '',
    telefono: ''
  };

  esEdicion: boolean = false;
  idPersonal: number | null = null;

  constructor(private personalService: PersonalService) {}

  ngOnInit(): void {

    const data = this.personalService.getPersonalEditar();

    if (data) {

      this.personal = {
        ...data,
        password: '' // nunca mostramos la contraseña
      };

      this.esEdicion = true;
      this.idPersonal = data.id!;

      this.personalService.limpiarPersonalEditar();

    } else {

      this.reset();

    }

  }

  guardarPersonal() {

    // EDITAR
    if (this.esEdicion && this.idPersonal) {

      this.personalService.actualizarPersonal(this.idPersonal, this.personal)
        .subscribe({

          next: () => {

            alert('Personal actualizado correctamente');
            this.reset();

          },

          error: (err) => {

            alert('Error al actualizar el personal');
            console.error(err);

          }

        });

    }

    // CREAR
    else {

      this.personalService.crearPersonal(this.personal)
        .subscribe({

          next: () => {

            alert('Personal registrado correctamente');
            this.reset();

          },

          error: (err) => {

            alert('Error al registrar el personal');
            console.error(err);

          }

        });

    }

  }

  editarPersonal(p: any) {

    this.personal = {
      ...p,
      password: ''
    };

    this.idPersonal = p.id;
    this.esEdicion = true;

  }

  reset() {

    this.personal = {
      username: '',
      password: '',
      nombres: '',
      apellidos: '',
      rol: '',
      telefono: ''
    };

    this.esEdicion = false;
    this.idPersonal = null;

  }

}