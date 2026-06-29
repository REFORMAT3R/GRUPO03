import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ConsultaService } from '../../../services/consulta.service';

@Component({
  selector: 'app-formulario-consulta',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './formulario-consulta.html',
  styleUrl: './formulario-consulta.css'
})
export class FormularioConsultaComponent {

  consulta: any = {
    cita: '',
    diagnostico: '',
    tratamiento: '',
    medicamentos: '',
    observaciones: ''
  };

  esEdicion: boolean = false;
  idConsulta: number | null = null;

  constructor(private consultaService: ConsultaService) {}

  guardarConsulta() {
    if (this.esEdicion && this.idConsulta) {
      this.consultaService.actualizarConsulta(this.idConsulta, this.consulta)
        .subscribe({
          next: () => {
            alert('Consulta médica actualizada con éxito');
            this.reset();
          },
          error: (err) => console.error(err)
        });
    } else {
      this.consultaService.crearConsulta(this.consulta)
        .subscribe({
          next: () => {
            alert('¡Consulta registrada y guardada con éxito!');
            this.reset();
          },
          error: (err) => {
            console.error(err);
            alert('Error al guardar. Verifica si el ID de la cita ya tiene una consulta vinculada.');
          }
        });
    }
  }

  reset() {
    this.consulta = {
      cita: '',
      diagnostico: '',
      tratamiento: '',
      medicamentos: '',
      observaciones: ''
    };
    this.esEdicion = false;
    this.idConsulta = null;
  }
}