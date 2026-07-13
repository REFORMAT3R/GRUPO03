import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
 
import { ConsultaService } from '../../../services/consulta.service';
import { CitaService } from '../../../services/cita.service';
import { RecetaService } from '../../../services/receta.service';
import { Cita } from '../../../models/cita';
 
@Component({
  selector: 'app-registrar-consulta',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './registrar-consultas.component.html',
  styleUrl: './registrar-consultas.component.css'
})
export class RegistrarConsultasComponent implements OnInit {
 
  citaSeleccionada: Cita | null = null;
 
  consulta: any = {
    cita: '',
    diagnostico: '',
    tratamiento: '',
    medicamentos: '',
    observaciones: ''
  };
 
  agregarReceta = false;
  receta: any = {
    medicamento: '',
    dosis: '',
    frecuencia: '',
    duracion: '',
    indicaciones: ''
  };
 
  constructor(
    private consultaService: ConsultaService,
    private citaService: CitaService,
    private recetaService: RecetaService,
    private router: Router
  ) {}
 
  ngOnInit(): void {
    const cita = this.citaService.getCitaEditar();
 
    if (cita) {
      this.citaSeleccionada = cita;
      this.consulta.cita = cita.id;
      this.citaService.limpiarCitaEditar();
    }
  }
 
  guardarConsulta(): void {
    if (!this.consulta.cita) {
      alert('No hay una cita seleccionada. Vuelve a "Mis Citas" y elige una.');
      return;
    }
 
    this.consultaService.crearConsulta(this.consulta).subscribe({
      next: (consultaCreada: any) => {
        if (this.agregarReceta && this.receta.medicamento) {
          this.receta.consulta = consultaCreada.id;
          this.recetaService.crearReceta(this.receta).subscribe({
            next: () => {
              alert('Consulta y receta registradas con éxito');
              this.router.navigate(['/doctor/mis-citas']);
            },
            error: (err) => {
              console.error(err);
              alert('La consulta se guardó, pero hubo un error al registrar la receta.');
              this.router.navigate(['/doctor/mis-citas']);
            }
          });
        } else {
          alert('Consulta registrada con éxito');
          this.router.navigate(['/doctor/mis-citas']);
        }
      },
      error: (err) => {
        console.error(err);
        alert('Error al guardar. Verifica que la cita no tenga ya una consulta registrada.');
      }
    });
  }
}