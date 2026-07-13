import { Routes } from '@angular/router';

import { IndexComponent } from './components/home/index/index.component';
import { LoginComponent } from './components/home/login/login.component';

import { AdminLayoutComponent } from './components/admin/admin-layout/admin-layout.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';

import { ListaPacientesComponent } from './components/admin/pacientes/lista-pacientes/lista-pacientes.component';
import { FormularioPacienteComponent } from './components/admin/pacientes/formulario-paciente/formulario-paciente.component';

import { ListaCitasComponent } from './components/admin/citas/lista-citas/lista-citas.component';
import { FormularioCitaComponent } from './components/admin/citas/formulario-cita/formulario-cita.component';

import { ListaDoctoresComponent } from './components/admin/doctores/lista-doctores/lista-doctores.component';
import { FormularioDoctorComponent } from './components/admin/doctores/formulario-doctor/formulario-doctor.component';

import { ListaConsultasComponent } from './components/admin/consultas/lista-consultas/lista-consultas.component';
import { FormularioConsultaComponent } from './components/admin/consultas/formulario-consulta/formulario-consulta.component';

import { ListaPersonalComponent } from './components/admin/personal/lista-personal/lista-personal.component';
import { FormularioPersonalComponent } from './components/admin/personal/formulario-personal/formulario-personal.component';

import { DoctorLayoutComponent } from './components/doctor/doctor-layout/doctor-layout.component';
import { DoctorDashboardComponent } from './components/doctor/dashboard/dashboard.component';

import { authGuard } from './core/auth.guard';
import { rolGuard } from './core/rol.guard';

export const routes: Routes = [

{
  path:'',
  component:IndexComponent
},

{
  path:'login',
  component:LoginComponent
},

{
  path:'admin',
  component:AdminLayoutComponent,
  canActivate:[
    authGuard,
    rolGuard
  ],
  data:{
    roles:['ADMIN']
  },
  children:[

    {
      path:'dashboard',
      component:DashboardComponent
    },

    {
      path:'pacientes',
      component:ListaPacientesComponent
    },

    {
      path:'pacientes/nuevo',
      component:FormularioPacienteComponent
    },

    {
      path:'pacientes/editar',
      component:FormularioPacienteComponent
    },

    {
      path:'citas',
      component:ListaCitasComponent
    },

    {
      path:'citas/nuevo',
      component:FormularioCitaComponent
    },

    {
      path:'citas/editar',
      component:FormularioCitaComponent
    },

    {
      path:'doctores',
      component:ListaDoctoresComponent
    },

    {
      path:'doctores/nuevo',
      component:FormularioDoctorComponent
    },

    {
      path:'doctores/editar',
      component:FormularioDoctorComponent
    },

    {
      path:'consultas',
      component:ListaConsultasComponent
    },

    {
      path:'consultas/nuevo',
      component:FormularioConsultaComponent
    },

    {
      path:'consultas/editar',
      component:FormularioConsultaComponent
    },

    {
      path:'personal',
      component:ListaPersonalComponent
    },

    {
      path:'personal/nuevo',
      component:FormularioPersonalComponent
    },

    {
      path:'personal/editar',
      component:FormularioPersonalComponent
    },

    {
      path:'',
      redirectTo:'dashboard',
      pathMatch:'full'
    }

  ]
},

{
  path:'doctor',
  component:DoctorLayoutComponent,
  canActivate:[
    authGuard,
    rolGuard
  ],
  data:{
    roles:['DOCTOR']
  },
  children:[

    {
      path:'dashboard',
      component:DoctorDashboardComponent
    },

    {
      path:'',
      redirectTo:'dashboard',
      pathMatch:'full'
    }

  ]
},

{
  path:'**',
  redirectTo:'login'
}

];