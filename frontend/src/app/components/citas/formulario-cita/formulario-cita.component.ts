import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CitaService } from '../../../services/cita.service';

@Component({
  selector: 'app-formulario-cita',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './formulario-cita.component.html',
  styleUrl: './formulario-cita.component.css'
})
export class FormularioCitaComponent implements OnInit {

  cita: any = {
    paciente: '',        
    doctor: '',        
    fecha: '',       
    hora: '',        
    motivo: '',
    estado: 'PENDIENTE' 
  };

  esEdicion: boolean = false;
  idCita: number | null = null;

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    const data = this.citaService.getCitaEditar();
    if (data) {
      this.cita = { ...data };
      this.esEdicion = true;
      this.idCita = data.id!;
      
      // Limpiamos el servicio tras cargar
      this.citaService.limpiarCitaEditar();
    } else {
      this.reset();
    }
  }
  
  guardarCita() {
    // Modo Edición (PUT)
    if (this.esEdicion && this.idCita) {
      this.citaService.actualizarCita(this.idCita, this.cita)
        .subscribe({
          next: () => {
            alert('Cita actualizada');
            this.reset();
          },
          error: (err) => {
            console.error(err);
          }
        });
    } 
    // Modo Creación (POST)
    else {
      this.citaService.crearCita(this.cita)
        .subscribe({
          next: () => {
            alert('Cita creada');
            this.reset();
          },
          error: (err) => {
            console.error(err);
          }
        });
    }
  }

  reset() {
    this.cita = {
      paciente: '',
      doctor: '',
      fecha: '',
      hora: '',
      motivo: '',
      estado: 'PENDIENTE'
    };
    this.esEdicion = false;
    this.idCita = null;
  }
}