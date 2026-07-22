import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
 
import { CitaService } from '../../../services/cita.service';
import { PacienteService } from '../../../services/paciente.service';
import { DoctorService } from '../../../services/doctor.service';
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
 
  proximasCitas: any[] = [];
  ultimosPacientes: any[] = [];
  doctoresPorId: Record<number, any> = {};
  pacientesPorId: Record<number, any> = {};
 
  constructor(
    private citaService: CitaService,
    private pacienteService: PacienteService,
    private doctorService: DoctorService,
    private cdr: ChangeDetectorRef
  ) {}
 
  ngOnInit(): void {
    const hoy = new Date().toISOString().split('T')[0];
 
    this.doctorService.getDoctores().subscribe((data: any[]) => {
      this.doctoresPorId = {};
      data.forEach(d => {
        if (d.id) this.doctoresPorId[d.id] = d;
      });
      this.cdr.detectChanges();
    });
 
    this.pacienteService.getPacientes().subscribe((data: any[]) => {
      this.totalPacientes = data.length;
 
      this.pacientesPorId = {};
      data.forEach(p => {
        if (p.id) this.pacientesPorId[p.id] = p;
      });
 
      this.ultimosPacientes = [...data]
        .sort((a, b) => (b.id ?? 0) - (a.id ?? 0))
        .slice(0, 5);
 
      this.cdr.detectChanges();
    });
 
    this.citaService.getCitas().subscribe(data => {
      this.totalCitas = data.length;
      this.citasDeHoy = data.filter(c => c.fecha === hoy).length;
 
      this.proximasCitas = [...data]
        .sort((a: any, b: any) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora))
        .slice(0, 5);
 
      this.cdr.detectChanges();
    });
  }
 
  nombrePaciente(idPaciente: number): string {
    const p = this.pacientesPorId[idPaciente];
    return p ? `${p.nombres} ${p.apellidos}` : `Paciente #${idPaciente}`;
  }
 
  nombreDoctor(idDoctor: number): string {
    const d = this.doctoresPorId[idDoctor];
    return d ? `Dr(a). ${d.nombres} ${d.apellidos}` : `Doctor #${idDoctor}`;
  }
}