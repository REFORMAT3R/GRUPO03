import { Routes } from '@angular/router';

import { ListaPacientesComponent } from './components/pacientes/lista-pacientes/lista-pacientes.component';
import { FormularioPacienteComponent } from './components/pacientes/formulario-paciente/formulario-paciente.component';

import { ListaCitasComponent } from './components/citas/lista-citas/lista-citas.component';
import { FormularioCitaComponent } from './components/citas/formulario-cita/formulario-cita.component';

import { ListaDoctoresComponent } from './components/doctores/lista-doctores/lista-doctores.component';
import { FormularioDoctorComponent } from './components/doctores/formulario-doctor/formulario-doctor.component';

import { ListaConsultasComponent } from './components/consultas/lista-consultas/lista-consultas';
import { FormularioConsultaComponent } from './components/consultas/formulario-consulta/formulario-consulta';

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
    path: 'pacientes/editar',
    component: FormularioPacienteComponent
  },
  {
    path: 'citas',
    component: ListaCitasComponent
  },
  {
    path: 'citas/nuevo',
    component: FormularioCitaComponent
  },
  {
    path: 'citas/editar',
    component: FormularioCitaComponent
  },
  { 
    path: 'doctores', 
    component: ListaDoctoresComponent
  },
  { 
    path: 'doctores/nuevo', 
    component: FormularioDoctorComponent
  },
  { 
    path: 'doctores/editar', 
    component: FormularioDoctorComponent 
  },
  { 
    path: 'consultas', 
    component: ListaConsultasComponent
  },
  { 
    path: 'consultas/nuevo', 
    component: FormularioConsultaComponent
  },
  { 
    path: 'consultas/editar', 
    component: FormularioConsultaComponent 
  },
];