import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitaService } from '../../../services/cita.service';
import { Cita } from '../../../models/cita';

@Component({
  selector: 'app-lista-citas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-citas.component.html',
  styleUrl: './lista-citas.component.css'
})
export class ListaCitasComponent implements OnInit {

  citas: Cita[] = [];

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas() {
    this.citaService.getCitas().subscribe(data => {
      this.citas = data;
    });
  }

  eliminarCita(id: number) {
    this.citaService.eliminarCita(id).subscribe(() => {
      this.cargarCitas();
    });
  }
}