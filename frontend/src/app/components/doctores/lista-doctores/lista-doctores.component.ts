import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DoctorService } from '../../../services/doctor.service';

@Component({
  selector: 'app-lista-doctores',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-doctores.component.html',
  styleUrl: './lista-doctores.component.css'
})
export class ListaDoctoresComponent implements OnInit {
  
  doctores: any[] = [];

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.obtenerDoctores();
  }

  obtenerDoctores(): void {
    this.doctorService.getDoctores().subscribe({
      next: (data: any) => {
        this.doctores = data;
      },
      error: (err: any) => console.error(err)
    });
  }

  eliminarDoctor(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este doctor?')) {
      this.doctorService.eliminarDoctor(id).subscribe({
        next: () => {
          alert('Doctor eliminado');
          this.obtenerDoctores(); // Recarga la lista
        },
        error: (err: any) => console.error(err)
      });
    }
  }
}