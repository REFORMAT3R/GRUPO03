import { Routes } from '@angular/router';

import { ListaPacientesComponent } from './components/pacientes/lista-pacientes/lista-pacientes.component';
import { FormularioPacienteComponent } from './components/pacientes/formulario-paciente/formulario-paciente.component';

import { ListaCitasComponent } from './components/citas/lista-citas/lista-citas.component';
import { FormularioCitaComponent } from './components/citas/formulario-cita/formulario-cita.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pacientes',
    pathMatch: 'full'
  },
  {
    path: 'pacientes',
    component: ListaPacientesComponent
  },
  {
    path: 'pacientes/nuevo',
    component: FormularioPacienteComponent
  },
  {
    path: 'citas',
    component: ListaCitasComponent
  },
  {
    path: 'citas/nuevo',
    component: FormularioCitaComponent
  }
];