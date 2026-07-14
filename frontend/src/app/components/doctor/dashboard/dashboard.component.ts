import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
 
import { CitaService } from '../../../services/cita.service';
import { ConsultaService } from '../../../services/consulta.service';
import { AuthService } from '../../../core/auth.service';
 
@Component({
  selector: 'app-dashboard-doctor',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DoctorDashboardComponent implements OnInit {
 
  private auth = inject(AuthService);
 
  get perfil() {
    return this.auth.perfil();
  }
 
  citasPendientes = 0;
  consultasRealizadas = 0;
  pacientesAtendidos = 0;
 
  acciones = [
    { nombre: 'Ver mis citas', ruta: '/doctor/mis-citas' },
    { nombre: 'Registrar consulta', ruta: '/doctor/registrar-consulta' }
  ];
 
  constructor(
    private citaService: CitaService,
    private consultaService: ConsultaService,
    private cdr: ChangeDetectorRef
  ) {}
 
  ngOnInit(): void {
    const miId = this.auth.perfil()?.id;
 
    this.citaService.getCitas().subscribe(citas => {
      const misCitas = citas.filter(c => c.doctor === miId);
      this.citasPendientes = misCitas.length;
 
      const idsDeMisCitas = new Set(misCitas.map(c => c.id));
      const pacientePorCita = new Map(misCitas.map(c => [c.id, c.paciente]));
 
      this.consultaService.getConsultas().subscribe((consultas: any[]) => {
        
        const misConsultas = consultas.filter(cs => idsDeMisCitas.has(cs.cita));
        this.consultasRealizadas = misConsultas.length;
 
        const pacientesUnicos = new Set(
          misConsultas.map(cs => pacientePorCita.get(cs.cita))
        );
        this.pacientesAtendidos = pacientesUnicos.size;
 
        this.cdr.detectChanges();
      });
 
      this.cdr.detectChanges();
    });
  }
}