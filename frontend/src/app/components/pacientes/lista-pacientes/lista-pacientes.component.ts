import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { PacienteService } from '../../../services/paciente.service';
import { Paciente } from '../../../models/paciente';

@Component({
  selector: 'app-lista-pacientes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lista-pacientes.component.html',
  styleUrl: './lista-pacientes.component.css'
})
export class ListaPacientesComponent implements OnInit {

  pacientes: Paciente[] = [];

  constructor(
    private pacienteService: PacienteService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarPacientes();
  }

  editarPaciente(p: Paciente) {
    this.pacienteService.setPacienteEditar(p);
    this.router.navigate(['/pacientes/editar']);
  }

  cargarPacientes() {
    console.log('🔵 llamando servicio...');
    this.pacienteService.getPacientes()
      .subscribe({
        next: (data) => {
          console.log('🟢 DATA REAL:', data);
          this.pacientes = data;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.log('🔴 ERROR:', err);
        }
      });
  }

  eliminarPaciente(id: number) {
    if (confirm('¿Desea eliminar este registro de la clínica Moisés Heresi?')) {
      this.pacienteService.eliminarPaciente(id)
        .subscribe(() => {
          this.cargarPacientes();
        });
    }
  }
}