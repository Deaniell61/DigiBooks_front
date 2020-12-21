import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaestroComponent } from './maestro.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CursosComponent } from './cursos/cursos.component';
import { CursoAlumnosComponent } from './curso-alumnos/curso-alumnos.component';
import { TareasComponent } from './tareas/tareas.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { DetalleAlumnoComponent } from './detalle-alumno/detalle-alumno.component';
import { ProfileComponent } from './profile/profile.component';
import { DigibooksComponent } from './digibooks/digibooks.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '', component: MaestroComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'cursos/:op', component: CursosComponent },
      { path: 'curso-alumnos/:id/:name', component: CursoAlumnosComponent },
      { path: 'tareas/:id/:name', component: TareasComponent },
      { path: 'digibooks/:id', component: DigibooksComponent },
      { path: 'detalle-alumno/:id/:name', component: DetalleAlumnoComponent },
      { path: 'digibooks', component: DigibooksComponent },
      { path: 'asistencia/:id/:name', component: AsistenciaComponent },
      { path: 'profile', component: ProfileComponent },
    ]
  },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaestroRoutingModule { }
