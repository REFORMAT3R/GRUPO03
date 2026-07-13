import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
 
import { PacienteService } from '../../../services/paciente.service';
import { DoctorService } from '../../../services/doctor.service';
import { CitaService } from '../../../services/cita.service';
import { ConsultaService } from '../../../services/consulta.service';
import { LoadingComponent } from '../../shared/loading/loading.component';
 
interface TarjetaResumen {
  etiqueta: string;
  ruta: string;
  total: number | null;
}
 
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
 
  cargando = true;
 
  tarjetas: TarjetaResumen[] = [
    { etiqueta: 'Pacientes', ruta: '/pacientes', total: null },
    { etiqueta: 'Doctores', ruta: '/doctores', total: null },
    { etiqueta: 'Citas', ruta: '/citas', total: null },
    { etiqueta: 'Consultas', ruta: '/consultas', total: null }
  ];
 
  constructor(
    private pacienteService: PacienteService,
    private doctorService: DoctorService,
    private citaService: CitaService,
    private consultaService: ConsultaService
  ) {}
 
  ngOnInit(): void {
    this.pacienteService.getPacientes().subscribe({
      next: (data) => this.tarjetas[0].total = data.length,
      error: () => this.tarjetas[0].total = 0
    });
 
    this.doctorService.getDoctores().subscribe({
      next: (data) => this.tarjetas[1].total = data.length,
      error: () => this.tarjetas[1].total = 0
    });
 
    this.citaService.getCitas().subscribe({
      next: (data) => this.tarjetas[2].total = data.length,
      error: () => this.tarjetas[2].total = 0
    });
 
    this.consultaService.getConsultas().subscribe({
      next: (data: any[]) => this.tarjetas[3].total = data.length,
      error: () => this.tarjetas[3].total = 0
    });
 
    this.cargando = false;
  }
}