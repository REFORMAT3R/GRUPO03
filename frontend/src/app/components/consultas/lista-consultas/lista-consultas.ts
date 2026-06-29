import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ConsultaService } from '../../../services/consulta.service';

@Component({
  selector: 'app-lista-consultas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-consultas.html',
  styleUrl: './lista-consultas.css'
})
export class ListaConsultasComponent implements OnInit {

  consultas: any[] = [];

  constructor(
    private consultaService: ConsultaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.obtenerConsultas();
  }

  obtenerConsultas(): void {
    this.consultaService.getConsultas().subscribe({
      next: (data) => {
        this.consultas = data,
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
      
    });
  }

  eliminarConsulta(id: number): void {
    if (confirm('¿Deseas eliminar permanentemente esta consulta médica?')) {
      this.consultaService.eliminarConsulta(id).subscribe({
        next: () => {
          alert('Consulta eliminada');
          this.obtenerConsultas();
        },
        error: (err) => console.error(err)
      });
    }
  }
}