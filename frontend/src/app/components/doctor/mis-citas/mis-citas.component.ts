import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
 
import { CitaService } from '../../../services/cita.service';
import { PacienteService } from '../../../services/paciente.service';
import { AuthService } from '../../../core/auth.service';
import { Cita } from '../../../models/cita';
import { Paciente } from '../../../models/paciente';
 
@Component({
  selector: 'app-mis-citas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mis-citas.component.html',
  styleUrl: './mis-citas.component.css'
})
export class MisCitasComponent implements OnInit {
 
  private auth = inject(AuthService);
 
  citas: Cita[] = [];
  pacientesPorId: Record<number, Paciente> = {};
 
  constructor(
    private citaService: CitaService,
    private pacienteService: PacienteService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}
 
  ngOnInit(): void {
    this.cargarCitas();
  }
 
  cargarCitas(): void {
    const miId = this.auth.perfil()?.id;
 
    this.citaService.getCitas().subscribe(data => {
      // Solo las citas asignadas a este doctor
      this.citas = data.filter(c => c.doctor === miId);
      this.cdr.detectChanges();
    });
 
    this.pacienteService.getPacientes().subscribe(data => {
      this.pacientesPorId = {};
      data.forEach(p => {
        if (p.id) this.pacientesPorId[p.id] = p;
      });
      this.cdr.detectChanges();
    });
  }
 
  nombrePaciente(idPaciente: number): string {
    const p = this.pacientesPorId[idPaciente];
    return p ? `${p.nombres} ${p.apellidos}` : `Paciente #${idPaciente}`;
  }
 
  registrarConsulta(c: Cita): void {
    this.citaService.setCitaEditar(c);
    this.router.navigate(['/doctor/registrar-consulta']);
  }
}