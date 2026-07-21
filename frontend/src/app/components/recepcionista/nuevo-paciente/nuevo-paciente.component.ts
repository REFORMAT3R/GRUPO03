import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { PacienteService } from '../../../services/paciente.service';

@Component({
  selector: 'app-nuevo-paciente',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './nuevo-paciente.component.html',
  styleUrl: './nuevo-paciente.component.css'
})
export class NuevoPacienteComponent implements OnInit {

  paciente: any = {
    dni: '',
    nombres: '',
    apellidos: '',
    fecha_nacimiento: '',
    sexo: '',
    telefono: ''
  };

  fechaMaxima: string = '';

  constructor(
    private pacienteService: PacienteService,
    private router: Router
  ) {}

  ngOnInit(): void {

    const hoy = new Date();

    this.fechaMaxima = hoy.toISOString().split('T')[0];

  }


  guardarPaciente(): void {

    this.pacienteService.crearPaciente(this.paciente)
    .subscribe({

      next: () => {

        alert('Paciente registrado correctamente');

        this.router.navigate([
          '/admin/pacientes'
        ]);

      },

      error: (err) => {

        console.error(err);

        alert('Error al registrar: revisa que el DNI/Teléfono cumplan el formato.');

      }

    });

  }

}