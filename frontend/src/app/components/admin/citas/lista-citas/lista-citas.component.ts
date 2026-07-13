import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { CitaService } from '../../../../services/cita.service';
import { Cita } from '../../../../models/cita';

@Component({
  selector: 'app-lista-citas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lista-citas.component.html',
  styleUrl: './lista-citas.component.css'
})
export class ListaCitasComponent implements OnInit {

  citas: Cita[] = [];

  constructor(
    private citaService: CitaService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarCitas();
  }

  editarCita(c: Cita) {
    this.citaService.setCitaEditar(c);
    this.router.navigate(['/admin/citas/editar']);
  }

  cargarCitas() {
    this.citaService.getCitas().subscribe(data => {
      this.citas = data;
      this.cdr.detectChanges();
    });
  }

  eliminarCita(id: number) {
    if (confirm('¿Desea cancelar esta cita médica de la clínica?')) {
      this.citaService.eliminarCita(id).subscribe(() => {
        this.cargarCitas();
      });
    }
  }
}