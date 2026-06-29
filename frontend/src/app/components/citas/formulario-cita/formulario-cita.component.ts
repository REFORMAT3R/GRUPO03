import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CitaService } from '../../../services/cita.service';
import { Cita } from '../../../models/cita';

@Component({
  selector: 'app-formulario-cita',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './formulario-cita.component.html',
  styleUrl: './formulario-cita.component.css'
})
export class FormularioCitaComponent {

  cita: Cita = {
    fecha: '',
    motivo: '',
    paciente: 0
  };

  esEdicion: boolean = false;
  idCita: number | null = null;

  constructor(private citaService: CitaService) {}

  guardarCita() {

    if (this.esEdicion && this.idCita) {

      this.citaService.actualizarCita(this.idCita, this.cita)
        .subscribe(() => {
          alert('Cita actualizada');
          this.reset();
        });

    } else {

      this.citaService.crearCita(this.cita)
        .subscribe(() => {
          alert('Cita creada');
          this.reset();
        });

    }
  }

  reset() {
    this.cita = {
      fecha: '',
      motivo: '',
      paciente: 0
    };

    this.esEdicion = false;
    this.idCita = null;
  }
}