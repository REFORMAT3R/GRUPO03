import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
 
import { CitaService } from '../../../services/cita.service';
import { PacienteService } from '../../../services/paciente.service';
import { AuthService } from '../../../core/auth.service';
 
@Component({
  selector: 'app-recepcionista-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class RecepcionistaDashboardComponent implements OnInit {
 
  auth = inject(AuthService);
 
  totalPacientes = 0;
  citasDeHoy = 0;
  totalCitas = 0;
 
  constructor(
    private citaService: CitaService,
    private pacienteService: PacienteService,
    private cdr: ChangeDetectorRef
  ) {}
 
  ngOnInit(): void {
    const hoy = new Date().toISOString().split('T')[0];
 
    this.pacienteService.getPacientes().subscribe(data => {
      this.totalPacientes = data.length;
      this.cdr.detectChanges();
    });
 
    this.citaService.getCitas().subscribe(data => {
      this.totalCitas = data.length;
      this.citasDeHoy = data.filter(c => c.fecha === hoy).length;
      this.cdr.detectChanges();
    });
  }
}