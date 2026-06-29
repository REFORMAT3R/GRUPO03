import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ConsultaService } from '../../../services/consulta.service';

@Component({
  selector: 'app-formulario-consulta',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './formulario-consulta.component.html',
  styleUrl: './formulario-consulta.component.css'
})
export class FormularioConsultaComponent implements OnInit {

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

  ngOnInit(): void {
    const data = this.consultaService.getConsultaEditar();
    if (data) {
      this.consulta = { ...data };
      this.idConsulta = data.id;
      this.esEdicion = true;
      this.consultaService.limpiarConsultaEditar();
    } else {
      this.reset();
    }
  }
  
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