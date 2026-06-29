import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PacienteService } from '../../../services/paciente.service';

@Component({
  selector: 'app-formulario-paciente',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './formulario-paciente.component.html',
  styleUrl: './formulario-paciente.component.css'
})
export class FormularioPacienteComponent implements OnInit {

  // Objeto estructurado exactamente igual al models.py de Django
  paciente: any = {
    dni: '',
    nombres: '',
    apellidos: '',
    fecha_nacimiento: '', // Formato requerido por Django: 'YYYY-MM-DD'
    sexo: '',              // Valores requeridos: 'M', 'F' u 'O'
    telefono: ''
  };

  // Control de edición
  esEdicion: boolean = false;
  idPaciente: number | null = null;

  constructor(private pacienteService: PacienteService) {}

  ngOnInit() {
    const data = this.pacienteService.getPacienteEditar();
    if (data) {
      this.paciente = data;
      this.esEdicion = true;
      this.idPaciente = data.id!;
    }
  }

  // CREATE + UPDATE
  guardarPaciente() {
    // Modo Edición (PUT)
    if (this.esEdicion && this.idPaciente) {
      this.pacienteService.actualizarPaciente(this.idPaciente, this.paciente)
        .subscribe({
          next: () => {
            alert('Paciente actualizado correctamente');
            this.reset();
          },
          error: (err) => {
            alert('Error al actualizar: Revisa la consola o las validaciones');
            console.error(err);
          }
        });
    } 
    // Modo Creación (POST)
    else {
      this.pacienteService.crearPaciente(this.paciente)
        .subscribe({
          next: () => {
            alert('Paciente registrado correctamente');
            this.reset();
          },
          error: (err) => {
            alert('Error al registrar: Revisa que el DNI/Teléfono cumplan el formato');
            console.error(err);
          }
        });
    }
  }

  // Activar modo edición desde la lista
  editarPaciente(p: any) {
    this.paciente = { ...p }; // Copia superficial del objeto
    this.idPaciente = p.id;
    this.esEdicion = true;
  }

  // Limpiar formulario y restablecer estados
  reset() {
    this.paciente = {
      dni: '',
      nombres: '',
      apellidos: '',
      fecha_nacimiento: '',
      sexo: '',
      telefono: ''
    };
    this.esEdicion = false;
    this.idPaciente = null;
  }
}