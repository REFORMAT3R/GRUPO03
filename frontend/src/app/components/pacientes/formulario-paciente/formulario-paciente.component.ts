import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PacienteService } from '../../../services/paciente.service';
import { Paciente } from '../../../models/paciente';

@Component({
  selector: 'app-formulario-paciente',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './formulario-paciente.component.html',
  styleUrl: './formulario-paciente.component.css'
})
export class FormularioPacienteComponent {

  paciente: Paciente = {
    nombre: '',
    apellido: '',
    dni: '',
    telefono: ''
  };

  // control de edición
  esEdicion: boolean = false;
  idPaciente: number | null = null;

  constructor(private pacienteService: PacienteService) {}

  // CREATE + UPDATE
  guardarPaciente() {

    // (PUT)
    if (this.esEdicion && this.idPaciente) {

      this.pacienteService.actualizarPaciente(this.idPaciente, this.paciente)
        .subscribe(() => {
          alert('Paciente actualizado correctamente');
          this.reset();
        });

    } 
    // (POST)
    else {

      this.pacienteService.crearPaciente(this.paciente)
        .subscribe(() => {
          alert('Paciente registrado correctamente');
          this.reset();
        });

    }
  }

  // activar modo edit
  editarPaciente(p: any) {
    this.paciente = { ...p }; // copia
    this.idPaciente = p.id;
    this.esEdicion = true;
  }

  // limpiar formulario
  reset() {
    this.paciente = {
      nombre: '',
      apellido: '',
      dni: '',
      telefono: ''
    };

    this.esEdicion = false;
    this.idPaciente = null;
  }
  ngOnInit() {
  const data = this.pacienteService.getPacienteEditar();

  if (data) {
    this.paciente = data;
    this.esEdicion = true;
    this.idPaciente = data.id!;
  }
}
}