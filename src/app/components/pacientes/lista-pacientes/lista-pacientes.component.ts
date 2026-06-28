import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteService } from '../../../services/paciente.service';
import { Paciente } from '../../../models/paciente';


@Component({
  selector: 'app-lista-pacientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-pacientes.component.html',
  styleUrl: './lista-pacientes.component.css'
})
export class ListaPacientesComponent implements OnInit {

  editarPaciente(p: Paciente) {
  this.pacienteService.setPacienteEditar(p);
}


  pacientes: Paciente[] = [];


  constructor(
    private pacienteService: PacienteService
  ) {}


  ngOnInit(): void {

    this.cargarPacientes();

  }


  cargarPacientes() {

  console.log('🔵 llamando servicio...');

  this.pacienteService.getPacientes()
    .subscribe({
      next: (data) => {
        console.log('🟢 DATA REAL:', data);
        this.pacientes = data;
      },
      error: (err) => {
        console.log('🔴 ERROR:', err);
      }
    });

}

  eliminarPaciente(id: number) {
  this.pacienteService.eliminarPaciente(id)
    .subscribe(() => {
      this.cargarPacientes(); // recarga lista
    });
}


}