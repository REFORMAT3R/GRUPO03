import { Routes } from '@angular/router';

import { LoginComponent } from './components/home/login/login.component';

import { ListaPacientesComponent } from './components/admin/pacientes/lista-pacientes/lista-pacientes.component';
import { FormularioPacienteComponent } from './components/admin/pacientes/formulario-paciente/formulario-paciente.component';

import { ListaCitasComponent } from './components/admin/citas/lista-citas/lista-citas.component';
import { FormularioCitaComponent } from './components/admin/citas/formulario-cita/formulario-cita.component';

import { ListaDoctoresComponent } from './components/admin/doctores/lista-doctores/lista-doctores.component';
import { FormularioDoctorComponent } from './components/admin/doctores/formulario-doctor/formulario-doctor.component';

import { ListaConsultasComponent } from './components/admin/consultas/lista-consultas/lista-consultas.component';
import { FormularioConsultaComponent } from './components/admin/consultas/formulario-consulta/formulario-consulta.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
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